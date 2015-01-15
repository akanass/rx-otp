[![Build Status](https://travis-ci.org/njl07/otp-manager.svg)](https://travis-ci.org/njl07/otp-manager)
[![Coverage Status](https://coveralls.io/repos/njl07/otp-manager/badge.png?branch=master)](https://coveralls.io/r/njl07/otp-manager?branch=master)
[![npm version](https://badge.fury.io/js/otp-manager.png)](http://badge.fury.io/js/otp-manager)

[![NPM](https://nodei.co/npm/otp-manager.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/otp-manager/)

## One-Time Password manager

One Time Password manager is fully compliant with [HOTP](http://tools.ietf.org/html/rfc4226) (counter based one time passwords) and [TOTP](http://tools.ietf.org/html/rfc6238) (time based one time passwords). It can be used in conjunction with the `Google Authenticator` which has free apps for `iOS`, `Android` and `BlackBerry`.

All methods described in both `RFC` are implemented in [API](#api).

* [Installation](#installation)
* [Getting started](#getting-started)
    * [OTP Generation](#otp-generation)
    * [OTP Verification](#otp-verification)
* [Google Authenticator](#google-authenticator)
* [API](#api)
    * [HOTP.gen(key, [opt])](#hotpgenkey-opt)
    * [HOTP.verify(token, key, [opt])](#hotpverifytoken-key-opt)
    * [TOTP.gen(key, [opt])](#totpgenkey-opt)
    * [TOTP.verify(token, key, [opt])](#totpverifytoken-key-opt)
* [Release History](#release-history)
* [License](#license)

## Installation

Install module with: `npm install --save otp-manager`

```javascript
var OTPManager = require('otp-manager');
```
## Getting started

```javascript
var OTPManager = require('otp-manager');

// get HOTP object
var HOTP = OTPManager.hotp;
```

### OTP Generation

```javascript
try
{
    // generate otp for key '12345678901234567890' in string format
    var otp = HOTP.gen({string:'12345678901234567890'});

    console.log(otp); // print otp result => 755224
}
catch(ex)
{
    console.error(ex); // print error occurred during OTP generation process
}
```

### OTP Verification

```javascript
try
{
    // verify otp '755224' for key '12345678901234567890' in string format
    var result = HOTP.verify('755224', {string:'12345678901234567890'});

    console.log(result); // print result => {delta:{int:0}}
}
catch(ex)
{
    console.error(ex); // print error occurred during OTP verification process
}
```


## Google Authenticator

<svg xmlns="http://www.w3.org/2000/svg" width="78" height="78" viewBox="0 0 39 39"><path d="M1 1h7v7h-7zM10 1h2v1h-1v1h-1v1h1v1h-2v-3h1zM14 1h1v1h-1zM16 1h2v1h-2zM19 1h2v2h1v-2h1v3h1v1h1v1h-3v-2h-1v2h-1v-4h-1zM24 1h1v1h-1zM27 1h1v3h-1v-1h-2v-1h2zM31 1h7v7h-7zM2 2v5h5v-5zM13 2h1v1h-1zM15 2h1v1h-1zM18 2h1v1h-1zM32 2v5h5v-5zM3 3h3v3h-3zM11 3h1v1h-1zM29 3h1v6h-2v1h-2v-1h1v-2h1v1h1v-2h-3v-1h3zM33 3h3v3h-3zM18 4h1v1h-1zM11 5h1v1h-1zM13 5h2v1h-2zM16 5h1v1h-1zM12 6h1v1h-1zM19 6h1v2h-1zM21 6h1v2h-1zM9 7h1v1h1v-1h1v4h-3v2h-1v-1h-1v-1h1v-1h1zM13 7h1v1h1v-1h1v3h-1v-1h-2zM17 7h1v1h-1zM23 7h1v1h-1zM25 7h1v1h-1zM20 8h1v1h-1zM1 9h1v2h-1zM7 9h1v1h-1zM19 9h1v1h-1zM22 9h2v2h-3v-1h1zM30 9h2v1h2v-1h3v2h1v7h-1v-1h-1v1h-1v1h-1v-3h-1v-1h2v1h1v-2h1v-2h-2v1h1v1h-2v-1h-1v-2h-2v-1h-1zM4 10h3v1h-3zM14 10h1v1h-1zM28 10h2v1h-1v1h-2v-1h1zM2 11h1v1h2v1h-3zM12 11h1v1h-1zM18 11h2v1h-2zM30 11h1v2h2v1h-4v-1h1zM6 12h1v1h-1zM11 12h1v1h-1zM13 12h1v3h-1v-1h-1v-1h1zM15 12h3v2h2v-2h1v2h2v1h1v1h-2v3h-1v1h-1v-1h-1v-1h2v-1h-3v-1h-2v-1h1v-2h-2zM24 12h1v1h-1zM1 13h1v2h-1zM7 13h1v1h-1zM10 13h1v1h-1zM25 13h2v1h-2zM4 14h3v1h-3zM8 14h1v1h-1zM24 14h1v1h-1zM27 14h2v2h-1v-1h-1zM7 15h1v1h-1zM12 15h1v2h-1v1h-1v1h-1v1h-3v-1h2v-2h1v-1h2zM14 15h1v1h-1zM19 15v1h2v-1zM26 15h1v1h-1zM1 16h2v1h1v1h1v1h-1v1h-2v2h1v1h-1v2h1v-2h3v2h-1v-1h-1v2h-1v1h-1v3h-1v-11h1v-2h-1zM4 16h3v1h1v1h-1v1h-1v-2h-2zM15 16h1v3h-1zM24 16h1v1h-1zM29 16h1v1h1v-1h1v2h1v1h1v1h1v1h-1v2h-1v-1h-2v1h1v2h1v-1h2v1h-1v1h-1v1h-1v1h4v-1h2v1h-1v1h-3v1h1v1h-1v1h1v1h-1v1h-2v1h-2v-1h-1v1h-2v-1h-1v-1h1v-1h2v-1h-1v-1h-3v-1h-1v-1h1v-1h-1v-2h1v1h3v-1h1v4h2v-1h-1v-1h1v-2h-2v-1h1v-2h-1v2h-1v-1h-1v-2h1v-1h-2v-1h1v-1h-2v-1h4zM17 17h1v1h-1zM23 17h1v1h-1zM13 18h1v2h2v1h3v1h-1v1h-1v1h-1v-1h-1v-1h-1v-1h-1v-1h-2v-1h2zM28 18v1h1v-1zM30 18v2h-1v1h1v-1h1v1h1v-2h-1v-1zM36 18h1v1h-1zM5 19h1v1h-1zM16 19h1v1h-1zM18 19h1v1h-1zM22 19h3v1h-1v1h2v1h-1v1h-2v-3h-1zM35 19h1v1h-1zM37 19h1v1h-1zM10 20h1v1h-1zM21 20h1v2h-1zM36 20h1v2h-1zM4 21h1v1h-1zM7 21h1v1h-1zM11 21h2v2h2v2h-1v-1h-1v1h1v1h-1v1h-2v-2h1v-3h-1zM10 22h1v3h-1v5h3v1h-4v-1h-6v-1h1v-1h2v1h2v-1h1v-4h1zM19 22h2v1h-1v1h-1zM35 22h1v1h-1zM37 22h1v2h-2v-1h1zM7 23h1v1h-1zM21 23h2v1h-2zM26 23h1v1h-1zM17 24h1v1h4v1h1v1h-1v1h-1v-1h-1v-1h-2v1h-1v-1h-1v2h1v1h-3v-1h1v-1h-1v-1h1v-1h2zM23 24h1v1h-1zM25 24h1v1h-1zM27 24h1v1h-1zM6 25h2v1h-2zM36 25h2v1h-2zM4 26h2v1h-2zM34 26h1v1h-1zM6 27h2v1h-2zM18 27h2v1h-2zM26 27v2h2v-1h-1v-1zM12 28h1v1h-1zM20 28h1v1h-1zM17 29h2v2h-2v1h-1v-1h-1v-1h2zM23 29h1v1h-1zM20 30h3v1h-1v2h-1v2h-1v2h-1v-1h-3v-1h1v-1h-1v1h-1v-1h-1v1h1v1h-1v2h-2v-1h1v-4h2v-1h1v1h1v-1h3zM24 30h1v1h2v1h-2v3h-2v-2h1zM30 30v3h3v-3zM37 30h1v3h-1zM1 31h7v7h-7zM13 31h1v1h-1zM31 31h1v1h-1zM35 31h1v1h-1zM2 32v5h5v-5zM10 32h2v1h-2zM3 33h3v3h-3zM18 33v2h1v-1h1v-1zM35 33h2v1h-1v1h1v-1h1v4h-1v-2h-2zM10 34h1v1h-1zM11 35h1v2h-1zM21 35h2v1h-2zM29 35h1v1h-1zM32 35h1v1h-1zM15 36h1v1h2v1h-3zM23 36h1v1h-1zM27 36h2v1h-2zM30 36h2v2h-1v-1h-1zM34 36h1v1h-1zM9 37h1v1h-1zM20 37h2v1h-2zM24 37h2v1h-2zM29 37h1v1h-1zM33 37h1v1h-1zM35 37h1v1h-1z"/></svg>

## API

All examples assume as base:

* `var HOTP = require('otp-manager').hotp;`
* `var TOTP = require('otp-manager').totp;`

### `HOTP.gen(key, [opt])`

Returns a counter based one-time password.

**key**
> Key for the one time password. This should be unique and secret for every user as this is the seed that is used to calculate the HMAC.
> Key is an object with 2 exclusive attributes to define the key's format: `ASCII string` or `Hexadecimal string (>=2-digit)`.
>
> e.g: `{string:'12345678901234567890'}` or `{hex: '3132333435363738393031323334353637383930'}`

**opt**
> Object option to generate HOTP and can contain the following attributes:
>
> - `counter`: this should be stored by the application, must be user specific, and be incremented for each request.
> Counter is an object with 2 exclusive attributes to define the counter's format: `integer (<=2^53)` or `hexadecimal string (<=16-digit)`.
>> e.g: `{counter:{int:0}}` or `{counter:{hex:'0'}}`
>>
>> Default value is: `{counter:{int:0}}`
>
> - `codeDigits`: the number of digits in the OTP, not including the checksum, if any.
> If you want `6 digits` and you `add checksum`, finally OTP length will be `7 digits`.
>> Default value is: `{codeDigits:6}`
>
> - `addChecksum`: a flag that indicates if a checksum digit should be appended to the OTP.
>> Default value is: `{addChecksum:false}`
>
> - `truncationOffset`: the offset into the MAC result to begin truncation. If this value is out of the range of `0 ... 15`, then dynamic truncation will be used. Dynamic truncation is when the last 4 bits of the last byte of the MAC are used to determine the start offset.
>> Default value is: `undefined` for dynamic truncation
>
> - `algorithm`: the algorithm to create HMAC (`sha1`, `sha256`, `sha512`)
>> Default value is: `sha1`
>
> Finally, `opt` object will be like this:
>> Default value: `{counter:{int:0}, codeDigits:6, addChecksum:false, algorithm:'sha1'}`

### `HOTP.verify(token, key, [opt])`

Check a counter based one time password for validity.

Returns `null` if token is not valid for given key and options.

Returns an object `{delta: {int: #}}` or `{delta: {hex: '#'}}`, following counter format, if the token is valid. `delta` is the count skew between client and server.

**token**
> Passcode to validate

**key**
> Key for the one time password. This should be unique and secret for every user as this is the seed that is used to calculate the HMAC.
> Key is an object with 2 exclusive attributes to define the key's format: `ASCII string` or `Hexadecimal string (>=2-digit)`.
>
> e.g: `{string:'12345678901234567890'}` or `{hex: '3132333435363738393031323334353637383930'}`

**opt**
> Object option to verify HOTP and can contain the following attributes:
>
> - `window`: The allowable margin for the counter.  The function will check 'W' codes in the future against the provided passcode.  Note, it is the calling applications responsibility to keep track of 'C' and increment it for each password check, and also to adjust it accordingly in the case where the client and server become out of sync (second argument returns non zero).
>> e.g: if `W = 50`, and `C = 15`, this function will check the passcode against all One Time Passcodes between `15` and `65`.
>>
>> Default value is: `50`
>
> - `counter`: this should be stored by the application, must be user specific, and be incremented for each success request if `delta >= 0`.
> Increment value will be `delta + 1`.
> Counter is an object with 2 exclusive attributes to define the counter's format: `integer (<=2^53)` or `hexadecimal string (<=16-digit)`.
>> e.g: `{counter:{int:0}}` or `{counter:{hex:'0'}}`
>>
>> Default value is: `{counter:{int:0}}`
>
> - `addChecksum`: a flag that indicates if a checksum digit should be appended to the OTP.
>> Default value is: `{addChecksum:false}`
>
> - `truncationOffset`: the offset into the MAC result to begin truncation. If this value is out of the range of `0 ... 15`, then dynamic truncation will be used. Dynamic truncation is when the last 4 bits of the last byte of the MAC are used to determine the start offset.
>> Default value is: `undefined` for dynamic truncation
>
> - `algorithm`: the algorithm to create HMAC (`sha1`, `sha256`, `sha512`)
>> Default value is: `sha1`
>
> - `previousOTPAllowed`: a flag to allow OTP validation before current counter.
>> e.g: if `P = true`, `W = 50`, and `C = 15`, this function will check the passcode against all One Time Passcodes between `0` and `65` because `min` value must be always `>=0`
>>
>> e.g: if `P = true`, `W = 50`, and `C = 150`, this function will check the passcode against all One Time Passcodes between `100` and `200`
>>
>> Default value is: `{previousOTPAllowed:false}`
>
> Finally, `opt` object will be like this:
>> Default value: `{window:50, counter:{int:0}, addChecksum:false, algorithm:'sha1', previousOTPAllowed:false}`

### `TOTP.gen(key, [opt])`

Return a time based one time password

**key**
> Key for the one time password. This should be unique and secret for every user as this is the seed that is used to calculate the HMAC.
> Key is an object with 2 exclusive attributes to define the key's format: `ASCII string` or `Hexadecimal string (>=2-digit)`.
>
> e.g: `{string:'12345678901234567890'}` or `{hex: '3132333435363738393031323334353637383930'}`

**opt**
> Object option to generate TOTP and can contain the following attributes:
>
> - `time`: the time step of the counter in seconds. This must be the same for every request and is used to calculate C.
>> Default value is: `{time:30}`
>
> - `timestamp`: OTP validity timestamp.
>> Default value is: `{timestamp:new Date().getTime()}`
>
> - `codeDigits`: the number of digits in the OTP, not including the checksum, if any.
> If you want `6 digits` and you `add checksum`, finally OTP length will be `7 digits`.
>> Default value is: `{codeDigits:6}`
>
> - `addChecksum`: a flag that indicates if a checksum digit should be appended to the OTP.
>> Default value is: `{addChecksum:false}`
>
> - `truncationOffset`: the offset into the MAC result to begin truncation. If this value is out of the range of `0 ... 15`, then dynamic truncation will be used. Dynamic truncation is when the last 4 bits of the last byte of the MAC are used to determine the start offset.
>> Default value is: `undefined` for dynamic truncation
>
> - `algorithm`: the algorithm to create HMAC (`sha1`, `sha256`, `sha512`)
>> Default value is: `sha1`
>
> Finally, `opt` object will be like this:
>> Default value: `{time:30, timestamp:new Date().getTime(), codeDigits:6, addChecksum:false, algorithm:'sha1'}`

### `TOTP.verify(token, key, [opt])`

Check a time based one time password for validity.

Returns `null` if token is not valid for given key and options.

Returns an object `{delta: #}` if the token is valid. `delta` is the count skew between client and server.

**token**
> Passcode to validate

**key**
> Key for the one time password. This should be unique and secret for every user as this is the seed that is used to calculate the HMAC.
> Key is an object with 2 exclusive attributes to define the key's format: `ASCII string` or `Hexadecimal string (>=2-digit)`.
>
> e.g: `{string:'12345678901234567890'}` or `{hex: '3132333435363738393031323334353637383930'}`

**opt**
> Object option to verify HOTP and can contain the following attributes:
>
> - `window`: The allowable margin, time steps in seconds since T0, for the counter.  The function will check 'W' codes in the past and the future against the provided passcode.  Note, it is the calling applications responsibility to keep track of 'C' and increment it for each password check, and also to adjust it accordingly in the case where the client and server become out of sync (second argument returns non zero).
>> e.g: if `W = 5`, and `C = 100`, this function will check the passcode against all One Time Passcodes between `95` and `105`.
>>
>> Default value is: `6`
>
> - `time`: the time step of the counter in seconds. This must be the same for every request and is used to calculate C.
>> Default value is: `{time:30}`
>
> - `timestamp`: OTP validity timestamp.
>> Default value is: `{timestamp:new Date().getTime()}`
>
> - `addChecksum`: a flag that indicates if a checksum digit should be appended to the OTP.
>> Default value is: `{addChecksum:false}`
>
> - `truncationOffset`: the offset into the MAC result to begin truncation. If this value is out of the range of `0 ... 15`, then dynamic truncation will be used. Dynamic truncation is when the last 4 bits of the last byte of the MAC are used to determine the start offset.
>> Default value is: `undefined` for dynamic truncation
>
> - `algorithm`: the algorithm to create HMAC (`sha1`, `sha256`, `sha512`)
>> Default value is: `sha1`
>
> Finally, `opt` object will be like this:
>> Default value: `{window:6, time:30, timestamp:new Date().getTime(), addChecksum:false, algorithm:'sha1'}`

## Release History

| Version    | Notes       |
|:-----------|:------------|
| 0.7.0      | Version with Google Authenticator implementation |
| 0.6.0      | Version with TOTP verification implementation |
| 0.5.1      | Refactor tests - only unit tests |
| 0.5.0      | Option to allow validation for OTP were generated before current counter |
| 0.4.0      | Version with TOTP generation implementation |
| 0.3.0      | Add algorithm choice to generate and verify OTP (sha1, sha256, sha512) |
| 0.2.0      | Version with HOTP verification implementation |
| 0.1.3      | Update unit tests |
| 0.1.2      | Update tests and schemas validation |
| 0.1.1      | Update integration tests |
| 0.1.0      | Version with HOTP generation implementation |
| 0.0.3      | Version Bump for publish |
| 0.0.2      | API movement |
| 0.0.1      | First Prototype |

## License
Copyright (c) 2014 Nicolas Jessel. Licensed under the [MIT license](https://github.com/njl07/otp-manager/blob/master/LICENSE.md).