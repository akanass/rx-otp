/* See LICENSE file for terms of use */
'use strict';

// import libraries
var _ = require('underscore'),
    joi = require('joi'),
    schema = require('./schemas/totp'),
    HOTP = require('./HOTP');

/**
 * {TOTP} constructor
 *
 * @constructor
 */
var TOTP = function TOTP()
{
    Object.defineProperties(this, {
        /**
         * Function to generate OTP
         *
         * @param {@code k} Key for the one time password. This should be unique and secret for
         *          every user as this is the seed that is used to calculate the HMAC.
         *          {string: 'secret user'} or {hex:'7365637265742075736572'}
         *
         * @param {@code o} Object options could contain:
         *
         *        - {@code time} - The time step of the counter.  This must be the same for
         *          every request and is used to calculate C. - default 30.
         *
         *        - {@code timestamp} - OTP validity timestamp - default current datetime.
         *
         *        - {@code codeDigits} - the number of digits in the OTP - default 6.
         *
         *        - {@code addChecksum} - a flag that indicates if a checksum digit should be appended to the OTP - default false.
         *
         *        - {@code truncationOffset} - the offset into the MAC result to begin truncation.  If this value is out of
         *          the range of 0 ... 15, then dynamic truncation  will be used. Dynamic truncation is when the last 4
         *          bits of the last byte of the MAC are used to determine the start offset.
         *
         *        - {@code algorithm} - the algorithm to create HMAC - default 'sha1'
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

                // get key
                var key;
                if (!_.isNull(_key.string) && !_.isUndefined(_key.string))
                {
                    key = {
                        string: _key.string
                    };
                }
                else
                {
                    key = {
                        hex: _key.hex.toUpperCase()
                    };
                }

                // Determine the value of the counter, C
                // This is the number of time steps in seconds since T0
                var _t = _opt.timestamp,
                    _time = _opt.time,
                    _timeCounter = Math.floor((_t / 1000) / _time);

                // generate options
                var opt = {
                    counter:{
                        int: _timeCounter
                    },
                    codeDigits: _opt.codeDigits,
                    addChecksum: _opt.addChecksum,
                    algorithm: _opt.algorithm
                };

                if (!_.isNull(_opt.truncationOffset) && !_.isUndefined(_opt.truncationOffset))
                {
                    opt.truncationOffset = _opt.truncationOffset;
                }

                // call HOTP generation to get OTP
                return HOTP.gen(key, opt);
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
                return TOTP.getInstance();
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
Object.defineProperties(TOTP, {
    /**
     * Method to return singleton instance of {TOTP}
     */
    getInstance:
    {
        value: function ()
        {
            if (_.isNull(instance))
            {
                instance = new TOTP();
            }

            return instance;
        },
        enumerable: false
    }
});

/**
 * Expose {TOTP} singleton
 *
 * @type {TOTP}
 */
module.exports = TOTP.getInstance();