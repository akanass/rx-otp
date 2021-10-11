# U2F

After imported `U2F` in your file, you can access to all its methods.

```typescript
import { U2F } from '@akanass/rx-otp';
```

## Table of contents

* [API in Detail](#api-in-detail)
    * [.generateAuthToken(base32_key[, options])](#generatebase32_key-options)
    * [.verifyAuthToken(token, base32_key[, options])](#generatetoken-base32_key-options)
    * [.generateTOTPUri(secret, account_name, issuer[, options])](#generatetotpurisecret-account_name-issuer-options)
    * [.generateAuthKey()](#generateauthkey)
    * [.generateOTPKey([asBuffer])](#generateotpkeyasbuffer)
    * [.encodeAuthKey(buffer)](#encodeauthkeybuffer)
    * [.decodeAuthKey(base32_key)](#decodeauthkeybase32_key)
    * [.qrCode(text[, options])](#qrcodetest-options)
* [Parameters types in detail](#parameters-types-in-detail)
    * [U2FGenerateOptions](#hotpgenerateoptions)
    * [U2FVerifyOptions](#hotpverifyoptions)
    * [U2FUriOptions](#u2furioptions)
    * [OTPVerifyResult](#otpverifyresult)
    * [QrCodeGenerateOptions](#qrcodegenerateoptions)
* [Change History](#change-history)

## API in Detail

### `.generateAuthToken(base32_key[, options])`

Generates an `authenticator` token for given `base32` key.

**Parameters:**
> - ***{string} base32_key*** *(required): The secret in `base32`. This should be unique and secret for every user as this is the seed that is used to calculate the HMAC.*
> - ***{U2FGenerateOptions} options*** *(optional): object contains `time`, `timestamp`, `code_digits`, `add_checksum`, `truncation_offset` and `algorithm`. (default: `empty object`).*

**Response:**
*{[Observable](https://github.com/ReactiveX/rxjs/blob/master/src/internal/Observable.ts)} - A numeric `string` in `base 10` includes `code_digits` plus the optional `checksum` digit if requested.*

**Example:**
```typescript
U2F.generateAuthToken('RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5', { timestamp: 59000 }).subscribe({
    next: token => console.log(token), // display 766122 in the console
    error: err => console.error(err) // show error in console
});
```

[Back to top](#table-of-contents)

### `.verifyAuthToken(token, base32_key[, options])`

Verifies `authenticator` token with given `base32` key.

**Parameters:**
> - ***{string} token*** *(required): Passcode to validate.*
> - ***{string} base32_key*** *(required): The secret in `base32`. This should be unique and secret for every user as this is the seed that is used to calculate the HMAC.*
> - ***{U2FVerifyOptions} options*** *(optional): object contains `window`, `time`, `timestamp`, `add_checksum`, `truncation_offset` and `algorithm`. (default: `empty object`).*

**Response:**
*{[Observable](https://github.com/ReactiveX/rxjs/blob/master/src/internal/Observable.ts)} - `OTPVerifyResult` with `delta` and `delta_format: 'int'`  if the `token` is `valid` else `throw` an exception*

**Example:**
```typescript
U2F.verifyAuthToken('766122', 'RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5', { timestamp: 59000 }).subscribe({
    next: data => console.log(data), // display {delta: 0, delta_format: 'int'} in the console
    error: err => console.error(err) // show error in console
});
```

[Back to top](#table-of-contents)

### `.generateTOTPUri(secret, account_name, issuer[, options])`

Full `OTPAUTH URI` spec as explained in [google-authenticator](https://github.com/google/google-authenticator/wiki/Key-Uri-Format) documentation.

**Parameters:**
> - ***{string} secret*** *(required): The secret in `base32`. This should be unique and secret for every user as this is the seed that is used to calculate the HMAC.*
> - ***{string} account_name*** *(required): The user for this account.*
> - ***{string} issuer*** *(required): The provider or service managing that account.*
> - ***{U2FUriOptions} options*** *(optional): object contains `time`, `code_digits`, `algorithm`. (default: `empty object`).*

**Response:**
*{[Observable](https://github.com/ReactiveX/rxjs/blob/master/src/internal/Observable.ts)} - `string` OTPAUTH URI*

**Example:**
```typescript
U2F.generateTOTPUri('RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5', 'akanass', 'rx-otp').subscribe({
    next: uri => console.log(uri), // display 'otpauth://totp/rx-otp:akanass?secret=RHCQ3M3YP5KYU4VS7KGT2IUHR7M4TEC5&issuer=rx-otp&algorithm=SHA512&digits=6&period=30' in the console
    error: err => console.error(err) // show error in console
});
```

[Back to top](#table-of-contents)

### `.generateAuthKey()`

Generates `OTP key` in `base32` format (in the style of Google Authenticator - same as Facebook, Microsoft, etc).

**Response:**
*{[Observable](https://github.com/ReactiveX/rxjs/blob/master/src/internal/Observable.ts)} - A random `20 bytes` key as `base32`. Key has `39 chars` length including `spaces`.*

**Example:**
```typescript
U2F.generateAuthKey().subscribe({
    next: key => console.log(key), // display key like 'RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5' in the console
    error: err => console.error(err) // show error in console
});
```

[Back to top](#table-of-contents)

### `.generateOTPKey([asBuffer])`

Generates random `20 bytes` `OTP key`.

**Parameters:**
> - ***{boolean} asBuffer*** *(optional): Flag to know if we return `key` in `Buffer` or `hexadecimal string`. (default `false`)*

**Response:**
*{[Observable](https://github.com/ReactiveX/rxjs/blob/master/src/internal/Observable.ts)} - A random `20 bytes` key in `Buffer` or `hexadecimal string` format. Key has `40 chars` length in `hexadecimal string`.*

**Example:**
```typescript
U2F.generateOTPKey().subscribe({
    next: key => console.log(key), // display key like 'bf233f4af8f70ff321996ddb41433b1a2f7ff3ce' in the console
    error: err => console.error(err) // show error in console
});
```

[Back to top](#table-of-contents)

### `.encodeAuthKey(buffer)`

Text-encode the key in the `Buffer` as `base32` (in the style of Google Authenticator - same as Facebook, Microsoft, etc).

**Parameters:**
> - ***{Buffer} buffer*** *(required): `Secret key` in `Buffer` format.*

**Response:**
*{[Observable](https://github.com/ReactiveX/rxjs/blob/master/src/internal/Observable.ts)} - `Secret key` as `base32`. Key has `39 chars` length including `spaces`.*

**Example:**
```typescript
U2F.encodeAuthKey(Buffer.from('secret key')).subscribe({
    next: key => console.log(key), // display 'ONSW G4TF OQQG WZLZ' in the console
    error: err => console.error(err) // show error in console
});
```

[Back to top](#table-of-contents)

### `.decodeAuthKey(base32_key)`

Decodes `base32 key` (Google Authenticator, FB, M$, etc).

**Parameters:**
> - ***{string} base32_key*** *(required): The `key` from `base32`.*

**Response:**
*{[Observable](https://github.com/ReactiveX/rxjs/blob/master/src/internal/Observable.ts)} - Binary-decode the key from base32.*

**Example:**
```typescript
U2F.decodeAuthKey('ONSW G4TF OQQG WZLZ').subscribe({
    next: buffer => console.log(buffer), // display Buffer.from('secret key') in the console
    error: err => console.error(err) // show error in console
});
```

[Back to top](#table-of-contents)

### `.qrCode(text[, options])`

Generates `QR code`.

**Parameters:**
> - ***{string} text*** *(required): Text to encode.*
> - ***{QrCodeGenerateOptions} options*** *(optional): object contains `ec_level`, `type`, `size`. (default: `empty object`).*

**Response:**
*{[Observable](https://github.com/ReactiveX/rxjs/blob/master/src/internal/Observable.ts)} - `String` with image data. (`Buffer` for `png`)*

**Example:**
```typescript
U2F.generateTOTPUri('RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5', 'akanass', 'rx-otp')
    .pipe(
        flatMap(_ => U2F.qrCode(_))
    )
.subscribe({
    next: svg => console.log(svg), // display '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47 47">...</svg>' in the console
    error: err => console.error(err) // show error in console
});
```

You can scan this `QR code` with your `Google Authenticator` application to show the result:

<div style='margin:20px 0;'>
    <image src='https://bit.ly/2SZYD3R' width='115' height='115' alt='qr-code' style='border:none;' />
</div>

[Back to top](#table-of-contents)

## Parameters types in detail

### *U2FGenerateOptions*
> - ***{enum} key_format*** *(optional): The format of the key which can be `'str'` for an `ASCII string` or `'hex'` for a `hexadecimal string`. (default `'str'`)*
> - ***{number} time*** *(optional): The time step of the counter.  This must be the same for every request and is used to calculate C. (default `30`)*
> - ***{number} timestamp*** *(optional): OTP validity `timestamp`. (default `current datetime`)*
> - ***{number} code_digits*** *(optional): The number of `digits` in the `OTP`, not including the checksum, if any. (default `6`)*
> - ***{boolean} add_checksum*** *(optional): A flag indicates if a `checksum digit` should be appended to the `OTP`. (default `false`)*
> - ***{number} truncation_offset*** *(optional): The `offset` into the MAC result to begin `truncation`. Between `0` and `15`. (default `-1` to delete it)*
> - ***{enum} algorithm*** *(optional): The algorithm to create HMAC: `'SHA1'` | `'SHA256'` | `'SHA512'`. (default `'SHA512'`)*

### *U2FVerifyOptions*
> - ***{enum} key_format*** *(optional): The format of the key which can be `'str'` for an `ASCII string` or `'hex'` for a `hexadecimal string`. (default `'str'`)*
> - ***{number} window*** *(optional): The allowable margin, `time steps` in seconds since `T0`, for the counter. The function will check 'W' codes in the future against the provided passcode. If `W = 1`, and `T = 30`, this function will check the passcode against all One Time Passcodes between `-30s` and `+30s`. (default `1`)*
> - ***{number} time*** *(optional): The time step of the counter.  This must be the same for every request and is used to calculate C. (default `30`)*
> - ***{number} timestamp*** *(optional): OTP validity `timestamp`. (default `current datetime`)*
> - ***{boolean} add_checksum*** *(optional): A flag indicates if a `checksum digit` should be appended to the `OTP`. (default `false`)*
> - ***{number} truncation_offset*** *(optional): The `offset` into the MAC result to begin `truncation`. Between `0` and `15`. (default `-1` to delete it)*
> - ***{enum} algorithm*** *(optional): The algorithm to create HMAC: `'SHA1'` | `'SHA256'` | `'SHA512'`. (default `'SHA512'`)*

### *U2FUriOptions*
> - ***{number} time*** *(optional): The time step of the counter.  This must be the same for every request and is used to calculate C. (default `30`)*
> - ***{number} code_digits*** *(optional): The number of `digits` in the `OTP`, not including the checksum, if any. (default `6`)*
> - ***{enum} algorithm*** *(optional): The algorithm to create HMAC: `'SHA1'` | `'SHA256'` | `'SHA512'`. (default `'SHA512'`)*

### *OTPVerifyResult*
> - ***{number | string} delta*** *(required): The `delta` with the `counter` during the `validation`.*
> - ***{enum} delta_format*** *(required): The `delta format` which can be `'int'` for a `number` or `'hex'` for a `hexadecimal string`. This value is the same than `counter_format` in `U2FVerifyOptions`.*

### *QrCodeGenerateOptions*
> - ***{enum} ec_level*** *(optional): Error correction level. One of `'L'`, `'M'`, `'Q'`, `'H'`. (default `'M'`).*
> - ***{enum} type*** *(optional): Image type. Possible values `'png'` or `'svg'`. (default `'svg'`).*
> - ***{number} size*** *(optional): Size of one module in pixels. (default `5` for `png `and `undefined` for `svg`).*

[Back to top](#table-of-contents)

## Change History

* Implementation of all methods (2019-03-08)
    * [.generateAuthToken(base32_key[, options])](#generatebase32_key-options)
    * [.verifyAuthToken(token, base32_key[, options])](#generatetoken-base32_key-options)
    * [.generateTOTPUri(secret, account_name, issuer[, options])](#generatetotpurisecret-account_name-issuer-options)
    * [.generateAuthKey()](#generateauthkey)
    * [.generateOTPKey([asBuffer])](#generateotpkeyasbuffer)
    * [.encodeAuthKey(buffer)](#encodeauthkeybuffer)
    * [.decodeAuthKey(base32_key)](#decodeauthkeybase32_key)
    * [.qrCode(text[, options])](#qrcodetest-options)

[Back to top](#table-of-contents)
