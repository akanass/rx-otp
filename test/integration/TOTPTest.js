/* See LICENSE file for terms of use */
'use strict';

var unit = require('unit.js'),
    TOTP;

describe('- TOTPTest integration file', function()
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

    describe('- TOTP Algorithm: Test Values (http://tools.ietf.org/html/rfc6238#page-15)', function()
    {
        it('- call `gen` with parameters: `key` => {string:\'12345678901234567890\'} and options ' +
        '=>  {time:30, timestamp:59000, codeDigits:8, addChecksum:false, algorithm:\'sha1\'}', function()
        {
            unit.assert.equal(TOTP.gen({string: '12345678901234567890'}, {timestamp:59000, codeDigits:8}), '94287082');
        });

        it('- call `gen` with parameters: `key` => {hex:\'3132333435363738393031323334353637383930313233343536373839303132\'} and options ' +
        '=>  {time:30, timestamp:1111111111000, codeDigits:8, addChecksum:false, algorithm:\'sha256\'}', function()
        {
            unit.assert.equal(TOTP.gen({hex: '3132333435363738393031323334353637383930313233343536373839303132'},
                    {timestamp:1111111111000, codeDigits:8, algorithm:'sha256'}), '67062674');
        });

        it('- call `gen` with parameters: `key` => {hex:\'31323334353637383930313233343536373839303132333435363' +
        '738393031323334353637383930313233343536373839303132333435363738393031323334\'}' +
        'and options ' +
        '=>  {time:30, timestamp:20000000000000, codeDigits:8, addChecksum:false, algorithm:\'sha512\'}', function()
        {
            unit.assert.equal(TOTP.gen({hex: '31323334353637383930313233343536373839303132333435363' +
            '738393031323334353637383930313233343536373839303132333435363738393031323334'},
                {timestamp:20000000000000, codeDigits:8, algorithm:'sha512'}), '47863826');
        });
    });
});