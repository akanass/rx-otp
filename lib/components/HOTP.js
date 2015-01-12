/*jslint bitwise: true */
/* See LICENSE file for terms of use */
'use strict';

// import libraries
var _ = require('underscore'),
    joi = require('joi'),
    schema = require('./schemas/hotp'),
    conv = require('binstring'),
    ConvertBase = require('convert-base'),
    Converter = new ConvertBase(),
    pad = require('pad-component'),
    crypto = require('crypto');

var DIGITS_POWER
    // 0 1  2   3    4     5      6       7        8          9
    = [1,10,100,1000,10000,100000,1000000,10000000,100000000, 1000000000];

// These are used to calculate the check-sum digits.
var doubleDigits = [0, 2, 4, 6, 8, 1, 3, 5, 7, 9];

/**
 * {HOTP} constructor
 *
 * @constructor
 */
var HOTP = function HOTP()
{
    Object.defineProperties(this, {
        /**
         * Function to generate OTP
         *
         * @param {@code k} Key for the one time password. This should be unique and secret for
         *          every user as this is the seed that is used to calculate the HMAC.
         *          {string: 'secret user'} or {hex:'0000000000000000000000000000000000000000'}
         *
         * @param {@code o} Object options could contain:
         *
         *        - {@code counter} - counter object value.  This should be stored by the application, must
         *          be user specific, and be incremented for each request.
         *          {int: 0} or {hex:'0000000000000000'}
         *        - {@code codeDigits} - the number of digits in the OTP, not including the checksum, if any.
         *        - {@code addChecksum} - a flag that indicates if a checksum digit should be appended to the OTP.
         *        - {@code truncationOffset} - the offset into the MAC result to begin truncation.  If this value is out of
         *          the range of 0 ... 15, then dynamic truncation  will be used. Dynamic truncation is when the last 4
         *          bits of the last byte of the MAC are used to determine the start offset.
         */
        gen:
        {
            value: function(k, o)
            {
                // set defaults values
                var _key = k || '',
                    _opt = o || {};

                // validate inputs
                var keyValidate = joi.validate(_key, schema.key, {language: {label: 'key'}});

                if (keyValidate.error)
                {
                    throw keyValidate.error;
                }

                _key = keyValidate.value;

                var optValidate = joi.validate(_opt, schema.opt, {language: {label: 'opt'}});

                if (optValidate.error)
                {
                    throw optValidate.error;
                }

                _opt = optValidate.value;

                // get key and change it in bytes array
                var key;
                if (_key.string)
                {
                    key = conv(_key.string, {in: 'binary', out:'bytes'});
                }
                else
                {
                    key = conv(_key.hex, {in: 'hex', out:'bytes'});
                }

                // get counter and change it in bytes array
                var counter;
                if (!_.isNull(_opt.counter.int) && !_.isUndefined(_opt.counter.int))
                {
                    counter = conv(pad.left(Converter.convert(_opt.counter.int, 10, 16), 16, '0'), {in: 'hex', out:'bytes'});
                }
                else
                {
                    counter = conv(_opt.counter.hex, {in: 'hex', out:'bytes'});
                }

                // get other options
                var codeDigits = _opt.codeDigits;
                var addChecksum = _opt.addChecksum;
                var truncationOffset;
                if (!_.isNull(_opt.truncationOffset) && !_.isUndefined(_opt.truncationOffset))
                {
                    truncationOffset = _opt.truncationOffset;
                }
                else
                {
                    truncationOffset = -1;
                }

                // return OTP
                return generateOTP(key, counter, codeDigits, addChecksum, truncationOffset);
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
                return HOTP.getInstance();
            },
            enumerable: false
        }
    });

    /**
     * Function to generate OTP
     *
     * @param {@code key} Key for the one time password.
     * @param {@code counter} the counter, time, or other value that
     *                      changes on a per use basis.
     * @param {@code codeDigits} the number of digits in the OTP, not
     *                      including the checksum, if any.
     * @param {@code addChecksum} a flag that indicates if a checksum digit
     *                      should be appended to the OTP.
     * @param {@code truncationOffset} the offset into the MAC result to
     *                     begin truncation.
     *
     * @return A numeric String in base 10 that includes
     *      {@link codeDigits} digits plus the optional checksum
     *      digit if requested.
     */
    var generateOTP = function(key, counter, codeDigits, addChecksum, truncationOffset)
    {
        // set digits
        var digits;
        if (addChecksum)
        {
            digits = codeDigits;
        }
        else
        {
            digits = codeDigits - 1;
        }

        // create HMAC
        var b = new Buffer(counter);
        var hmac = crypto.createHmac('sha1', new Buffer(key));

        // compute hmac hash
        var hash = conv(hmac.update(b).digest('hex'), {in: 'hex', out:'bytes'});

        // put selected bytes into result int
        var offset = hash[hash.length - 1] & 0xf;

        if ((0 <= truncationOffset) && (truncationOffset < (hash.length - 4)))
        {
            offset = truncationOffset;
        }

        var binary = ((hash[offset] & 0x7f) << 24) |
                     ((hash[offset + 1] & 0xff) << 16) |
                     ((hash[offset + 2] & 0xff) << 8) |
                     (hash[offset + 3] & 0xff);

        var otp = binary % DIGITS_POWER[codeDigits];

        // add checksum
        if (addChecksum)
        {
            otp =  (otp * 10) + calcChecksum(otp, codeDigits);
        }

        // get result string
        var result = otp.toString();
        result = pad.left(result, digits, '0');

        return result;
    };

    /**
     * Calculates the checksum using the credit card algorithm.
     * This algorithm has the advantage that it detects any single
     * mistyped digit and any single transposition of
     * adjacent digits.
     *
     * @param num the number to calculate the checksum for
     * @param digits number of significant places in the number
     *
     * @return the checksum of num
     */
    var calcChecksum = function(num, digits)
    {
        // initialize variables
        var doubleDigit = true;
        var total = 0;

        while (0 < digits--)
        {
            var digit = parseInt(num % 10);
            num /= 10;
            if (doubleDigit) {
                digit = doubleDigits[digit];
            }
            total += digit;
            doubleDigit = !doubleDigit;
        }
        var result = total % 10;
        if (result > 0)
        {
            result = 10 - result;
        }
        return result;
    };
};

/* ******************************
 SINGLETON CLASS DEFINITION
 ***************************** */
var instance = null;

// define object static private properties
Object.defineProperties(HOTP, {
    /**
     * Method to return singleton instance of {HOTP}
     */
    getInstance:
    {
        value: function ()
        {
            if (_.isNull(instance))
            {
                instance = new HOTP();
            }

            return instance;
        },
        enumerable: false
    }
});

/**
 * Expose {HOTP} singleton
 *
 * @type {HOTP}
 */
module.exports = HOTP.getInstance();