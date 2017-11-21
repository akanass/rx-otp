/* See LICENSE file for terms of use */
'use strict';

// import libraries
var _ = require('underscore'),
    base32 = require('thirty-two'),
    joi = require('joi'),
    schema = require('./schemas/googleAuthenticator'),
    qr = require('qr-image'),
    uid = require('uid-safe'),
    TOTP = require('./TOTP');

/**
 * {GoogleAuthenticator} constructor
 *
 * @constructor
 */
var GoogleAuthenticator = function GoogleAuthenticator()
{
    // save instance
    var self = this;

    Object.defineProperties(self, {
        /**
         * Function to encode in base 32
         *
         * @param {@code secret} secret will be encoded
         *
         * @return base 32 string
         */
        encode:
        {
            value: function (secret)
            {
                return base32.encode(secret).toString().replace(/=/g,'');
            },
            enumerable: true
        },
        /**
         * Function to decode a base 32 secret
         *
         * @param {@code secret} base 32 secret will be decoded
         *
         * @return secret hex string
         */
        decode:
        {
            value: function (base32Secret)
            {
                return base32.decode(base32Secret).toString('hex');
            },
            enumerable: true
        },
        /**
         * Function to generate base32 secret
         *
         * @return random 16-digit base32 encoded secret
         */
        secret:
        {
            value: function()
            {
                return self.encode(uid.sync(7).toUpperCase());
            },
            enumerable: true
        },
        /**
         * Function to generate the key uri for authenticator
         * otpauth://totp/issuer:user@host?secret=xxx&issuer=yyy
         *
         * @param {@code u} the user for this account
         *
         * @param {@code i} the provider or service managing that account
         *
         * @param {@code s} the secret in base32. This should be unique and secret for
         *                  every user as this is the seed that is used to calculate the HMAC.
         *
         * @return string representation of key uri
         */
        keyUri:
        {
            value: function(u, i, s)
            {
                // set defaults values
                var _user = u || '',
                    _issuer = i || '',
                    _secret = s || '',
                    _data = '%issuer:%user?secret=%secret&issuer=%issuer',
                    _protocol = 'otpauth://totp/';

                // validate inputs
                var userValidate = joi.validate(_user, schema.user, {language: {label: 'user'}});

                if (userValidate.error)
                {
                    throw userValidate.error;
                }

                _user = userValidate.value;

                var issuerValidate = joi.validate(_issuer, schema.issuer, {language: {label: 'issuer'}});

                if (issuerValidate.error)
                {
                    throw issuerValidate.error;
                }

                _issuer = issuerValidate.value;

                // ensure uniformity
                _issuer = _issuer.charAt(0).toUpperCase() + _issuer.substr(1);

                var secretValidate = joi.validate(_secret, schema.secret, {language: {label: 'secret'}});

                if (secretValidate.error)
                {
                    throw secretValidate.error;
                }

                _secret = secretValidate.value;

                // ensure uniformity
                _secret = _secret.toUpperCase();

                // Repalce string
                _data = _data.replace('%user', _user);
                _data = _data.replace('%secret', _secret);
                _data = _data.replace(/%issuer/g, _issuer);

                return encodeURIComponent(_protocol + _data);

            },
            enumerable: true
        },
        /**
         * Function to generate QR code
         *
         * @param {@code u} the user for this account
         *
         * @param {@code i} the provider or service managing that account
         *
         * @param {@code s} the secret in base32. This should be unique and secret for
         *                  every user as this is the seed that is used to calculate the HMAC.
         *
         * @return string with image data - SVG format
         */
        qrCode:
        {
            value: function(u, i, s)
            {
                return qr.imageSync(decodeURIComponent(self.keyUri(u, i, s)), {type: 'svg', size: 5});
            },
            enumerable: true
        },
        /**
         * Function to generate Google Authenticator TOTP
         *
         * @param {@code s} the secret in `base32` to generate OTP. This should be unique and secret for
         *                  every user as this is the seed that is used to calculate the HMAC.
         *
         * @return time based one time password.
         */
        gen:
        {
            value: function(s)
            {
                // set defaults values
                var _secret = s || '';

                // validate inputs
                var secretValidate = joi.validate(_secret, schema.secret, {language: {label: 'secret'}});

                if (secretValidate.error)
                {
                    throw secretValidate.error;
                }

                _secret = secretValidate.value;

                // ensure uniformity
                _secret = _secret.toUpperCase();

                return TOTP.gen({hex:self.decode(_secret)});
            },
            enumerable: true
        },
        /**
         * Function to verify Google Authenticator TOTP
         *
         * @param {@code t} Passcode to validate
         *
         * @param {@code s} the secret in `base32` to verify OTP. This should be unique and secret for
         *                  every user as this is the seed that is used to calculate the HMAC.
         *
         * @param {@code w} - The allowable margin, time steps in seconds since T0, for the counter.  The function will check
         *                  'W' codes in the past and the future against the provided passcode.  Note,
         *                  it is the calling applications responsibility to keep track of
         *                  'C' and increment it for each password check, and also to adjust
         *                  it accordingly in the case where the client and server become
         *                  out of sync (second argument returns non zero).
         *                  E.g. if W = 5, and C = 100, this function will check the passcode
         *                  against all One Time Passcodes between 95 and 105. - default 6.
         *
         * @return an object {@code {delta: #}} if the token is valid else {@code null}
         */
        verify:
        {
            value: function(t, s, w)
            {
                // set defaults values
                var _token = t || '',
                    _secret = s || '',
                    _window = w;

                // validate inputs
                var tokenValidate = joi.validate(_token, schema.token, {language: {label: 'token'}});

                if (tokenValidate.error)
                {
                    throw tokenValidate.error;
                }

                _token = tokenValidate.value;

                var secretValidate = joi.validate(_secret, schema.secret, {language: {label: 'secret'}});

                if (secretValidate.error)
                {
                    throw secretValidate.error;
                }

                _secret = secretValidate.value;

                // ensure uniformity
                _secret = _secret.toUpperCase();

                if (!_.isUndefined(_window))
                {
                    var windowValidate = joi.validate(_window, schema.window, {language: {label: 'window'}});

                    if (windowValidate.error)
                    {
                        throw windowValidate.error;
                    }

                    _window = windowValidate.value;

                    return TOTP.verify(_token, {string:self.decode(_secret)}, {window:_window});
                }
                else
                {
                    return TOTP.verify(_token, {string:self.decode(_secret)});
                }
            },
            enumerable: true
        },
        /**
         * Function to return and test singleton instance
         */
        singleton:
        {
            value: function()
            {
                return GoogleAuthenticator.getInstance();
            },
            enumerable: false
        }
    });
};

/* ******************************
 SINGLETON CLASS DEFINITION
 ***************************** */
var instance = null;

// define object static private properties
Object.defineProperties(GoogleAuthenticator, {
    /**
     * Method to return singleton instance of {GoogleAuthenticator}
     */
    getInstance:
    {
        value: function ()
        {
            if (_.isNull(instance))
            {
                instance = new GoogleAuthenticator();
            }

            return instance;
        },
        enumerable: false
    }
});

/**
 * Expose {GoogleAuthenticator} singleton
 *
 * @type {GoogleAuthenticator}
 */
module.exports = GoogleAuthenticator.getInstance();
