[![Build Status](https://travis-ci.org/njl07/otp-manager.svg)](https://travis-ci.org/njl07/otp-manager)
[![Coverage Status](https://coveralls.io/repos/njl07/otp-manager/badge.png?branch=master)](https://coveralls.io/r/njl07/otp-manager?branch=master)
[![npm version](https://badge.fury.io/js/otp-manager.png)](http://badge.fury.io/js/otp-manager)

[![NPM](https://nodei.co/npm/otp-manager.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/otp-manager/)

## One-Time Password manager

One Time Password manager is fully compliant with [HOTP](http://tools.ietf.org/html/rfc4226) (counter based one time passwords) and [TOTP](http://tools.ietf.org/html/rfc6238) (time based one time passwords). It can be used in conjunction with the Google Authenticator which has free apps for iOS, Android and BlackBerry.

All methods described in both `RFC` are implemented in [API](#api).

* [Installation](#installation)
* [Getting started](#getting-started)
    * [OTP Generation](#otp-generation)
    * [OTP Verification](#otp-verification)
* [Google Authenticator](#google-authenticator)
* [API](#api)
    * [HOTP.gen(key, opt)](#hotpgenkey-opt)
    * [HOTP.verify(token, key, opt)](#hotpverifytoken-key-opt)
    * [TOTP.gen(key, opt)](#totpgenkey-opt)
    * [TOTP.verify(token, key, opt)](#totpverifytoken-key-opt)
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
    var delta = HOTP.verify('755224', {string:'12345678901234567890'});

    console.log(delta); // print delta result => {delta:{int:0}}
}
catch(ex)
{
    console.error(ex); // print error occurred during OTP verification process
}
```


## Google Authenticator

To be implemented

## API

### HOTP.gen(key, opt)

Return a counter based one-time password.

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
>> Default value is: `{truncationOffset:-1}` for dynamic truncation
>
> Finally, `opt` object will be like this:
>> Default value: `{counter:{int:0}, codeDigits:6, addChecksum:false, truncationOffset:-1}`

### HOTP.verify(token, key, opt)

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
> - `window`: The allowable margin for the counter.  The function will check 'W' codes in the future against the provided passcode.  Note, it is the calling applications responsibility to keep track of 'W' and increment it for each password check, and also to adjust it accordingly in the case where the client and server become out of sync (second argument returns non zero).
>> e.g: if `W = 50`, and `C = 15`, this function will check the passcode against all One Time Passcodes between `15` and `65`.
>>
>> Default value is: `50`
>
> - `counter`: this should be stored by the application, must be user specific, and be incremented for each request.
> Counter is an object with 2 exclusive attributes to define the counter's format: `integer (<=2^53)` or `hexadecimal string (<=16-digit)`.
>> e.g: `{counter:{int:0}}` or `{counter:{hex:'0'}}`
>>
>> Default value is: `{counter:{int:0}}`
>
> - `addChecksum`: a flag that indicates if a checksum digit should be appended to the OTP.
>> Default value is: `{addChecksum:false}`
>
> - `truncationOffset`: the offset into the MAC result to begin truncation. If this value is out of the range of `0 ... 15`, then dynamic truncation will be used. Dynamic truncation is when the last 4 bits of the last byte of the MAC are used to determine the start offset.
>> Default value is: `null` for dynamic truncation
>
> Finally, `opt` object will be like this:
>> Default value: `{window:50, counter:{int:0}, addChecksum:false}`

### TOTP.gen(key, opt)

To be implemented

### TOTP.verify(token, key, opt)

To be implemented

## Release History

| Version    | Notes       |
|:-----------|:------------|
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