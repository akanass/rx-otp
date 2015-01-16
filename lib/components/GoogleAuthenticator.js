/* See LICENSE file for terms of use */
'use strict';

// import libraries
var _ = require('underscore'),
    base32 = require('thirty-two'),
    joi = require('joi'),
    schema = require('./schemas/googleAuthenticator'),
    qr = require('qr-image'),
    uid = require('uid-safe')/*,
    TOTP = require('./TOTP')*/;

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
         * @return secret string
         */
        decode:
        {
            value: function (base32Secret)
            {
                return base32.decode(base32Secret);
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
         * @param {@code s} the secret in base32
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
                    console.error(secretValidate.error);
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
         * @param {@code s} the secret in base32
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