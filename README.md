[![Build Status](https://travis-ci.org/njl07/otp-manager.svg)](https://travis-ci.org/njl07/otp-manager)
[![Coverage Status](https://coveralls.io/repos/njl07/otp-manager/badge.png?branch=master)](https://coveralls.io/r/njl07/otp-manager?branch=master)
[![npm version](https://badge.fury.io/js/otp-manager.png)](http://badge.fury.io/js/otp-manager)

[![NPM](https://nodei.co/npm/otp-manager.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/otp-manager/)

# One-Time Password manager

One Time Password manager is fully compliant with [HOTP](http://tools.ietf.org/html/rfc4226) (counter based one time passwords) and [TOTP](http://tools.ietf.org/html/rfc6238) (time based one time passwords). It can be used in conjunction with the Google Authenticator which has free apps for iOS, Android and BlackBerry.

All methods described in both `RFC` are implemented in [API](#api).

* [Installation](#installation)
* [Getting started](#getting-started)
* [Google Authenticator](#google-authenticator)
* [API](#api)
* [Release History](#release-history)
* [License](#license)

# Installation

Install module with: `npm install --save otp-manager`

```javascript
var OTPManager = require('otp-manager');
```
# Getting started

```javascript
var OTPManager = require('otp-manager');

// get HOTP object
var HOTP = OTPManager.hotp;
```

###OTP Generation

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

###OTP Verification

To be implemented

# Google Authenticator

To be implemented

# API

## HOTP.gen(key, opt)

Return a counter based one-time password.

**key**
> Key for the one time password. This should be unique and secret for every user as this is the seed that is used to calculate the HMAC.
> Key is an object with 2 exclusive attributes to define the key's format: ASCII string or Hexadecimal string.
> e.g: `{string:'12345678901234567890'}` or `{hex: '3132333435363738393031323334353637383930'}`

**opt**
> Object option to generate HOTP and can contain the following attributes:
>
> - `counter`: this should be stored by the application, must be user specific, and be incremented for each request.
Counter is an object with 2 exclusive attributes to define the counter's format: integer or hexadecimal string.
>> e.g: `{counter:{int:0}}` or `{counter:{hex:'0000000000000000'}}`
>> Default value is: `{counter:{int:0}}`
>
> - `codeDigits`: the number of digits in the OTP, not including the checksum, if any.
> If you want 6 digits and you add checksum, finally OTP length will be 7 digits.
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

## HOTP.verify(token, key, opt)

To be implemented

## TOTP.gen(key, opt)

To be implemented

## TOTP.verify(token, key, opt)

To be implemented

# Release History

| Version    | Notes       |
|:-----------|:------------|
| 0.1.0      | Version with HOTP generation implementation |
| 0.0.3      | Version Bump for publish |
| 0.0.2      | API movement |
| 0.0.1      | First Prototype |

# License
Copyright (c) 2014 Nicolas Jessel. Licensed under the [MIT license](https://github.com/njl07/otp-manager/blob/master/LICENSE.md).