/* See LICENSE file for terms of use */
'use strict';

// import libraries
var _ = require('underscore');

/**
 * {TOTP} constructor
 *
 * @constructor
 */
var TOTP = function TOTP()
{
    Object.defineProperties(this, {
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