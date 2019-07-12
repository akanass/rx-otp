import * as bigInt from 'big-integer';
import { Buffer } from 'buffer';
import * as ConvertBase from 'convert-base';
import * as crypto from 'crypto';

import * as pad from 'pad-component';

import { from, Observable, of, throwError } from 'rxjs';
import { defaultIfEmpty, filter, flatMap, map, take } from 'rxjs/operators';

import {
    HOTPGenerateOptions,
    HOTPGenerateValidatedData,
    HOTPVerifyOptions,
    OTPVerifyResult,
    HOTPVerifyValidatedData,
    Validator
} from '../schemas';

const converter = new ConvertBase();

declare const Object;

/**
 * HOTP class definition
 */
export class HOTP {
    //                                       0  1   2    3     4      5       6        7         8          9           10
    private static DIGITS_POWER: number[] = [ 1, 10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000, 1000000000, 10000000000 ];
    // These are used to calculate the check-sum digits.
    private static DOUBLE_DIGITS: number[] = [ 0, 2, 4, 6, 8, 1, 3, 5, 7, 9 ];

    /**
     * Calculates the checksum using the credit card algorithm.
     * This algorithm has the advantage that it detects any single
     * mistyped digit and any single transposition of
     * adjacent digits.
     *
     * @param num the number to calculate the checksum for
     * @param digits number of significant places in the number
     *
     * @returns the checksum of num
     */
    private static _calcChecksum(num, digits): number {
        // initialize variables
        let doubleDigit = true;
        let total = 0;

        while (0 < digits--) {
            let digit = parseInt(`${num % 10}`);
            num /= 10;
            if (doubleDigit) {
                digit = HOTP.DOUBLE_DIGITS[ digit ];
            }
            total += digit;
            doubleDigit = !doubleDigit;
        }
        let result = total % 10;
        /* istanbul ignore else */
        if (result > 0) {
            result = 10 - result;
        }
        return result;
    }

    /**
     * Function to generate OTP
     *
     * @param {Buffer} key - Key for the one time password.
     *
     * @param {Buffer} counter - the counter, time, or other value that
     *                      changes on a per use basis.
     *
     * @param {number} code_digits - the number of digits in the OTP, not
     *                      including the checksum, if any.
     *
     * @param {boolean} add_checksum - a flag indicates if a checksum digit
     *                      should be appended to the OTP.
     *
     * @param {number} truncation_offset - the offset into the MAC result to
     *                     begin truncation.
     *
     * @param {string} algorithm - the algorithm to create HMAC - default 'SHA512'
     *
     * @returns A numeric string in base 10 includes code_digits plus the optional checksum digit if requested.
     *
     * @private
     */
    private static _generateOTP(key: Buffer,
                                counter: Buffer,
                                code_digits: number,
                                add_checksum: boolean,
                                truncation_offset: number,
                                algorithm: 'SHA1' | 'SHA256' | 'SHA512'): Observable<string> {
        return of(
            crypto.createHmac(algorithm, key)
        )
            .pipe(
                map(hmac => Buffer.from(hmac.update(counter).digest('hex'), 'hex')),
                map(hash =>
                    ({
                        hash,
                        offset: ((0 <= truncation_offset) && (truncation_offset < (hash.length - 4))) ?
                            truncation_offset :
                            (hash[ hash.length - 1 ] & 0xf)
                    })
                ),
                map((_: any) =>
                    ((_.hash[ _.offset ] & 0x7f) << 24) |
                    ((_.hash[ _.offset + 1 ] & 0xff) << 16) |
                    ((_.hash[ _.offset + 2 ] & 0xff) << 8) |
                    (_.hash[ _.offset + 3 ] & 0xff)
                ),
                map(binary => binary % HOTP.DIGITS_POWER[ code_digits ]),
                map(otp => add_checksum ? ((otp * 10) + HOTP._calcChecksum(otp, code_digits)) : otp),
                map(otp => ({ result: otp.toString(), digits: add_checksum ? (code_digits + 1) : code_digits })),
                map((_: any) => pad.left(_.result, _.digits, '0'))
            );
    }

