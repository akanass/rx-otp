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

# HOTP

After imported `HOTP` in your file, you can access to all its methods.

```typescript
import { HOTP } from '@akanass/rx-otp';
```

## Table of contents

* [API in Detail](#api-in-detail)
    * [.generate(key[, options])](#generatekey-options)
    * [.verify(token, key[, options])](#generatetoken-key-options)
* [Parameters types in detail](#parameters-types-in-detail)
    * [HOTPGenerateOptions](#hotpgenerateoptions)
    * [HOTPVerifyOptions](#hotpverifyoptions)
    * [OTPVerifyResult](#otpverifyresult)
* [Change History](#change-history)

## API in Detail

### `.generate(key[, options])`

Generates `HOTP` token for given `key`.

**Parameters:**
> - ***{string} key*** *: Key for the one time password. This should be unique and secret for every user as this is the seed that is used to calculate the HMAC. Format can be `ASCII` or `HEX`.*
> - ***{HOTPGenerateOptions} options*** *(optional): object contains `key_format`, `counter`, `counter_format`, `code_digits`, `add_checksum`, `truncation_offset` and `algorithm`. (default: `empty object`).*

**Response:**
*{[Observable](https://github.com/ReactiveX/rxjs/blob/master/src/internal/Observable.ts)} - A numeric `string` in `base 10` includes `code_digits` plus the optional `checksum` digit if requested.*

**Example:**
```typescript
HOTP.generate('12345678901234567890').subscribe(
    token => console.log(token), // display 125165 in the console
    err => console.error(err) // show error in console
);
```

[Back to top](#table-of-contents)

### `.verify(token, key[, options])`

Verifies `HOTP` token with given `key`.

**Parameters:**
> - ***{string} token*** *: Passcode to validate.*
> - ***{string} key*** *: Key for the one time password. This should be unique and secret for every user as this is the seed that is used to calculate the HMAC. Format can be `ASCII` or `HEX`.*
> - ***{HOTPVerifyOptions} options*** *(optional): object contains `key_format`, `window`, `counter`, `counter_format`, `add_checksum`, `truncation_offset` , `algorithm` and `previous_otp_allowed`. (default: `empty object`).*

**Response:**
*{[Observable](https://github.com/ReactiveX/rxjs/blob/master/src/internal/Observable.ts)} - `OTPVerifyResult` with `delta` and `delta_format`, following `counter_format`, if the `token` is `valid` else `throw` an exception*

**Example:**
```typescript
HOTP.verify('125165', '12345678901234567890').subscribe(
    data => console.log(data), // display {delta: 0, delta_format: 'int'} in the console
    err => console.error(err) // show error in console
);
```

[Back to top](#table-of-contents)

## Parameters types in detail

### *HOTPGenerateOptions*
> - ***{enum} key_format*** *(optional): The format of the key which can be `'str'` for an `ASCII string` or `'hex'` for a `hexadecimal string`. (default `'str'`)*
> - ***{number | string} counter*** *(optional): Counter value. This should be stored by the application, must be user specific, and be incremented for each request. (default `0`)*
> - ***{enum} counter_format*** *(optional): The format of the `counter` which can be `'int'` for a `number` or `'hex'` for a `hexadecimal string`. (default `'int'`)*
> - ***{number} code_digits*** *(optional): The number of `digits` in the `OTP`, not including the checksum, if any. (default `6`)*
> - ***{boolean} add_checksum*** *(optional): A flag indicates if a `checksum digit` should be appended to the `OTP`. (default `false`)*
> - ***{number} truncation_offset*** *(optional): The `offset` into the MAC result to begin `truncation`. Between `0` and `15`. (default `-1` to delete it)*
> - ***{enum} algorithm*** *(optional): The algorithm to create HMAC: `'SHA1'` | `'SHA256'` | `'SHA512'`. (default `'SHA512'`)*

### *HOTPVerifyOptions*
> - ***{enum} key_format*** *(optional): The format of the key which can be `'str'` for an `ASCII string` or `'hex'` for a `hexadecimal string`. (default `'str'`)*
> - ***{number} window*** *(optional): The allowable margin for the counter.  The function will check 'W' codes in the future against the provided passcode.  Note, it is the calling applications responsibility to keep track of 'C' and increment it for each password check, and also to adjust it accordingly in the case where the client and server become out of sync (second argument returns non zero). (default `50`)*
> - ***{number | string} counter*** *(optional): Counter value. This should be stored by the application, must be user specific, and be incremented for each request. (default `0`)*
> - ***{enum} counter_format*** *(optional): The format of the `counter` which can be `'int'` for a `number` or `'hex'` for a `hexadecimal string`. (default `'int'`)*
> - ***{boolean} add_checksum*** *(optional): A flag indicates if a `checksum digit` should be appended to the `OTP`. (default `false`)*
> - ***{number} truncation_offset*** *(optional): The `offset` into the MAC result to begin `truncation`. Between `0` and `15`. (default `-1` to delete it)*
> - ***{enum} algorithm*** *(optional): The algorithm to create HMAC: `'SHA1'` | `'SHA256'` | `'SHA512'`. (default `'SHA512'`)*
> - ***{boolean} previous_otp_allowed*** *(optional): A flag to allow `OTP` validation `before` current `counter`. (default `false`)*

### *OTPVerifyResult*
> - ***{number | string} delta*** *(required): The `delta` with the `counter` during the `validation`.*
> - ***{enum} delta_format*** *(required): The `delta format` which can be `'int'` for a `number` or `'hex'` for a `hexadecimal string`. This value is the same than `counter_format` in `HOTPVerifyOptions`.*

[Back to top](#table-of-contents)

## Change History

* Implementation of all methods (2019-03-08)
    * [.generate(key[, options])](#generatekey-options)
    * [.verify(token, key[, options])](#generatetoken-key-options)

[Back to top](#table-of-contents)
