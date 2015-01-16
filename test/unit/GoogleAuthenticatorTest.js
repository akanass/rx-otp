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

            it('- `secret` property', function()
            {
                unit.object(GoogleAuthenticator)
                    .hasOwnProperty('secret')
                    .isEnumerable('secret');
            });

            it('- `keyUri` property', function()
            {
                unit.object(GoogleAuthenticator)
                    .hasOwnProperty('keyUri')
                    .isEnumerable('keyUri');
            });

            it('- `qrCode` property', function()
            {
                unit.object(GoogleAuthenticator)
                    .hasOwnProperty('qrCode')
                    .isEnumerable('qrCode');
            });

            it('- `encode` property', function()
            {
                unit.object(GoogleAuthenticator)
                    .hasOwnProperty('encode')
                    .isEnumerable('encode');
            });

            it('- `decode` property', function()
            {
                unit.object(GoogleAuthenticator)
                    .hasOwnProperty('decode')
                    .isEnumerable('decode');
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

        // check if secret property has been setted correctly
        describe('- `secret` property has been setted correctly', function()
        {
            it('- `secret` is a function', function()
            {
                unit.function(GoogleAuthenticator.secret);
            });

            it('- call `secret` to check if the result is a 16-digit base32 string', function()
            {
                unit.must(GoogleAuthenticator.secret()).match(/^[A-Z2-7]{16}$/);
            });
        });

        // check if keyUri property has been setted correctly
        describe('- `keyUri` property has been setted correctly', function()
        {
            it('- `keyUri` is a function', function()
            {
                unit.function(GoogleAuthenticator.keyUri);
            });

            it('- `keyUri` function must have `user` attribute setted to work', function()
            {
                unit.exception(function ()
                {
                    unit.when('call `keyUri` and `user` is not setted', function ()
                    {
                        GoogleAuthenticator.keyUri();
                    });
                })
                    .isInstanceOf(Error)
                    .hasMessage('user is not allowed to be empty');
            });

            it('- `keyUri` function must have `issuer` attribute setted to work', function()
            {
                unit.exception(function ()
                {
                    unit.when('call `keyUri` and `issuer` is not setted', function ()
                    {
                        GoogleAuthenticator.keyUri('test');
                    });
                })
                    .isInstanceOf(Error)
                    .hasMessage('issuer is not allowed to be empty');
            });

            it('- `keyUri` function must have `secret` attribute setted to work', function()
            {
                unit.exception(function ()
                {
                    unit.when('call `keyUri` and `secret` is not setted', function ()
                    {
                        GoogleAuthenticator.keyUri('test', 'test');
                    });
                })
                    .isInstanceOf(Error)
                    .hasMessage('secret is not allowed to be empty');
            });

            it('- call `keyUri` to check if the result is a encoded uri string', function()
            {
                unit.assert.equal(GoogleAuthenticator.keyUri('test@localhost', 'test', 'IFDFIUJNK5JUEQKH'),
                    encodeURIComponent('otpauth://totp/Test:test@localhost?secret=IFDFIUJNK5JUEQKH&issuer=Test'));
            });
        });

        // check if qrCode property has been setted correctly
        describe('- `qrCode` property has been setted correctly', function()
        {
            it('- `qrCode` is a function', function()
            {
                unit.function(GoogleAuthenticator.qrCode);
            });

            it('- call `qrCode` to check if the result is a svg image', function()
            {
                unit.must(GoogleAuthenticator.qrCode('nicolas.jessel@gmail.com', 'test', 'OVZWK4RAONSWG4TFOQQGIZJAMZXWY2LF'))
                    .contain('<svg xmlns="http://www.w3.org/2000/svg" width="215" height="215" viewBox="0 0 43 43">');
            });
        });

        // check if encode property has been setted correctly
        describe('- `encode` property has been setted correctly', function()
        {
            it('- `encode` is a function', function()
            {
                unit.function(GoogleAuthenticator.encode);
            });

            it('- call `encode` to check if the result is a base 32 string', function()
            {
                unit.assert.equal(GoogleAuthenticator.encode('mon secret'), 'NVXW4IDTMVRXEZLU');
            });
        });

        // check if decode property has been setted correctly
        describe('- `decode` property has been setted correctly', function()
        {
            it('- `decode` is a function', function()
            {
                unit.function(GoogleAuthenticator.decode);
            });

            it('- call `decode` to check if the result is a string', function()
            {
                unit.assert.equal(GoogleAuthenticator.decode('NVXW4IDTMVRXEZLU'), 'mon secret');
            });
        });
    });

    /*describe('- Google Authenticator Algorithm: Test Values', function()
     {



     });*/
});