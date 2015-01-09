/* See LICENSE file for terms of use */
'use strict';

var unit = require('unit.js'),
    OTPManagerModule;

describe('- ModuleTest file', function()
{
    // init before each tests
    beforeEach(function()
    {
        // inject module
        OTPManagerModule = require('../..');
    });

    // delete after each tests
    afterEach(function()
    {
        // delete module
        OTPManagerModule = null;
    });

    // test node-signpass module
    describe('- test otp-manager module', function()
    {
        // check if module is loaded
        it('- it is loaded', function()
        {
            unit.object(OTPManagerModule);
        });
    });
});