/* See LICENSE file for terms of use */
'use strict';

var unit = require('unit.js'),
    GoogleAuthenticator;

describe('- GoogleAuthenticatorTest file', function()
{
    // init before each tests
    beforeEach(function()
    {
        // require GoogleAuthenticator
        GoogleAuthenticator = require('../../lib/components/GoogleAuthenticator');
    });

    // delete after each tests
    afterEach(function()
    {
        // delete GoogleAuthenticator
        GoogleAuthenticator = null;
    });

    // test GoogleAuthenticator instance
    describe('- test GoogleAuthenticator singleton object', function()
    {
        // check if singleton is loaded
        it('- it is loaded', function()
        {
            unit.object(GoogleAuthenticator);
        });

        // check if object has the following properties
        describe('- it has the following properties', function()
        {
            it('- `singleton` property', function()
            {
                unit.object(GoogleAuthenticator)
                    .hasOwnProperty('singleton')
                    .isNotEnumerable('singleton');
            });
        });

        // check if singleton property has been setted correctly
        describe('- `singleton` property has been setted correctly', function()
        {
            it('- `singleton` is a function', function()
            {
                unit.function(GoogleAuthenticator.singleton);
            });

            it('- `singleton` function must return same instance of `GoogleAuthenticator`', function()
            {
                var GoogleAuthenticator2 =  GoogleAuthenticator.singleton();

                unit.object(GoogleAuthenticator2).isIdenticalTo(GoogleAuthenticator);
            });
        });
    });
});