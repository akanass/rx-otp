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

            it('- `gen` property', function()
            {
                unit.object(HOTP)
                    .hasOwnProperty('gen')
                    .isEnumerable('gen');
            });

            it('- `verify` property', function()
            {
                unit.object(HOTP)
                    .hasOwnProperty('verify')
                    .isEnumerable('verify');
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

        // check if gen property has been setted correctly
        describe('- `gen` property has been setted correctly', function()
        {
            it('- `gen` is a function', function()
            {
                unit.function(HOTP.gen);
            });

            it('- `gen` function must have `key` attribute setted to work', function()
            {
                unit.exception(function ()
                {
                    unit.when('call `gen` and `key` is not setted', function ()
                    {
                        HOTP.gen();
                    });
                })
                    .isInstanceOf(Error)
                    .hasMessage('key must be an object');
            });

            it('- `gen` function must have `key` attribute which is a validated object', function()
            {
                unit.exception(function ()
                {
                    unit.when('call `gen` and `key` is not a validated object', function ()
                    {
                        HOTP.gen({});
                    });
                })
                    .isInstanceOf(Error)
                    .hasMessage('key must contain at least one of string, hex');
            });

            it('- `gen` function must have `key` attribute with no empty `string` value', function()
            {
                unit.exception(function ()
                {
                    unit.when('call `gen` and `key` object has empty `string` value', function ()
                    {
                        HOTP.gen({string: ''});
                    });
                })
                    .isInstanceOf(Error)
                    .hasMessage('key is not allowed to be empty');
            });

            it('- `gen` function must have `key` attribute with no empty `hex` value', function()
            {
                unit.exception(function ()
                {
                    unit.when('call `gen` and `key` object has empty `hex` value', function ()
                    {
                        HOTP.gen({hex: ''});
                    });
                })
                    .isInstanceOf(Error)
                    .hasMessage('key is not allowed to be empty');
            });

            it('- `gen` function must have `key` attribute with conform `hex` value', function()
            {
                unit.exception(function ()
                {
                    unit.when('call `gen` and `key` object has `hex` value not conform', function ()
                    {
                        HOTP.gen({hex: 'A'});
                    });
                })
                    .isInstanceOf(Error)
                    .hasMessage('key fails to match the required pattern');
            });

            it('- `gen` function must have `key` attribute with one of `string` or `hex` value', function()
            {
                unit.exception(function()
                {
                    unit.when('call `gen` and `key` object has `string` and `hex` values', function()
                    {
                        HOTP.gen({string: '', hex:''});
                    });
                })
                    .isInstanceOf(Error)
                    .hasMessage('key contains a conflict between exclusive peers string, hex');
            });

            it('- `gen` function must have `opt` attribute with `counter` value which is an object', function()
            {
                unit.exception(function ()
                {
                    unit.when('call `gen` and `opt` object has `counter` value which is not an object', function ()
                    {
                        HOTP.gen({string: 'secret user'}, {counter: 0});
                    });
                })
                    .isInstanceOf(Error)
                    .hasMessage('opt must be an object');
            });

            it('- `gen` function must have `opt` attribute with `counter` value which is a validated object', function()
            {
                unit.exception(function ()
                {
                    unit.when('call `gen` and `opt` object has `counter` which is not a validated object', function ()
                    {
                        HOTP.gen({hex: '31'}, {counter: {}});
                    });
                })
                    .isInstanceOf(Error)
                    .hasMessage('opt must contain at least one of int, hex');
            });

            it('- `gen` function must have `opt` attribute with `counter` value which have a number `int` value', function()
            {
                unit.exception(function ()
                {
                    unit.when('call `gen` and `opt` object has `counter` object with not number `int` value', function ()
                    {
                        HOTP.gen({string: 'secret user'}, {counter: {int: ''}});
                    });
                })
                    .isInstanceOf(Error)
                    .hasMessage('opt must be a number');
            });

            it('- `gen` function must have `opt` attribute with `counter` value which have a positive number `int` value', function()
            {
                unit.exception(function ()
                {
                    unit.when('call `gen` and `opt` object has `counter` object with not conform `int` value', function ()
                    {
                        HOTP.gen({string: 'secret user'}, {counter: {int: -1}});
                    });
                })
                    .isInstanceOf(Error)
                    .hasMessage('opt must be larger than or equal to 0');
            });

            it('- `gen` function must have `opt` attribute with `counter` value which have a non empty `hex` value', function()
            {
                unit.exception(function ()
                {
                    unit.when('call `gen` and `opt` object has `counter` object with empty `hex` value', function ()
                    {
                        HOTP.gen({string: 'secret user'}, {counter: {hex: ''}});
                    });
                })
                    .isInstanceOf(Error)
                    .hasMessage('opt is not allowed to be empty');
            });

            it('- `gen` function must have `opt` attribute with `counter` value which have a conform `hex` value', function()
            {
                unit.exception(function ()
                {
                    unit.when('call `gen` and `opt` object has `counter` object with not conform `hex` value', function ()
                    {
                        HOTP.gen({string: 'secret user'}, {counter: {hex: '00000000000000000'}});
                    });
                })
                    .isInstanceOf(Error)
                    .hasMessage('opt fails to match the required pattern');
            });

            it('- `gen` function must have `opt` attribute with `counter` value which have one of `int` or `hex` value', function()
            {
                unit.exception(function()
                {
                    unit.when('call `gen` and `opt` object has `counter` object with `int` and `hex` values', function()
                    {
                        HOTP.gen({string: 'secret user'},{counter:{int:0, hex:''}});
                    });
                })
                    .isInstanceOf(Error)
                    .hasMessage('opt contains a conflict between exclusive peers int, hex');
            });

            it('- `gen` function must have `opt` attribute with number `codeDigits` value', function()
            {
                unit.exception(function ()
                {
                    unit.when('call `gen` and `opt` object has no number `codeDigits` value', function ()
                    {
                        HOTP.gen({string: 'secret user'}, {codeDigits:''});
                    });
                })
                    .isInstanceOf(Error)
                    .hasMessage('opt must be a number');
            });

            it('- `gen` function must have `opt` attribute with `codeDigits` value larger than or equal to 1', function()
            {
                unit.exception(function ()
                {
                    unit.when('call `gen` and `opt` object has `codeDigits` value less than 1', function ()
                    {
                        HOTP.gen({string: 'secret user'}, {codeDigits:0});
                    });
                })
                    .isInstanceOf(Error)
                    .hasMessage('opt must be larger than or equal to 1');
            });

            it('- `gen` function must have `opt` attribute with `codeDigits` value less than or equal to 10', function()
            {
                unit.exception(function ()
                {
                    unit.when('call `gen` and `opt` object has `codeDigits` value larger than 10', function ()
                    {
                        HOTP.gen({string: 'secret user'}, {codeDigits:11});
                    });
                })
                    .isInstanceOf(Error)
                    .hasMessage('opt must be less than or equal to 10');
            });

            it('- `gen` function must have `opt` attribute with boolean `addChecksum` value', function()
            {
                unit.exception(function ()
                {
                    unit.when('call `gen` and `opt` object has no boolean `addChecksum` value', function ()
                    {
                        HOTP.gen({string: 'secret user'}, {addChecksum:0});
                    });
                })
                    .isInstanceOf(Error)
                    .hasMessage('opt must be a boolean');
            });

            it('- `gen` function must have `opt` attribute with number `truncationOffset` value', function()
            {
                unit.exception(function ()
                {
                    unit.when('call `gen` and `opt` object has no number `truncationOffset` value', function ()
                    {
                        HOTP.gen({string: 'secret user'}, {truncationOffset:''});
                    });
                })
                    .isInstanceOf(Error)
                    .hasMessage('opt must be a number');
            });

            it('- `gen` function must have `opt` attribute with `truncationOffset` value larger than or equal to 0', function()
            {
                unit.exception(function ()
                {
                    unit.when('call `gen` and `opt` object has `truncationOffset` value less than 0', function ()
                    {
                        HOTP.gen({string: 'secret user'}, {truncationOffset:-1});
                    });
                })
                    .isInstanceOf(Error)
                    .hasMessage('opt must be larger than or equal to 0');
            });

            it('- `gen` function must have `opt` attribute with `truncationOffset` value less than or equal to 15', function()
            {
                unit.exception(function ()
                {
                    unit.when('call `gen` and `opt` object has `truncationOffset` value larger than 15', function ()
                    {
                        HOTP.gen({string: 'secret user'}, {truncationOffset:16});
                    });
                })
                    .isInstanceOf(Error)
                    .hasMessage('opt must be less than or equal to 15');
            });
        });

        // check if gen function works correctly
        describe('- `gen` works correctly', function()
        {
            it('- `gen` method convert `key` string in bytes array', function()
            {
                HOTP.gen({string: 'secret user'});
            });

            it('- `gen` method convert `key` hexadecimal in bytes array', function()
            {
                HOTP.gen({hex: '00'});
            });

            it('- `gen` method convert `counter` hexadecimal in bytes array', function()
            {
                HOTP.gen({string: 'secret user'}, {counter:{hex: '0'}});
            });

            it('- `gen` method take `truncationOffset` value from `opt` parameter', function()
            {
                HOTP.gen({string: 'secret user'}, {truncationOffset:0});
            });
        });

        describe('- call `generateOTP` method and check if works correctly', function()
        {
            it('- add checksum if option is setted', function()
            {
                HOTP.gen({string: 'secret user'}, {addChecksum:true});
            });
        });

        // check if verify property has been setted correctly
        describe('- `verify` property has been setted correctly', function()
        {
            it('- `verify` is a function', function()
            {
                unit.function(HOTP.verify);
            });

            it('- `verify` function must have `token` attribute setted to work', function()
            {
                unit.exception(function ()
                {
                    unit.when('call `verify` and `token` is not setted', function ()
                    {
                        HOTP.verify();
                    });
                })
                    .isInstanceOf(Error)
                    .hasMessage('token is not allowed to be empty');
            });

            it('- `verify` function must have `token` attribute which is a validated string', function()
            {
                unit.exception(function ()
                {
                    unit.when('call `verify` and `token` is not a validated string', function ()
                    {
                        HOTP.verify('A');
                    });
                })
                    .isInstanceOf(Error)
                    .hasMessage('token fails to match the required pattern');
            });

            it('- `verify` function must have `key` attribute setted to work', function()
            {
                unit.exception(function ()
                {
                    unit.when('call `verify` and `key` is not setted', function ()
                    {
                        HOTP.verify('111111');
                    });
                })
                    .isInstanceOf(Error)
                    .hasMessage('key must be an object');
            });

            it('- `verify` function must have `key` attribute which is a validated object', function()
            {
                unit.exception(function ()
                {
                    unit.when('call `verify` and `key` is not a validated object', function ()
                    {
                        HOTP.verify('111111', {});
                    });
                })
                    .isInstanceOf(Error)
                    .hasMessage('key must contain at least one of string, hex');
            });

            it('- `verify` function must have `key` attribute with no empty `hex` value', function()
            {
                unit.exception(function ()
                {
                    unit.when('call `verify` and `key` object has empty `hex` value', function ()
                    {
                        HOTP.verify('111111', {hex: ''});
                    });
                })
                    .isInstanceOf(Error)
                    .hasMessage('key is not allowed to be empty');
            });

            it('- `verify` function must have `key` attribute with conform `hex` value', function()
            {
                unit.exception(function ()
                {
                    unit.when('call `verify` and `key` object has `hex` value not conform', function ()
                    {
                        HOTP.verify('11111111111', {hex: 'A'});
                    });
                })
                    .isInstanceOf(Error)
                    .hasMessage('key fails to match the required pattern');
            });

            it('- `verify` function must have `key` attribute with one of `string` or `hex` value', function()
            {
                unit.exception(function()
                {
                    unit.when('call `verify` and `key` object has `string` and `hex` values', function()
                    {
                        HOTP.verify('111111', {string: '', hex:''});
                    });
                })
                    .isInstanceOf(Error)
                    .hasMessage('key contains a conflict between exclusive peers string, hex');
            });

            it('- `verify` function must have `opt` attribute with `counter` value which is an object', function()
            {
                unit.exception(function ()
                {
                    unit.when('call `verify` and `opt` object has `counter` value which is not an object', function ()
                    {
                        HOTP.verify('111111', {string: 'secret user'}, {counter: 0});
                    });
                })
                    .isInstanceOf(Error)
                    .hasMessage('opt must be an object');
            });

            it('- `verify` function must have `opt` attribute with `counter` value which is a validated object', function()
            {
                unit.exception(function ()
                {
                    unit.when('call `verify` and `opt` object has `counter` which is not a validated object', function ()
                    {
                        HOTP.verify('111111', {hex: '31'}, {counter: {}});
                    });
                })
                    .isInstanceOf(Error)
                    .hasMessage('opt must contain at least one of int, hex');
            });

            it('- `verify` function must have `opt` attribute with `counter` value which have a number `int` value', function()
            {
                unit.exception(function ()
                {
                    unit.when('call `verify` and `opt` object has `counter` object with not number `int` value', function ()
                    {
                        HOTP.verify('111111', {string: 'secret user'}, {counter: {int: ''}});
                    });
                })
                    .isInstanceOf(Error)
                    .hasMessage('opt must be a number');
            });

            it('- `verify` function must have `opt` attribute with `counter` value which have a positive number `int` value', function()
            {
                unit.exception(function ()
                {
                    unit.when('call `verify` and `opt` object has `counter` object with not conform `int` value', function ()
                    {
                        HOTP.verify('111111', {string: 'secret user'}, {counter: {int: -1}});
                    });
                })
                    .isInstanceOf(Error)
                    .hasMessage('opt must be larger than or equal to 0');
            });

            it('- `verify` function must have `opt` attribute with `counter` value which have a non empty `hex` value', function()
            {
                unit.exception(function ()
                {
                    unit.when('call `verify` and `opt` object has `counter` object with empty `hex` value', function ()
                    {
                        HOTP.verify('111111', {string: 'secret user'}, {counter: {hex: ''}});
                    });
                })
                    .isInstanceOf(Error)
                    .hasMessage('opt is not allowed to be empty');
            });

            it('- `verify` function must have `opt` attribute with `counter` value which have a conform `hex` value', function()
            {
                unit.exception(function ()
                {
                    unit.when('call `verify` and `opt` object has `counter` object with not conform `hex` value', function ()
                    {
                        HOTP.verify('111111', {string: 'secret user'}, {counter: {hex: '00000000000000000'}});
                    });
                })
                    .isInstanceOf(Error)
                    .hasMessage('opt fails to match the required pattern');
            });

            it('- `verify` function must have `opt` attribute with `counter` value which have one of `int` or `hex` value', function()
            {
                unit.exception(function()
                {
                    unit.when('call `verify` and `opt` object has `counter` object with `int` and `hex` values', function()
                    {
                        HOTP.verify('111111', {string: 'secret user'},{counter:{int:0, hex:''}});
                    });
                })
                    .isInstanceOf(Error)
                    .hasMessage('opt contains a conflict between exclusive peers int, hex');
            });

            it('- `verify` function must have `opt` attribute with number `window` value', function()
            {
                unit.exception(function ()
                {
                    unit.when('call `verify` and `opt` object has no number `window` value', function ()
                    {
                        HOTP.verify('111111', {string: 'secret user'}, {window:''});
                    });
                })
                    .isInstanceOf(Error)
                    .hasMessage('opt must be a number');
            });

            it('- `verify` function must have `opt` attribute with `window` value larger than or equal to 0', function()
            {
                unit.exception(function ()
                {
                    unit.when('call `verify` and `opt` object has `window` value less than 0', function ()
                    {
                        HOTP.verify('111111', {string: 'secret user'}, {window:-1});
                    });
                })
                    .isInstanceOf(Error)
                    .hasMessage('opt must be larger than or equal to 0');
            });

            it('- `verify` function must have `opt` attribute with boolean `addChecksum` value', function()
            {
                unit.exception(function ()
                {
                    unit.when('call `verify` and `opt` object has no boolean `addChecksum` value', function ()
                    {
                        HOTP.verify('111111', {string: 'secret user'}, {addChecksum:0});
                    });
                })
                    .isInstanceOf(Error)
                    .hasMessage('opt must be a boolean');
            });

            it('- `verify` function must have `opt` attribute with number `truncationOffset` value', function()
            {
                unit.exception(function ()
                {
                    unit.when('call `verify` and `opt` object has no number `truncationOffset` value', function ()
                    {
                        HOTP.verify('111111', {string: 'secret user'}, {truncationOffset:''});
                    });
                })
                    .isInstanceOf(Error)
                    .hasMessage('opt must be a number');
            });

            it('- `verify` function must have `opt` attribute with `truncationOffset` value larger than or equal to 0', function()
            {
                unit.exception(function ()
                {
                    unit.when('call `verify` and `opt` object has `truncationOffset` value less than 0', function ()
                    {
                        HOTP.verify('111111', {string: 'secret user'}, {truncationOffset:-1});
                    });
                })
                    .isInstanceOf(Error)
                    .hasMessage('opt must be larger than or equal to 0');
            });

            it('- `verify` function must have `opt` attribute with `truncationOffset` value less than or equal to 15', function()
            {
                unit.exception(function ()
                {
                    unit.when('call `verify` and `opt` object has `truncationOffset` value larger than 15', function ()
                    {
                        HOTP.verify('111111', {string: 'secret user'}, {truncationOffset:16});
                    });
                })
                    .isInstanceOf(Error)
                    .hasMessage('opt must be less than or equal to 15');
            });
        });

        // check if verify function works correctly
        describe('- `verify` works correctly', function()
        {
            it('- `verify` method take `counter` integer value from `opt` parameter', function()
            {
                HOTP.verify('111111', {string: 'secret user'}, {counter:{int: 0}});
            });

            it('- `verify` method take `counter` hexadecimal value from `opt` parameter', function()
            {
                HOTP.verify('111111', {string: 'secret user'}, {counter:{hex: '7DE1ED09E1AE8F1E'}});
            });

            it('- `verify` method take `truncationOffset` value from `opt` parameter and set it in object to call `gen` method', function()
            {
                HOTP.verify('111111', {string: 'secret user'}, {truncationOffset:0});
            });

            it('- call `verify` method with hexadecimal parameters', function()
            {
                HOTP.verify('755224', {hex: '3132333435363738393031323334353637383930'}, {counter:{hex: '0'}});
            });

            it('- call `verify` method with string/integer parameters', function()
            {
                HOTP.verify('755224', {string: '12345678901234567890'}, {counter:{int: 0}});
            });
        });
    });
});