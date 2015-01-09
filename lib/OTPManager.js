/* See LICENSE file for terms of use */
'use strict';

// import libraries
var _ = require('underscore');

/**
 * {OTPManager} constructor
 *
 * @constructor
 */
var OTPManager = function OTPManager()
{
    Object.defineProperties(this, {
        /**
         * {HOTP} instance
         */
        hotp:
        {
            value: require('./components/HOTP'),
            enumerable: true
        },
        /**
         * {TOTP} instance
         */
        totp:
        {
            value: require('./components/TOTP'),
            enumerable: true
        },
        /**
         * {GoogleAuthenticator} instance
         */
        googleAuthenticator:
        {
            value: require('./components/GoogleAuthenticator'),
            enumerable: true
        },
        /**
         * Function to return and test singleton instance
         */
        singleton:
        {
            value: function()
            {
                return OTPManager.getInstance();
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
Object.defineProperties(OTPManager, {
    /**
     * Method to return singleton instance of {OTPManager}
     */
    getInstance:
    {
        value: function ()
        {
            if (_.isNull(instance))
            {
                instance = new OTPManager();
            }

            return instance;
        },
        enumerable: false
    }
});

/**
 * Expose {OTPManager} singleton
 *
 * @type {OTPManager}
 */
module.exports = OTPManager.getInstance();