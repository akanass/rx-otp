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
        '=>  {counter:{int:0}, codeDigits:6, addChecksum:false}', function()
        {
            unit.assert.equal(HOTP.gen({string: '12345678901234567890'}), '755224');
        });

        it('- call `gen` with parameters: `key` => {hex:\'3132333435363738393031323334353637383930\'} and default options ' +
        '=>  {counter:{int:0}, codeDigits:6, addChecksum:false}', function()
        {
            unit.assert.equal(HOTP.gen({hex: '3132333435363738393031323334353637383930'}), '755224');
        });

        it('- call `gen` with parameters: `key` => {string:\'12345678901234567890\'} and options ' +
        '=>  {counter:{int:5}, codeDigits:6, addChecksum:false}', function()
        {
            unit.assert.equal(HOTP.gen({string: '12345678901234567890'}, {counter:{int:5}}), '254676');
        });

        it('- call `gen` with parameters: `key` => {string:\'12345678901234567890\'} and options ' +
        '=>  {counter:{hex:\'9\'}, codeDigits:6, addChecksum:false}', function()
        {
            unit.assert.equal(HOTP.gen({string: '12345678901234567890'}, {counter:{hex:'9'}}), '520489');
        });

        it('- call `gen` with parameters: `key` => {string:\'12345678901234567890\'} and options ' +
        '=>  {counter:{hex:\'2\'}, codeDigits:6, addChecksum:false}', function()
        {
            unit.assert.equal(HOTP.gen({hex: '3132333435363738393031323334353637383930'}, {counter:{hex:'2'}}), '359152');
        });

        it('- call `gen` with parameters: `key` => {string:\'12345678901234567890\'} and options ' +
        '=>  {counter:{int:7}, codeDigits:10, addChecksum:false}', function()
        {
            unit.assert.equal(HOTP.gen({string: '12345678901234567890'}, {counter:{int:7}, codeDigits:10}), '0082162583');
        });
    });
});