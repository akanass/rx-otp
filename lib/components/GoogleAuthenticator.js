/* See LICENSE file for terms of use */
'use strict';

// import libraries
var _ = require('underscore');

/**
 * {GoogleAuthenticator} constructor
 *
 * @constructor
 */
var GoogleAuthenticator = function GoogleAuthenticator()
{
    Object.defineProperties(this, {
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