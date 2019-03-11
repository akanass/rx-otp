<div style='margin-bottom:20px;'>
<div>
    <a href='https://www.typescriptlang.org/docs/tutorial.html'>
        <img src='https://cdn-images-1.medium.com/max/800/1*8lKzkDJVWuVbqumysxMRYw.png'
             align='right' alt='Typescript logo' width='50' height='50' style='border:none;' />
    </a>
    <a href='http://reactivex.io/rxjs'>
        <img src='http://reactivex.io/assets/Rx_Logo_S.png'
             align='right' alt='ReactiveX logo' width='50' height='50' style='border:none;' />
    </a>
</div>
</div>

# TOTP

After imported `TOTP` in your file, you can access to all its methods.

```typescript
import { TOTP } from '@akanass/rx-otp';
```

## Table of contents

* [API in Detail](#api-in-detail)
    * [.generate(key[, options])](#generatekey-options)
    * [.verify(token, key[, options])](#generatetoken-key-options)
* [Parameters types in detail](#parameters-types-in-detail)
    * [TOTPGenerateOptions](#hotpgenerateoptions)
    * [TOTPVerifyOptions](#hotpverifyoptions)
    * [OTPVerifyResult](#otpverifyresult)
* [Change History](#change-history)

## API in Detail

### `.generate(key[, options])`

Generates `TOTP` token for given `key`.

**Parameters:**
> - ***{string} key*** *: Key for the one time password. This should be unique and secret for every user as this is the seed that is used to calculate the HMAC. Format can be `ASCII` or `HEX`.*
> - ***{TOTPGenerateOptions} options*** *(optional): object contains `key_format`, `time`, `timestamp`, `code_digits`, `add_checksum`, `truncation_offset` and `algorithm`. (default: `empty object`).*

**Response:**
*{[Observable](https://github.com/ReactiveX/rxjs/blob/master/src/internal/Observable.ts)} - A numeric `string` in `base 10` includes `code_digits` plus the optional `checksum` digit if requested.*

**Example:**
```typescript
TOTP.generate('12345678901234567890', { timestamp: 59000, code_digits: 8, algorithm: 'SHA1' }).subscribe(
    token => console.log(token), // display 94287082 in the console
    err => console.error(err) // show error in console
);
```

[Back to top](#table-of-contents)

### `.verify(token, key[, options])`

Verifies `TOTP` token with given `key`.

**Parameters:**
> - ***{string} token*** *: Passcode to validate.*
> - ***{string} key*** *: Key for the one time password. This should be unique and secret for every user as this is the seed that is used to calculate the HMAC. Format can be `ASCII` or `HEX`.*
> - ***{TOTPVerifyOptions} options*** *(optional): object contains `key_format`, `window`, `time`, `timestamp`, `add_checksum`, `truncation_offset` and `algorithm`. (default: `empty object`).*

**Response:**
*{[Observable](https://github.com/ReactiveX/rxjs/blob/master/src/internal/Observable.ts)} - `OTPVerifyResult` with `delta` and `delta_format`, following `counter_format`, if the `token` is `valid` else `throw` an exception*

**Example:**
```typescript
TOTP.verify('94287082', '3132333435363738393031323334353637383930', { key_format: 'hex', timestamp: 59000, algorithm: 'SHA1' }).subscribe(
    data => console.log(data), // display {delta: 0, delta_format: 'int'} in the console
    err => console.error(err) // show error in console
);
```

[Back to top](#table-of-contents)

## Parameters types in detail

### *TOTPGenerateOptions*
> - ***{enum} key_format*** *(optional): The format of the key which can be `'str'` for an `ASCII string` or `'hex'` for a `hexadecimal string`. (default `'str'`)*
> - ***{number} time*** *(optional): The time step of the counter.  This must be the same for every request and is used to calculate C. (default `30`)*
> - ***{number} timestamp*** *(optional): OTP validity `timestamp`. (default `current datetime`)*
> - ***{number} code_digits*** *(optional): The number of `digits` in the `OTP`, not including the checksum, if any. (default `6`)*
> - ***{boolean} add_checksum*** *(optional): A flag indicates if a `checksum digit` should be appended to the `OTP`. (default `false`)*
> - ***{number} truncation_offset*** *(optional): The `offset` into the MAC result to begin `truncation`. Between `0` and `15`. (default `-1` to delete it)*
> - ***{enum} algorithm*** *(optional): The algorithm to create HMAC: `'SHA1'` | `'SHA256'` | `'SHA512'`. (default `'SHA512'`)*

### *TOTPVerifyOptions*
> - ***{enum} key_format*** *(optional): The format of the key which can be `'str'` for an `ASCII string` or `'hex'` for a `hexadecimal string`. (default `'str'`)*
> - ***{number} window*** *(optional): The allowable margin, `time steps` in seconds since `T0`, for the counter. The function will check 'W' codes in the future against the provided passcode. If `W = 1`, and `T = 30`, this function will check the passcode against all One Time Passcodes between `-30s` and `+30s`. (default `1`)*
> - ***{number} time*** *(optional): The time step of the counter.  This must be the same for every request and is used to calculate C. (default `30`)*
> - ***{number} timestamp*** *(optional): OTP validity `timestamp`. (default `current datetime`)*
> - ***{boolean} add_checksum*** *(optional): A flag indicates if a `checksum digit` should be appended to the `OTP`. (default `false`)*
> - ***{number} truncation_offset*** *(optional): The `offset` into the MAC result to begin `truncation`. Between `0` and `15`. (default `-1` to delete it)*
> - ***{enum} algorithm*** *(optional): The algorithm to create HMAC: `'SHA1'` | `'SHA256'` | `'SHA512'`. (default `'SHA512'`)*

### *OTPVerifyResult*
> - ***{number | string} delta*** *(required): The `delta` with the `counter` during the `validation`.*
> - ***{enum} delta_format*** *(required): The `delta format` which can be `'int'` for a `number` or `'hex'` for a `hexadecimal string`. This value is the same than `counter_format` in `TOTPVerifyOptions`.*

[Back to top](#table-of-contents)

## Change History

* Implementation of all methods (2019-03-08)
    * [.generate(key[, options])](#generatekey-options)
    * [.verify(token, key[, options])](#generatetoken-key-options)

[Back to top](#table-of-contents)
