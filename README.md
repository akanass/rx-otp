[![Build Status](https://travis-ci.org/njl07/otp.js.svg)](https://travis-ci.org/njl07/otp.js)
[![Coverage Status](https://coveralls.io/repos/njl07/otp.js/badge.png?branch=master)](https://coveralls.io/r/njl07/otp.js?branch=master)
[![npm version](https://badge.fury.io/js/otp.js.png)](http://badge.fury.io/js/otp.js)

[![NPM](https://nodei.co/npm/otp.js.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/otp.js/)

## One-Time Password manager

One Time Password manager is fully compliant with [HOTP](http://tools.ietf.org/html/rfc4226) (counter based one time passwords) and [TOTP](http://tools.ietf.org/html/rfc6238) (time based one time passwords). It can be used in conjunction with the `Google Authenticator`, for Two-Factor Authentication, which has free apps for `iOS`, `Android` and `BlackBerry`.

All methods described in both `RFC` are implemented in [API](#api).

* [Installation](#installation)
* [Getting started](#getting-started)
    * [OTP Generation](#otp-generation)
    * [OTP Verification](#otp-verification)
* [Google Authenticator](#google-authenticator)
    * [Base32 Keys](#base32-keys)
    * [RFC 3548](#rfc-3548)
    * [Code Generation](#code-generation)
    * [Code Verification](#code-verification)
    * [QRCode Generation](#qrcode-generation)
* [API](#api)
    * [HOTP.gen(key, [opt])](#hotpgenkey-opt)
    * [HOTP.verify(token, key, [opt])](#hotpverifytoken-key-opt)
    * [TOTP.gen(key, [opt])](#totpgenkey-opt)
    * [TOTP.verify(token, key, [opt])](#totpverifytoken-key-opt)
    * [GA.encode(secret)](#gaencodesecret)
    * [GA.decode(base32Secret)](#gadecodebase32secret)
    * [GA.secret()](#gasecret)
    * [GA.keyUri(user, issuer, base32Secret)](#gakeyuriuser-issuer-base32secret)
    * [GA.qrCode(user, issuer, base32Secret)](#gaqrcodeuser-issuer-base32secret)
    * [GA.gen(secret)](#gagensecret)
    * [GA.verify(token, secret, window)](#gaverifytoken-secret-window)
* [Release History](#release-history)
* [License](#license)

## Installation

Install module with: `npm install --save otp.js`

```javascript
var OTP = require('otp.js');
```
## Getting started

```javascript
var OTP = require('otp.js');

// get HOTP object
var HOTP = OTP.hotp;
```

### OTP Generation

```javascript
try
{
    // generate otp for key '12345678901234567890' in string format
    var code = HOTP.gen({string:'12345678901234567890'});

    console.log(code); // print otp result => 755224
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

```javascript
var OTP = require('otp.js');

// get GoogleAuthenticator object
var GA = OTP.googleAuthenticator;
```

### Base32 Keys

`Google Authenticator` requires keys to be `base32` encoded.

### RFC 3548

Google Authenticator requires an [RFC 3548](http://tools.ietf.org/html/rfc3548) compliant encoder.

OTP calculation will still work should you want to use other `base32` encoding methods (like Crockford's Base 32) but it will NOT be compatible with `Google Authenticator`.

### Code Generation

```javascript
try
{
    // generate otp for base 32 encoded user secret
    var code = GA.gen(GA.encode('base 32 encoded user secret'));

    console.log(code); // print otp result => 6-digit number
}
catch(ex)
{
    console.error(ex); // print error occurred during OTP generation process
}
```

### Code Verification

```javascript
try
{
    // verify otp '755224' for base 32 encoded user secret
    var result = GA.verify('XXXXXX', GA.encode('base 32 encoded user secret'));

    console.log(result); // print result => {delta:#}
}
catch(ex)
{
    console.error(ex); // print error occurred during OTP verification process
}
```

### QRCode Generation

```javascript
try
{
    // generate base32 secret
    var secret = GA.encode('base 32 encoded user secret') || GA.secret();

    // get QRCode in SVG format
    var qrCode = GA.qrCode('akanass', 'otp.js', secret);

    console.log(qrCode); // print svg => <svg xmlns="http://www.w3.org/2000/svg" width="215" height="215" viewBox="0 0 43 43">...</svg>
}
catch(ex)
{
    console.error(ex); // print error occurred during QRCode generation
}
```

You can scan this `qrCode` with your `Google Authenticator` application to show result:

![QRCode](http://www.otpjs.com/images/qrCode.svg)

## API

All examples assume as base:

* `var HOTP = require('otp.js').hotp;`
* `var TOTP = require('otp.js').totp;`
* `var GA = require('otp.js').googleAuthenticator;`

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

Returns a time based one time password.

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

### `GA.encode(secret)`

Returns `base32` string.

**secret**
> Secret to encode

### `GA.decode(base32Secret)`

Returns string.

**base32Secret**
> Secret, to decode, in `base32`

### `GA.secret()`

Returns random `16-digit base32` encoded secret.

### `GA.keyUri(user, issuer, secret)`

Returns string representation of [key uri](https://code.google.com/p/google-authenticator/wiki/KeyUriFormat): `otpauth://totp/issuer:user@host?secret=xxx&issuer=yyy`

**user**
> The user for this account.

**issuer**
> The provider or service managing that account.

**secret**
> The secret in `base32`. This should be unique and secret for every user as this is the seed that is used to calculate the HMAC.

### `GA.qrCode(user, issuer, secret)`

Returns string with image data - `SVG` format.

**user**
> The user for this account.

**issuer**
> The provider or service managing that account.

**secret**
> The secret in `base32`. This should be unique and secret for every user as this is the seed that is used to calculate the HMAC.

### `GA.gen(secret)`

Returns a time based one time password.

**secret**
> The secret in `base32` to generate OTP. This should be unique and secret for every user as this is the seed that is used to calculate the HMAC.

### `GA.verify(token, secret, [window])`

Check a time based one time password for validity.

Returns `null` if token is not valid for given key and options.

Returns an object `{delta: #}` if the token is valid. `delta` is the count skew between client and server.

**token**
> Passcode to validate

**secret**
> The secret in `base32` to validate OTP. This should be unique and secret for every user as this is the seed that is used to calculate the HMAC.

**window**
> The allowable margin, time steps in seconds since T0, for the counter.  The function will check 'W' codes in the past and the future against the provided passcode.  Note, it is the calling applications responsibility to keep track of 'C' and increment it for each password check, and also to adjust it accordingly in the case where the client and server become out of sync (second argument returns non zero).
>> e.g: if `W = 5`, and `C = 100`, this function will check the passcode against all One Time Passcodes between `95` and `105`.
>>
>> Default value is: `6`

## Release History

| Version    | Notes       |
|:-----------|:------------|
| 1.0.0      | Release Version |
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
| 0.0.2      | API movement |
| 0.0.1      | First Prototype |

## License
Copyright (c) 2014 Nicolas Jessel. Licensed under the [MIT license](https://github.com/njl07/otp.js/blob/master/LICENSE.md).