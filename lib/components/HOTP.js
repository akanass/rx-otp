/* See LICENSE file for terms of use */
'use strict';

// import libraries
var _ = require('underscore');

/**
 * {HOTP} constructor
 *
 * @constructor
 */
var HOTP = function HOTP()
{
    Object.defineProperties(this, {
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