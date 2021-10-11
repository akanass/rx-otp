import { mergeMap, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  OTPVerifyResult,
  TOTPGenerateOptions,
  TOTPGenerateValidatedData,
  TOTPVerifyOptions,
  TOTPVerifyValidatedData,
  Validator
} from '../schemas';
import { HOTP } from './hotp';

/**
 * TOTP class definition
 */
export class TOTP {
  /**
   * Generates TOTP
   *
   * @param {string} key - Key for the one time password. This should be unique and secret for every user as this is the seed
   *          that is used to calculate the HMAC. Format can be ASCII or HEX.
   * @param {TOTPGenerateOptions} options - Object options could contain:
   *
   *          - {@code key_format} - The format of the key which can be `str` for an ASCII string
   *          or `hex` for a hexadecimal string - default `str`
   *
   *          - {@code time} - The time step of the counter.  This must be the same for
   *          every request and is used to calculate C. - default `30`
   *
   *          - {@code timestamp} - OTP validity timestamp - default current datetime.
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
  static generate = (key: string, options: TOTPGenerateOptions = {}): Observable<string> =>
    of(
      { ...options, key }
    )
      .pipe(
        mergeMap((data: TOTPGenerateValidatedData) =>
          Validator.validateDataWithSchemaReference('/rx-otp/schemas/totp-generate.json', data)
        ),
        map((_: TOTPGenerateValidatedData) =>
          ({
            key: _.key,
            options: {
              key_format: _.key_format,
              // Determine the value of the counter, C - This is the number of time steps in seconds since T0
              counter: Math.floor((_.timestamp / 1000) / _.time),
              code_digits: _.code_digits,
              add_checksum: _.add_checksum,
              truncation_offset: _.truncation_offset,
              algorithm: _.algorithm
            }
          })
        ),
        mergeMap((_: any) =>
          HOTP.generate(_.key, _.options)
        )
      );

  /**
   * Verifies OTP
   *
   * @param {string} token - Passcode to validate
   * @param {string} key - Key for the one time password. This should be unique and secret for every user as this is the seed
   *          that is used to calculate the HMAC. Format can be ASCII or HEX.
   * @param {TOTPVerifyOptions} options - Object options could contain:
   *
   *           - {@code key_format} - The format of the key which can be `str` for an ASCII string
   *          or `hex` for a hexadecimal string - default `str`
   *
   *          - {@code window} - The allowable margin, time steps in seconds since T0, for the counter. The function will check
   *          'W' codes in the future against the provided passcode. - default `1`
   *          E.g. if W = 1, and T = 30, this function will check the passcode
   *          against all One Time Passcodes between -30s and +30s.
   *
   *          - {@code time} - The time step of the counter.  This must be the same for
   *          every request and is used to calculate C. - default `30`
   *
   *          - {@code timestamp} - OTP validity timestamp - default current datetime.
   *
   *          - {@code add_checksum} - A flag indicates if a checksum digit should be appended to the OTP - default `false`
   *
   *          - {@code truncation_offset} - the offset into the MAC result to begin truncation - default `-1`
   *
   *          - {@code algorithm} - The algorithm to create HMAC: 'SHA1' | 'SHA256' | 'SHA512' - default 'SHA512'
   *
   * @returns {Observable<OTPVerifyResult>} - an object {@code {delta: #, delta_format: 'int'} if the token is valid
   *              else throw an exception
   */
  static verify = (token: string, key: string, options: TOTPVerifyOptions = {}): Observable<OTPVerifyResult | {}> =>
    of(
      { ...options, token, key }
    )
      .pipe(
        mergeMap((data: TOTPVerifyValidatedData) =>
          Validator.validateDataWithSchemaReference('/rx-otp/schemas/totp-verify.json', data)
        ),
        map((_: TOTPVerifyValidatedData) =>
          ({
            token: _.token,
            key: _.key,
            options: {
              key_format: _.key_format,
              window: _.window,
              // Determine the value of the counter, C - This is the number of time steps in seconds since T0
              counter: Math.floor((_.timestamp / 1000) / _.time),
              add_checksum: _.add_checksum,
              truncation_offset: _.truncation_offset,
              algorithm: _.algorithm,
              previous_otp_allowed: true
            }
          })
        ),
        mergeMap((_: any) =>
          HOTP.verify(_.token, _.key, _.options)
        )
      );
}