    /**
     * Iterates and validates token for given parameters
     *
     * @param data - All parameters and iterator to verify the token
     *
     * @private
     */
    private static _verifyWithIteration(data: any): Observable<OTPVerifyResult | {}> {
        return from(data.iterator)
            .pipe(
                flatMap((i: any) =>
                    of({
                        key: data.key,
                        counter: data.counter_format === 'int' ?
                            Buffer.from(pad.left(converter.convert(parseInt(i.toString()), 10, 16), 16, '0'), 'hex') :
                            Buffer.from(pad.left(i.toString(16).toUpperCase(), 16, '0'), 'hex'),
                        code_digits: data.code_digits,
                        add_checksum: data.add_checksum,
                        truncation_offset: data.truncation_offset,
                        algorithm: data.algorithm
                    })
                        .pipe(
                            flatMap((params: any) =>
                                HOTP._generateOTP(
                                    params.key,
                                    params.counter,
                                    params.code_digits,
                                    params.add_checksum,
                                    params.truncation_offset,
                                    params.algorithm
                                )
                            ),
                            map(_ => ({ token: _, it: i }))
                        )
                ),
                // We have found a matching code, trigger callback and pass offset
                filter(_ => _.token === data.token),
                take(1),
                map(_ => _.it),
                // get delta
                map(_ => _.subtract(data.counter)),
                flatMap((delta: any) =>
                    of(data.counter_format)
                        .pipe(
                            // delta in hexadecimal
                            filter(_ => _ === 'hex'),
                            map(() =>
                                ({
                                    // check if value < 0 to add good pad left
                                    delta: delta.isNegative() ?
                                        `-${pad.left(delta.toString(16).toUpperCase().substr(1), 16, '0')}` :
                                        pad.left(delta.toString(16).toUpperCase(), 16, '0'),
                                    delta_format: 'hex'
                                })
                            ),
                            // delta in integer
                            defaultIfEmpty({
                                delta: parseInt(delta.toString()),
                                delta_format: 'int'
                            } as OTPVerifyResult)
                        )
                ),
                defaultIfEmpty(),
                // If we are here then no codes have matched, throw error
                flatMap(_ =>
                    !!_ ?
                        of(_) :
                        throwError(new Error(`The token '${data.token}' doesn't match for the given paramaters`))
                )
            );
    }

    /**
     * Generates HOTP
     *
     * @param {string} key - Key for the one time password. This should be unique and secret for every user as this is the seed
     *          that is used to calculate the HMAC. Format can be ASCII or HEX.
     * @param {HOTPGenerateOptions} options - Object options could contain:
     *
     *          - {@code key_format} - The format of the key which can be `str` for an ASCII string
     *          or `hex` for a hexadecimal string - default `str`
     *
     *          - {@code counter} - counter value.  This should be stored by the application, must
     *          be user specific, and be incremented for each request - default `0`
     *
     *          - {@code counter_format} - The format of the counter which can be `int` for a number
     *          or `hex` for a hexadecimal string - default `int`
     *
     *          - {@code code_digits} - The number of digits in the OTP, not including the checksum, if any - default `6`
     *
     *          - {@code add_checksum} - A flag indicates if a checksum digit should be appended to the OTP - default `false`
     *
     *          - {@code truncation_offset} - the offset into the MAC result to begin truncation - default `-1`
     *
     *          - {@code algorithm} - The algorithm to create HMAC: 'SHA1' | 'SHA256' | 'SHA512' - default 'SHA512'
     *
     * @returns {Observable<string>} - A numeric string in base 10 includes code_digits plus the optional checksum digit if requested.
     */
    static generate(key: string, options: HOTPGenerateOptions = {}): Observable<string> {
        return of(
            Object.assign({}, options, { key: key })
        )
            .pipe(
                flatMap((data: HOTPGenerateValidatedData) =>
                    Validator.validateDataWithSchemaReference('/rx-otp/schemas/hotp-generate.json', data)
                ),
                map((_: HOTPGenerateValidatedData) =>
                    ({
                        key: _.key_format === 'str' ?
                            Buffer.from(_.key) :
                            Buffer.from(_.key, 'hex'),
                        counter: _.counter_format === 'int' ?
                            Buffer.from(pad.left(converter.convert(_.counter, 10, 16), 16, '0'), 'hex') :
                            Buffer.from(pad.left(_.counter, 16, '0'), 'hex'),
                        code_digits: _.code_digits,
                        add_checksum: _.add_checksum,
                        truncation_offset: _.truncation_offset,
                        algorithm: _.algorithm
                    })
                ),
                flatMap((_: any) =>
                    HOTP._generateOTP(_.key, _.counter, _.code_digits, _.add_checksum, _.truncation_offset, _.algorithm)
                )
            );
    }

