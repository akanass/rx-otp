import { Buffer } from 'buffer';
import * as crypto from 'crypto';
import * as qr from 'qr-image';
import { mergeMap, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { decode, encode } from 'thirty-two';
import {
  OTPVerifyResult,
  QrCodeGenerateOptions,
  QrCodeGenerateValidatedOptions,
  U2FGenerateOptions,
  U2FGenerateValidatedData,
  U2FUriOptions,
  U2FUriValidatedData,
  U2FVerifyOptions,
  U2FVerifyValidatedData,
  Validator
} from '../schemas';
import { TOTP } from './totp';

/**
 * U2F class definition
 */
export class U2F {
  /**
   * Generates OTP key
   *
   * @param {boolean} asBuffer - Flag to know if we return key in Buffer or hexadecimal string
   *
   * @returns {Observable<Buffer | string>} - A random 20 bytes key in Buffer or hexadecimal string format
   */
  static generateOTPKey = (asBuffer: boolean = false): Observable<Buffer | string> =>
    of(crypto.randomBytes(20).toString('hex'))
      .pipe(
        map((key: string) => !!asBuffer ? Buffer.from(key, 'hex') : key)
      );

  /**
   * Text-encode the key as base32 (in the style of Google Authenticator - same as Facebook, Microsoft, etc)
   *
   * @param {Buffer} buffer - Secret key in Buffer format
   *
   * @returns {Observable<string>} - Text-encode the key as base32
   */
  static encodeAuthKey = (buffer: Buffer): Observable<string> =>
    of(buffer)
      .pipe(
        // 32 ascii characters without trailing '='s
        map(_ => (encode(_).toString() as string).replace(/=/g, '')),
        // uppercase with a space every 4 characters
        map(_ => _.replace(/(\w{4})/g, '$1 ').trim())
      );

  /**
   * Decodes base32 key (Google Authenticator, FB, M$, etc)
   *
   * @param {string} base32_key - The key from base32
   *
   * @returns {Observable<Buffer>} - Binary-decode the key from base32
   */
  static decodeAuthKey = (base32_key: string): Observable<Buffer> =>
    U2F._cleanBase32Key(base32_key)
      .pipe(
        map(_ => decode(_))
      );

  /**
   * Generates OTP key in base32 format (in the style of Google Authenticator - same as Facebook, Microsoft, etc)
   *
   * @returns {Observable<string>} - A random 20 bytes key as base32
   */
  static generateAuthKey = (): Observable<string> =>
    U2F.generateOTPKey(true)
      .pipe(
        mergeMap((_: Buffer) => U2F.encodeAuthKey(_))
      );

  /**
   * Full OTPAUTH URI spec as explained at https://github.com/google/google-authenticator/wiki/Key-Uri-Format
   *
   * @param {string} secret - The secret in base32. This should be unique and secret for
   *          every user as this is the seed that is used to calculate the HMAC.
   * @param {string} account_name - The user for this account
   * @param {string} issuer - The provider or service managing that account
   * @param {U2FUriOptions} options - Object options could contain:
   *
   *          - {@code time} - The time step of the counter.  This must be the same for
   *          every request and is used to calculate C. - default `30`
   *
   *          - {@code code_digits} - The number of digits in the OTP - default `6`
   *
   *          - {@code algorithm} - The algorithm to create HMAC: 'SHA1' | 'SHA256' | 'SHA512' - default 'SHA512'
   *
   * @returns {Observable<string>} - OTPAUTH URI
   */
  static generateTOTPUri = (secret: string, account_name: string, issuer: string, options: U2FUriOptions = {}): Observable<string> =>
    U2F._cleanBase32Key(secret)
      .pipe(
        map(_ => Object.assign({}, options, { secret: _, account_name: account_name, issuer: issuer })),
        mergeMap((data: U2FUriValidatedData) =>
          Validator.validateDataWithSchemaReference('/rx-otp/schemas/u2f-uri.json', data)
        ),
        map((_: U2FUriValidatedData) =>
          // tslint:disable-next-line
          `otpauth://totp/${encodeURI(_.issuer)}:${encodeURI(_.account_name)}?secret=${_.secret}&issuer=${encodeURIComponent(_.issuer)}&algorithm=${_.algorithm}&digits=${_.code_digits}&period=${_.time}`
        )
      );

  /**
   * Generates an authenticator token
   *
   * @param {string} base32_key - The secret in base32. This should be unique and secret for
   *          every user as this is the seed that is used to calculate the HMAC.
   * @param {U2FGenerateOptions} options - Object options could contain:
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
  static generateAuthToken = (base32_key: string, options: U2FGenerateOptions = {}): Observable<string> =>
    U2F.decodeAuthKey(base32_key)
      .pipe(
        map((_: Buffer) => Object.assign({}, options, { key: _.toString('hex') })),
        mergeMap((data: U2FGenerateValidatedData) =>
          Validator.validateDataWithSchemaReference('/rx-otp/schemas/u2f-generate.json', data)
        ),
        map((_: U2FGenerateValidatedData) =>
          ({
            key: _.key,
            options: {
              key_format: 'hex',
              time: _.time,
              timestamp: _.timestamp,
              code_digits: _.code_digits,
              add_checksum: _.add_checksum,
              truncation_offset: _.truncation_offset,
              algorithm: _.algorithm
            }
          })
        ),
        mergeMap((_: any) =>
          TOTP.generate(_.key, _.options)
        )
      );

  /**
   * Verifies an authenticator token
   *
   * @param {string} token - Passcode to validate
   * @param {string} base32_key - The secret in base32. This should be unique and secret for
   *          every user as this is the seed that is used to calculate the HMAC.
   * @param {U2FVerifyOptions} options - Object options could contain:
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
  static verifyAuthToken = (token: string, base32_key: string, options: U2FVerifyOptions = {}): Observable<OTPVerifyResult | {}> =>
    U2F.decodeAuthKey(base32_key)
      .pipe(
        map((_: Buffer) => Object.assign({}, options, { token: token, key: _.toString('hex') })),
        mergeMap((data: U2FVerifyValidatedData) =>
          Validator.validateDataWithSchemaReference('/rx-otp/schemas/u2f-verify.json', data)
        ),
        map((_: U2FVerifyValidatedData) =>
          ({
            token: _.token,
            key: _.key,
            options: {
              key_format: 'hex',
              window: _.window,
              time: _.time,
              timestamp: _.timestamp,
              add_checksum: _.add_checksum,
              truncation_offset: _.truncation_offset,
              algorithm: _.algorithm
            }
          })
        ),
        mergeMap((_: any) =>
          TOTP.verify(_.token, _.key, _.options)
        )
      );

  /**
   * Generates QR code
   *
   * @param {string} text - Text to encode
   * @param {QrCodeGenerateOptions} options - Object options could contain:
   *
   *          - {@code ec_level} - Error correction level. One of L, M, Q, H - default `M`
   *
   *          - {@code type} - Image type. Possible values png or svg - default `svg`
   *
   *          - {@code size} - Size of one module in pixels. Default `5` for png and `undefined` for svg.
   *
   * @returns {Observable<string | Buffer>} - String with image data. (Buffer for png)
   */
  static qrCode = (text: string, options: QrCodeGenerateOptions = {}): Observable<string | Buffer> =>
    of(
      Object.assign({}, options, { text: text })
    )
      .pipe(
        mergeMap((data: QrCodeGenerateValidatedOptions) =>
          Validator.validateDataWithSchemaReference('/rx-otp/schemas/u2f-qr.json', data)
        ),
        map((_: QrCodeGenerateValidatedOptions) =>
          ({
            text: _.text,
            options: {
              ec_level: _.ec_level,
              type: _.type,
              size: _.size
            }
          })
        ),
        map(_ =>
          !!_.options.size ?
            _ :
            ({
              text: _.text,
              options: {
                ec_level: _.options.ec_level,
                type: _.options.type,
              }
            })),
        map((_: any) => qr.imageSync(_.text, _.options))
      );

  /**
   * Cleans base32 key to have only characters
   *
   * @param {string} base32_key - The key from base32
   *
   * @returns {Observable<string>} - Text-encode the key as base32 with cleaning format
   *
   * @private
   * @internal
   */
  private static _cleanBase32Key = (base32_key: string): Observable<string> =>
    of(base32_key)
      .pipe(
        map(_ => _.replace(/[\s\.\_\-]+/g, ''))
      );
}
