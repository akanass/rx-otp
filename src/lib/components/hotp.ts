import * as crypto from 'crypto';
import { Buffer } from 'buffer';

import { Observable } from 'rxjs/Observable';
import { map, toArray, flatMap } from 'rxjs/operators';
import { mergeStatic } from 'rxjs/operators/merge';
import { of } from 'rxjs/observable/of';
import { bindNodeCallback } from 'rxjs/observable/bindNodeCallback';

import * as conv from 'binstring';
import * as pad from 'pad-component';
import * as Joi from 'joi';
import { ObjectSchema } from 'joi';
import * as ConvertBase from 'convert-base';

import { HOTP_KEY, HOTP_GENERATE_OPTIONS } from '../schemas';

const converter = new ConvertBase();

/**
 * HOTP key interface
 */
export interface HOTPKey {
    string?: string;
    hex?: string;
}

/**
 * HOTP generation options interface
 */
export interface HOTPGenerationOptions {
    counter?: HOTPCounter;
    codeDigits?: number;
    addChecksum?: boolean;
    truncationOffset?: number;
    algorithm?: 'sha1' | 'sha256' | 'sha512';
}

/**
 * HOTP counter interface
 */
export interface HOTPCounter {
    int?: number;
    hex?: string;
}

/**
 * HOTP class definition
 */
export class HOTP {
    //                                       0  1   2    3     4      5       6        7         8          9           10
    private static DIGITS_POWER: number[] = [1, 10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000, 1000000000, 10000000000];
    // These are used to calculate the check-sum digits.
    private static DOUBLE_DIGITS: number[] = [0, 2, 4, 6, 8, 1, 3, 5, 7, 9];

    /**
     * Calculates the checksum using the credit card algorithm.
     * This algorithm has the advantage that it detects any single
     * mistyped digit and any single transposition of
     * adjacent digits.
     *
     * @param num the number to calculate the checksum for
     * @param digits number of significant places in the number
     *
     * @return the checksum of num
     */
    private static _calcChecksum(num, digits): number {
        // initialize variables
        let doubleDigit = true;
        let total = 0;

        while (0 < digits--) {
            let digit = parseInt(`${num % 10}`);
            num /= 10;
            if (doubleDigit) {
                digit = HOTP.DOUBLE_DIGITS[digit];
            }
            total += digit;
            doubleDigit = !doubleDigit;
        }
        let result = total % 10;
        if (result > 0) {
            result = 10 - result;
        }
        return result;
    }

    /**
     * Function to generate OTP
     *
     * @param {any[]} key - Key for the one time password.
     *
     * @param {any[]} counter - the counter, time, or other value that
     *                      changes on a per use basis.
     *
     * @param {number} codeDigits - the number of digits in the OTP, not
     *                      including the checksum, if any.
     *
     * @param {boolean} addChecksum - a flag indicates if a checksum digit
     *                      should be appended to the OTP.
     *
     * @param {number} truncationOffset - the offset into the MAC result to
     *                     begin truncation.
     *
     * @param {string} algorithm - the algorithm to create HMAC - default 'sha1'
     *
     * @return A numeric string in base 10 includes codeDigits plus the optional checksum digit if requested.
     *
     * @private
     */
    private static _generateOTP(key: any[],
                                counter: any[],
                                codeDigits: number,
                                addChecksum: boolean,
                                truncationOffset: number,
                                algorithm: 'sha1' | 'sha256' | 'sha512'): Observable<string> {
        return of(
            crypto.createHmac(algorithm, Buffer.from(key))
        )
            .pipe(
                map(hmac => conv(hmac.update(Buffer.from(counter)).digest('hex'), { in: 'hex', out: 'bytes' })),
                map(hash =>
                    ({
                        hash,
                        offset: ((0 <= truncationOffset) && (truncationOffset < (hash.length - 4))) ?
                            truncationOffset :
                            (hash[hash.length - 1] & 0xf)
                    })
                ),
                map((_: any) =>
                    ((_.hash[_.offset] & 0x7f) << 24) |
                    ((_.hash[_.offset + 1] & 0xff) << 16) |
                    ((_.hash[_.offset + 2] & 0xff) << 8) |
                    (_.hash[_.offset + 3] & 0xff)
                ),
                map(binary => binary % HOTP.DIGITS_POWER[codeDigits]),
                map(otp => addChecksum ? ((otp * 10) + HOTP._calcChecksum(otp, codeDigits)) : otp),
                map(otp => ({ result: otp.toString(), digits: addChecksum ? (codeDigits + 1) : codeDigits })),
                map((_: any) => pad.left(_.result, _.digits, '0'))
            );
    }

