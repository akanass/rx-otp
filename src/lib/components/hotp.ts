import * as crypto from 'crypto';
import { Buffer } from 'buffer';

import { Observable, of, throwError } from 'rxjs';
import { map, flatMap, filter, defaultIfEmpty } from 'rxjs/operators';

import * as pad from 'pad-component';
import * as ConvertBase from 'convert-base';

import { ajv, hotpGenerateValidator } from '../schemas';

const converter = new ConvertBase();

declare const Object;

/**
 * HOTP generation options interface
 */
export interface HOTPGenerateOptions {
    key_format?: 'str' | 'hex';
    counter?: number | string;
    counter_format?: 'int' | 'hex';
    code_digits?: number;
    add_checksum?: boolean;
    truncation_offset?: number;
    algorithm?: 'sha1' | 'sha256' | 'sha512';
}

export interface HOTPGenerateValidatedData extends HOTPGenerateOptions {
    key: string;
}

/**
 * HOTP verify result interface
 */
export interface HOTPVerifyResult {
    delta: number | string;
    delta_format?: 'int' | 'hex';
}

/**
 * HOTP verification options interface
 */
/*export interface HOTPVerifyOptions {
    window?: number;
    counter?: HOTPCounter;
    addChecksum?: boolean;
    truncationOffset?: number;
    algorithm?: 'sha1' | 'sha256' | 'sha512';
    previousOTPAllowed?: boolean;
}*/

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
     * @param {string} algorithm - the algorithm to create HMAC - default 'sha1'
     *
     * @return A numeric string in base 10 includes code_digits plus the optional checksum digit if requested.
     *
     * @private
     */
    private static _generateOTP(key: Buffer,
                                counter: Buffer,
                                code_digits: number,
                                add_checksum: boolean,
                                truncation_offset: number,
                                algorithm: 'sha1' | 'sha256' | 'sha512'): Observable<string> {
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
                            (hash[hash.length - 1] & 0xf)
                    })
                ),
                map((_: any) =>
                    ((_.hash[_.offset] & 0x7f) << 24) |
                    ((_.hash[_.offset + 1] & 0xff) << 16) |
                    ((_.hash[_.offset + 2] & 0xff) << 8) |
                    (_.hash[_.offset + 3] & 0xff)
                ),
                map(binary => binary % HOTP.DIGITS_POWER[code_digits]),
                map(otp => add_checksum ? ((otp * 10) + HOTP._calcChecksum(otp, code_digits)) : otp),
                map(otp => ({ result: otp.toString(), digits: add_checksum ? (code_digits + 1) : code_digits })),
                map((_: any) => pad.left(_.result, _.digits, '0'))
            );
    }

    /**
     * Validates parameters passed in HOTP.generate() function
     *
     * @param {HOTPGenerateValidatedData} data
     *
     * @private
     */
    private static _validateGenerateData(data: HOTPGenerateValidatedData): Observable<HOTPGenerateValidatedData> {
        return of(hotpGenerateValidator(data))
            .pipe(
                filter(_ => !_),
                flatMap(_ => throwError(new Error(ajv.errorsText(hotpGenerateValidator.errors)))),
                defaultIfEmpty(data)
            );
    }

    /**
     * Generates HOTP
     *
     * @param {string} key - secret key in ASCII or HEX format
     * @param {HOTPGenerateOptions} options
     *
     * @return {Observable<string>}
     */
    static generate(key: string, options: HOTPGenerateOptions = {}): Observable<string> {
        return of(
            Object.assign({}, options, {key: key})
        )
            .pipe(
                flatMap((data: HOTPGenerateValidatedData) =>
                    HOTP._validateGenerateData(data)
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
                        truncation_offset: (_.truncation_offset !== null && _.truncation_offset !== undefined) ?
                            _.truncation_offset :
                            -1,
                        algorithm: _.algorithm
                    })
                ),
                flatMap((_: any) =>
                    HOTP._generateOTP(_.key, _.counter, _.code_digits, _.add_checksum, _.truncation_offset, _.algorithm)
                )
            );
    }

    /**
     * Function to verify OTP
     *
     * @param {string} token - Passcode to validate
     * @param {HOTPKey} key - Key for the one time password. This should be unique and secret for every user as this is the seed
     *          that is used to calculate the HMAC. {string: 'secret user'} or {hex:'7365637265742075736572'}
     * @param {HOTPVerifyOptions} options - Object options could contain:
     *
     *          - {@code window} - The allowable margin for the counter.  The function will check
     *          'W' codes in the future against the provided passcode.  Note,
     *          it is the calling applications responsibility to keep track of
     *          'C' and increment it for each password check, and also to adjust
     *          it accordingly in the case where the client and server become
     *          out of sync (second argument returns non zero).
     *          E.g. if W = 100, and C = 5, this function will check the passcode
     *          against all One Time Passcodes between 5 and 105.
     *
     *          - {@code counter} - counter object value.  This should be stored by the application, must
     *          be user specific, and be incremented for each request.
     *          {int: 0} or {hex:'0'}
     *
     *          - {@code addChecksum} - a flag that indicates if a checksum digit should be appended to the OTP.
     *
     *          - {@code truncationOffset} - the offset into the MAC result to begin truncation.  If this value is out of
     *          the range of 0 ... 15, then dynamic truncation  will be used. Dynamic truncation is when the last 4
     *          bits of the last byte of the MAC are used to determine the start offset.
     *
     *          - {@code algorithm} - the algorithm to create HMAC - default 'sha1'
     *
     *          - {@code previousOTPAllowed} - a flag to allow OTP validation before current counter.
     *
     * @return {Observable<HOTPVerifyResult>} - an object {@code {delta: {int: #}}} or {@code {delta: {hex: '#'}}},
     *          following counter format, if the token is valid else {@code null}
     */
    /*static verify(token: string, key: HOTPKey, options: HOTPVerifyOptions = {}): Observable<HOTPVerifyResult> {

    }*/
}
