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

```html
<div style="widht:150px;height:150px">
    M1 1h7v7h-7zM12 1h1v1h2v-1h1v1h1v-1h1v3h-2v-1h-2v1h-1v1h1v4h-1v-3h-2v1h-1v1h1v1h-2v-6h1v2h2v-2h-1v-1h1zM19 1h1v2h-1zM21 1h1v2h-1zM24 1h2v2h-1v-1h-1zM27 1h1v1h3v-1h1v2h-2v1h-1v1h-1v-2h-1zM33 1h1v2h-1zM35 1h7v7h-7zM2 2v5h5v-5zM23 2h1v1h-1zM36 2v5h5v-5zM3 3h3v3h-3zM20 3h1v1h-1zM32 3h1v1h-1zM37 3h3v3h-3zM14 4h2v1h2v3h-1v-2h-1v2h-1v-3h-1zM19 4h1v1h-1zM22 4h2v1h-1v1h1v2h-1v-1h-1v1h-1v-2h-1v-1h2zM33 4h1v1h-1zM24 5h1v1h-1zM29 5h1v1h1v-1h2v1h-1v2h-1v-1h-1v1h-1v-1h-1v2h-1v-3h2zM33 6h1v4h-1zM11 7h1v1h-1zM19 7h1v1h1v1h-2zM25 7h1v2h-2v-1h1zM22 8h1v1h-1zM1 9h1v1h1v-1h5v1h-1v1h-3v2h-2v3h1v1h-1v1h1v3h-2v-1h1v-1h-1v-7h2v-1h-2zM11 9h1v2h-1zM15 9h4v1h-3v1h-1v1h-1v-1h-1v-1h2zM21 9h1v1h1v-1h1v1h1v1h-1v1h-1v1h-3v-1h2v-1h-3v-1h2zM26 9h1v1h-1zM28 9h1v1h-1zM35 9h5v1h2v1h-2v1h-1v1h1v1h-1v2h-1v1h-1v1h1v-1h2v1h-1v1h-1v2h-1v-1h-1v-1h-1v-1h1v-2h1v-1h-3v-1h4v-1h-2v-1h1v-1h-1v-1h-1zM27 10h1v1h-1zM31 10h2v1h-2zM34 10h1v1h-1zM7 11h4v2h-1v1h-1v-1h-1v-1h-1zM16 11h1v1h-1zM28 11h1v1h-1zM33 11h1v3h-1zM5 12h2v1h-2zM12 12h1v1h1v2h-2v1h1v2h-1v-1h-1v1h1v1h-2v-3h1v-1h-1v-1h2zM15 12h1v1h1v3h1v1h-1v1h-1v-2h-1zM24 12h1v2h-1zM27 12h1v1h1v-1h1v1h1v-1h1v2h-2v2h-2v-1h1v-1h-3v-1h1zM40 12h2v1h-2zM7 13h1v1h-1zM18 13h1v1h-1zM6 14h1v1h-1zM19 14h1v1h-1zM21 14h2v1h1v2h-2v1h-1v1h-2v1h1v1h-2v-1h-3v1h1v1h-1v1h-1v-2h-2v-1h2v-1h-1v-1h3v1h1v-1h1v-1h1v-1h1v-1h1v1h1v-1h-1zM25 14h1v1h-1zM32 14h1v1h-1zM41 14h1v1h-1zM4 15h1v2h-1zM7 15h2v2h-1v-1h-1zM26 15h1v1h-1zM33 15h1v3h-1zM25 16h1v2h-1zM27 16h1v1h1v1h-2zM31 16h1v2h1v1h-2v-1h-1v-1h1zM5 17h3v1h-1v1h1v1h-3v-1h1v-1h-1zM22 18h2v1h-1v1h3v-2h1v1h2v1h1v1h-1v1h-2v-1h1v-1h-1v1h-4v1h2v1h-2v2h-3v-1h2v-1h-3v-1h2v-3h1zM40 18h2v1h-1v2h-1zM33 19h1v2h-1zM4 20h1v1h5v-1h1v1h1v1h1v1h-2v1h2v-1h1v2h-2v2h-1v1h1v1h-2v-1h-1v-5h1v-1h-1v1h-1v-1h-1v1h-2v1h2v1h-1v1h1v1h-1v1h-1v-1h-1v-1h-1v-1h-1v-1h1v-1h-2v-1h3zM31 20h1v1h-1zM17 21h1v3h-2v-1h1zM30 21h1v1h-1zM36 21h1v1h1v1h-1v1h-3v-1h1v-1h1zM39 21h1v1h2v1h-3zM29 22h1v3h-1v-1h-1v-1h1zM32 22h1v1h-1zM7 23h1v1h-1zM26 23h1v1h-1zM31 23h1v1h-1zM38 23h1v2h1v1h-1v1h-2v1h-1v-2h1v-2h1zM15 24h1v1h-1zM24 24h1v1h1v1h-1v1h-1zM33 24h1v1h-1zM40 24h2v3h-1v-2h-1zM1 25h1v1h-1zM7 25h1v1h-1zM14 25h1v1h-1zM16 25h3v1h-2v1h-2v-1h1zM27 25h1v1h-1zM30 25h2v1h1v1h-1v2h-1v-3h-1zM2 26h1v1h-1zM13 26h1v4h1v3h1v-1h1v1h3v1h-2v1h-2v-1h-1v1h1v1h-1v1h-1v1h-1v-2h1v-1h-1v-2h1v-2h-2v-1h1zM21 26h2v1h1v2h-2v-2h-1zM26 26h1v1h-1zM28 26h2v1h-1v1h-2v-1h1zM34 26h1v1h-1zM1 27h1v1h-1zM7 27h1v1h-1zM17 27h3v1h-3zM25 27h1v1h-1zM40 27h1v1h1v1h-1v1h1v1h-2v-1h-2v-1h-1v-1h2v1h1zM3 28h1v1h-1zM8 28h1v1h-1zM20 28h1v1h-1zM2 29h1v1h2v-1h1v2h-1v1h1v1h-2v-2h-2v3h-1v-4h1zM7 29h1v1h-1zM9 29h1v1h-1zM15 29h4v1h-1v2h-1v-2h-2zM21 29h1v1h-1zM25 29h6v1h-1v3h-1v1h1v2h-2v-4h-1v-1h2v-1h-4zM32 29h1v2h-2v-1h1zM36 29h1v1h1v1h2v1h-1v1h-1v1h1v2h-1v1h3v1h-8v-2h-1v-1h1v-2h1v-1h1v1h2v-1h-1v-1h-1v-1h1zM22 30h2v1h-2zM6 31h3v1h-3zM10 31h1v1h-1zM21 31h1v1h-1zM24 31h2v1h-1v2h1v1h-2v-1h-2v-2h2zM11 32h1v3h-1v-1h-1v1h-1v-1h-3v-1h5zM32 32h1v1h-1zM40 32h2v1h-1v1h-1zM26 33h1v1h-1zM30 33h2v1h-2zM20 34h1v1h-1zM34 34v3h3v-3zM41 34h1v1h-1zM1 35h7v7h-7zM10 35h1v1h-1zM19 35h1v1h-1zM23 35h1v1h-1zM35 35h1v1h-1zM2 36v5h5v-5zM9 36h1v2h1v1h-1v1h-1zM11 36h1v1h-1zM16 36h1v1h-1zM21 36h1v1h-1zM27 36h1v1h-1zM31 36h1v1h-1zM41 36h1v1h-1zM3 37h3v3h-3zM17 37h1v1h-1zM19 37h1v1h-1zM22 37h2v1h-1v1h1v2h-2v-1h-1v-2h1zM25 37h1v1h-1zM28 37h1v1h-1zM30 37h1v1h-1zM12 38h1v2h1v-2h1v1h1v-1h1v1h1v-1h1v2h-1v2h-2v-1h1v-1h-1v1h-2v1h-1v-1h-1v-1h-1v-1h1zM24 38h1v1h-1zM27 38h1v1h1v1h1v1h2v-2h-1v-1h2v2h1v-1h6v1h-1v1h1v1h-3v-2h-2v1h-2v1h-4v-1h-1v-1h-2v1h-1v-2h2zM29 38h1v1h-1zM19 40h2v1h-1v1h-1zM40 40h1v1h-1zM9 41h3v1h-3zM21 41h1v1h-1zM24 41h1v1h-1zM26 41h2v1h-2zM35 41h1v1h-1z
</div>
```

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