/* See LICENSE file for terms of use */
'use strict';

var unit = require('unit.js'),
    OTPManager;

describe('- OTPManagerTest file', function()
{
    // init before each tests
    beforeEach(function()
    {
        // require OTPManager
        OTPManager = require('../../lib/OTPManager');
    });

    // delete after each tests
    afterEach(function()
    {
        // delete OTPManager
        OTPManager = null;
    });

    // test OTPManager instance
    describe('- test OTPManager singleton object', function()
    {
        // check if singleton is loaded
        it('- it is loaded', function()
        {
            unit.object(OTPManager);
        });

        // check if object has the following properties
        describe('- it has the following properties', function()
        {
            it('- `singleton` property', function()
            {
                unit.object(OTPManager)
                    .hasOwnProperty('singleton')
                    .isNotEnumerable('singleton');
            });

            it('- `hotp` property', function()
            {
                unit.object(OTPManager)
                    .hasOwnProperty('hotp')
                    .isEnumerable('hotp');
            });

            it('- `totp` property', function()
            {
                unit.object(OTPManager)
                    .hasOwnProperty('totp')
                    .isEnumerable('totp');
            });

            it('- `googleAuthenticator` property', function()
            {
                unit.object(OTPManager)
                    .hasOwnProperty('googleAuthenticator')
                    .isEnumerable('googleAuthenticator');
            });
        });

        // check if singleton property has been setted correctly
        describe('- `singleton` property has been setted correctly', function()
        {
            it('- `singleton` is a function', function()
            {
                unit.function(OTPManager.singleton);
            });

            it('- `singleton` function must return same instance of `OTPManager`', function()
            {
                var OTPManager2 =  OTPManager.singleton();

                unit.object(OTPManager2).isIdenticalTo(OTPManager);
            });
        });

        // check if hotp property has been setted correctly
        describe('- `hotp` property has been setted correctly', function()
        {
            it('- `hotp` is an object', function()
            {
                unit.object(OTPManager.hotp);
            });
        });

        // check if totp property has been setted correctly
        describe('- `totp` property has been setted correctly', function()
        {
            it('- `totp` is an object', function()
            {
                unit.object(OTPManager.totp);
            });
        });

        // check if googleAuthenticator property has been setted correctly
        describe('- `googleAuthenticator` property has been setted correctly', function()
        {
            it('- `googleAuthenticator` is an object', function()
            {
                unit.object(OTPManager.googleAuthenticator);
            });
        });
    });
});