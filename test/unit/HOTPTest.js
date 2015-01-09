/* See LICENSE file for terms of use */
'use strict';

var unit = require('unit.js'),
    HOTP;

describe('- HOTPTest file', function()
{
    // init before each tests
    beforeEach(function()
    {
        // require HOTP
        HOTP = require('../../lib/components/HOTP');
    });

    // delete after each tests
    afterEach(function()
    {
        // delete HOTP
        HOTP = null;
    });

    // test HOTP instance
    describe('- test HOTP singleton object', function()
    {
        // check if singleton is loaded
        it('- it is loaded', function()
        {
            unit.object(HOTP);
        });

        // check if object has the following properties
        describe('- it has the following properties', function()
        {
            it('- `singleton` property', function()
            {
                unit.object(HOTP)
                    .hasOwnProperty('singleton')
                    .isNotEnumerable('singleton');
            });
        });

        // check if singleton property has been setted correctly
        describe('- `singleton` property has been setted correctly', function()
        {
            it('- `singleton` is a function', function()
            {
                unit.function(HOTP.singleton);
            });

            it('- `singleton` function must return same instance of `HOTP`', function()
            {
                var HOTP2 =  HOTP.singleton();

                unit.object(HOTP2).isIdenticalTo(HOTP);
            });
        });
    });
});