    /**
     * Verifies OTP
     *
     * @param {string} token - Passcode to validate
     * @param {string} key - Key for the one time password. This should be unique and secret for every user as this is the seed
     *          that is used to calculate the HMAC. Format can be ASCII or HEX.
     * @param {HOTPVerifyOptions} options - Object options could contain:
     *
     *           - {@code key_format} - The format of the key which can be `str` for an ASCII string
     *          or `hex` for a hexadecimal string - default `str`
     *
     *          - {@code window} - The allowable margin for the counter.  The function will check
     *          'W' codes in the future against the provided passcode.  Note,
     *          it is the calling applications responsibility to keep track of
     *          'C' and increment it for each password check, and also to adjust
     *          it accordingly in the case where the client and server become
     *          out of sync (second argument returns non zero) - default `50`
     *          E.g. if W = 100, and C = 5, this function will check the passcode
     *          against all One Time Passcodes between 5 and 105.
     *
     *          - {@code counter} - counter value.  This should be stored by the application, must
     *          be user specific, and be incremented for each request - default `0`
     *
     *          - {@code counter_format} - The format of the counter which can be `int` for a number
     *          or `hex` for a hexadecimal string - default `int`
     *
     *          - {@code add_checksum} - A flag indicates if a checksum digit should be appended to the OTP - default `false`
     *
     *          - {@code truncation_offset} - the offset into the MAC result to begin truncation - default `-1`
     *
     *          - {@code algorithm} - The algorithm to create HMAC: 'SHA1' | 'SHA256' | 'SHA512' - default 'SHA512'
     *
     *          - {@code previous_otp_allowed}  - A flag to allow OTP validation before current counter - default `false`
     *
     * @returns {Observable<OTPVerifyResult>} - an object {@code {delta: #, delta_format: 'int' | 'hex'},
     *          following counter format, if the token is valid else throw an exception
     */
    static verify(token: string, key: string, options: HOTPVerifyOptions = {}): Observable<OTPVerifyResult | {}> {
        return of(
            Object.assign({}, options, { token: token, key: key })
        )
            .pipe(
                flatMap((data: HOTPVerifyValidatedData) =>
                    Validator.validateDataWithSchemaReference('/rx-otp/schemas/hotp-verify.json', data)
                ),
                map((_: HOTPVerifyValidatedData) =>
                    ({
                        token: _.token,
                        key: _.key_format === 'str' ?
                            Buffer.from(_.key) :
                            Buffer.from(_.key, 'hex'),
                        window: bigInt(_.window),
                        counter: _.counter_format === 'int' ?
                            bigInt(_.counter as number) :
                            bigInt(_.counter as string, 16),
                        counter_format: _.counter_format,
                        code_digits: _.token.length,
                        add_checksum: _.add_checksum,
                        truncation_offset: _.truncation_offset,
                        algorithm: _.algorithm,
                        previous_otp_allowed: _.previous_otp_allowed
                    })
                ),
                map((_: any) =>
                    // Now loop through from C to C + W to determine if there is a correct code
                    Object.assign({}, _, { min: _.counter, max: _.counter.add(_.window) })
                ),
                flatMap((_: any) =>
                    of(_)
                        .pipe(
                            filter(__ =>
                                // check if previous_otp_allowed
                                !!__.previous_otp_allowed
                            ),
                            map(__ =>
                                // Now loop through from C - W to C + W to determine if there is a correct code
                                Object.assign({}, __, { min: __.min.subtract(__.window) })
                            ),
                            map(__ =>
                                // check if min < 0
                                !!__.min.isNegative() ?
                                    // Now loop through from 0 to C + W to determine if there is a correct code
                                    Object.assign({}, __, { min: bigInt() }) :
                                    __
                            ),
                            defaultIfEmpty(_)
                        )
                ),
                flatMap((_: any) =>
                    new Observable(subscriber => {
                        let iterator = [];
                        for (let i = _.min; i.lesserOrEquals(_.max); i = i.next()) {
                            iterator = iterator.concat(i);
                        }
                        const data = Object.assign({}, _, { iterator: iterator });
                        delete data.window;
                        delete data.min;
                        delete data.max;
                        subscriber.next(data);
                        subscriber.complete();
                    })
                ),
                flatMap((_: any) =>
                    HOTP._verifyWithIteration(_)
                )
            );
    }
}
