/* See LICENSE file for terms of use */
'use strict';

var unit = require('unit.js'),
    TOTP;

describe('- TOTPTest file', function()
{
    // init before each tests
    beforeEach(function()
    {
        // require TOTP
        TOTP = require('../../lib/components/TOTP');
    });

    // delete after each tests
    afterEach(function()
    {
        // delete TOTP
        TOTP = null;
    });

    // test TOTP instance
    describe('- test TOTP singleton object', function()
    {
        // check if singleton is loaded
        it('- it is loaded', function()
        {
            unit.object(TOTP);
        });

        // check if object has the following properties
        describe('- it has the following properties', function()
        {
            it('- `singleton` property', function()
            {
                unit.object(TOTP)
                    .hasOwnProperty('singleton')
                    .isNotEnumerable('singleton');
            });
        });

        // check if singleton property has been setted correctly
        describe('- `singleton` property has been setted correctly', function()
        {
            it('- `singleton` is a function', function()
            {
                unit.function(TOTP.singleton);
            });

            it('- `singleton` function must return same instance of `TOTP`', function()
            {
                var TOTP2 =  TOTP.singleton();

                unit.object(TOTP2).isIdenticalTo(TOTP);
            });
        });
    });
});