    /**
     * Validates HOTP key with Joi schema
     *
     * @param {HOTPKey} key
     * @param {ObjectSchema} schema
     * @param {any} options
     *
     * @return {Observable<HOTPKey>}
     *
     * @private
     */
    private static _validateHOTPKey(key: HOTPKey, schema: ObjectSchema, options?: any): Observable<HOTPKey> {
        return (<(key: HOTPKey, schema: ObjectSchema, options?: any) =>
            Observable<HOTPKey>> bindNodeCallback(Joi.validate))(key, schema, options);
    }

    /**
     * Validates HOTP generation options with Joi schema
     *
     * @param {HOTPGenerationOptions} hotpGenerationOptions
     * @param {ObjectSchema} schema
     * @param {any} options
     *
     * @return {Observable<HOTPGenerationOptions>}
     *
     * @private
     */
    private static _validateHOTPGenerationOptions(hotpGenerationOptions: HOTPGenerationOptions,
                                                  schema: ObjectSchema,
                                                  options?: any): Observable<HOTPGenerationOptions> {
        return (<(hotpGenerationOptions: HOTPGenerationOptions, schema: ObjectSchema, options?: any) =>
            Observable<HOTPGenerationOptions>> bindNodeCallback(Joi.validate))(hotpGenerationOptions, schema, options);
    }

    /**
     * Generates HOTP
     *
     * @param {HOTPKey} key
     * @param {HOTPGenerationOptions} options
     *
     * @return {Observable<string>}
     */
    static generate(key: HOTPKey, options: HOTPGenerationOptions = {}): Observable<string> {
        return mergeStatic(
            HOTP._validateHOTPKey(key, HOTP_KEY, { language: { key: '"key" ' } }),
            HOTP._validateHOTPGenerationOptions(options, HOTP_GENERATE_OPTIONS, { language: { key: '"options" ' } })
        )
            .pipe(
                toArray(),
                map(_ => ({ keyObj: _.shift() as HOTPKey, opt: _.pop() as HOTPGenerationOptions })),
                map((_: any) =>
                    ({
                        key: _.keyObj.string ?
                            conv(_.keyObj.string, { in: 'binary', out: 'bytes' }) :
                            conv(_.keyObj.hex, { in: 'hex', out: 'bytes' }),
                        opt: _.opt as HOTPGenerationOptions
                    })
                ),
                map((_: any) =>
                    ({
                        key: _.key,
                        counter: (_.opt.counter.int !== null && _.opt.counter.int !== undefined) ?
                            conv(pad.left(converter.convert(_.opt.counter.int, 10, 16), 16, '0'), { in: 'hex', out: 'bytes' }) :
                            conv(pad.left(_.opt.counter.hex, 16, '0'), { in: 'hex', out: 'bytes' }),
                        codeDigits: _.opt.codeDigits,
                        addChecksum: _.opt.addChecksum,
                        truncationOffset: (_.opt.truncationOffset !== null && _.opt.truncationOffset !== undefined) ?
                            _.opt.truncationOffset :
                            -1,
                        algorithm: _.opt.algorithm
                    })
                ),
                flatMap((_: any) =>
                    HOTP._generateOTP(_.key, _.counter, _.codeDigits, _.addChecksum, _.truncationOffset, _.algorithm)
                )
            )
    }
}
