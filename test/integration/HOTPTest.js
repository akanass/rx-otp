/* See LICENSE file for terms of use */
'use strict';

var unit = require('unit.js'),
    HOTP;

describe('- HOTPTest integration file', function()
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

    describe('- HOTP Algorithm: Test Values (http://tools.ietf.org/html/rfc4226#page-32)', function()
    {
        it('- call `gen` with parameters: `key` => {string:\'12345678901234567890\'} and default options ' +
        '=>  {counter:{int:0}, codeDigits:6, addChecksum:false, algorithm:\'sha1\'}', function()
        {
            unit.assert.equal(HOTP.gen({string: '12345678901234567890'}), '755224');
        });

        it('- call `gen` with parameters: `key` => {hex:\'3132333435363738393031323334353637383930\'} and default options ' +
        '=>  {counter:{int:0}, codeDigits:6, addChecksum:false, algorithm:\'sha1\'}', function()
        {
            unit.assert.equal(HOTP.gen({hex: '3132333435363738393031323334353637383930'}), '755224');
        });

        it('- call `gen` with parameters: `key` => {string:\'12345678901234567890\'} and options ' +
        '=>  {counter:{int:5}, codeDigits:6, addChecksum:false, algorithm:\'sha1\'}', function()
        {
            unit.assert.equal(HOTP.gen({string: '12345678901234567890'}, {counter:{int:5}}), '254676');
        });

        it('- call `gen` with parameters: `key` => {string:\'12345678901234567890\'} and options ' +
        '=>  {counter:{hex:\'9\'}, codeDigits:6, addChecksum:false, algorithm:\'sha1\'}', function()
        {
            unit.assert.equal(HOTP.gen({string: '12345678901234567890'}, {counter:{hex:'9'}}), '520489');
        });

        it('- call `gen` with parameters: `key` => {string:\'12345678901234567890\'} and options ' +
        '=>  {counter:{hex:\'2\'}, codeDigits:6, addChecksum:false, algorithm:\'sha1\'}', function()
        {
            unit.assert.equal(HOTP.gen({hex: '3132333435363738393031323334353637383930'}, {counter:{hex:'2'}}), '359152');
        });

        it('- call `gen` with parameters: `key` => {string:\'12345678901234567890\'} and options ' +
        '=>  {counter:{int:7}, codeDigits:10, addChecksum:false, algorithm:\'sha1\'}', function()
        {
            unit.assert.equal(HOTP.gen({string: '12345678901234567890'}, {counter:{int:7}, codeDigits:10}), '0082162583');
        });

        it('- call `verify` method with parameters: `token` => \'755224\', ' +
        '`key` => {hex:\'3132333435363738393031323334353637383930\'} and options ' +
        '=>  {window:50, counter:{hex:\'0\'}, addChecksum:false, algorithm:\'sha1\', previousOTPAllowed:false}', function()
        {
            unit.assert.deepEqual(HOTP.verify('755224', {hex: '3132333435363738393031323334353637383930'},
                {counter:{hex: '0'}}), {delta:{hex:'0000000000000000'}});
        });

        it('- call `verify` method with parameters: `token` => \'755224\', ' +
        '`key` => {string:\'12345678901234567890\'} and default options ' +
        '=>  {window:50, counter:{int:0}, addChecksum:false, algorithm:\'sha1\', previousOTPAllowed:false}', function()
        {
            unit.assert.deepEqual(HOTP.verify('755224', {string: '12345678901234567890'}), {delta:{int:0}});
        });

        it('- call `verify` method with parameters: `token` => \'520489\', ' +
        '`key` => {string:\'12345678901234567890\'} and default options ' +
        '=>  {window:50, counter:{int:0}, addChecksum:false, algorithm:\'sha1\', previousOTPAllowed:false}', function()
        {
            unit.assert.deepEqual(HOTP.verify('520489', {string: '12345678901234567890'}), {delta:{int:9}});
        });

        it('- call `verify` method with parameters: `token` => \'338314\', ' +
        '`key` => {hex:\'3132333435363738393031323334353637383930\'} and options ' +
        '=>  {window:50, counter:{hex:\'0\'}, addChecksum:false, algorithm:\'sha1\', previousOTPAllowed:false}', function()
        {
            unit.assert.deepEqual(HOTP.verify('338314', {hex: '3132333435363738393031323334353637383930'},
                {counter:{hex: '0'}}), {delta:{hex:'0000000000000004'}});
        });

        it('- call `verify` method with parameters: `token` => \'755224\', ' +
        '`key` => {string:\'12345678901234567890\'} and options ' +
        '=>  {window:50, counter:{int:4}, addChecksum:false, algorithm:\'sha1\', previousOTPAllowed:false}', function()
        {
            unit.assert.equal(HOTP.verify('755224', {string: '12345678901234567890'}, {counter:{int: 4}}), null);
        });

        it('- call `verify` method with parameters: `token` => \'755224\', ' +
        '`key` => {string:\'12345678901234567890\'} and options ' +
        '=>  {window:50, counter:{int:9}, addChecksum:false, algorithm:\'sha1\', previousOTPAllowed:true}', function()
        {
            unit.assert.deepEqual(HOTP.verify('755224', {string: '12345678901234567890'}, {counter:{int: 9}, previousOTPAllowed:true}), {delta:{int:-9}});
        });
    });
});