import { suite, test } from 'mocha-typescript';
import * as unit from 'unit.js';

import { HOTP } from '../../src';

@suite('- HOTP Algorithm: Test Values (http://tools.ietf.org/html/rfc4226#page-32)')
export class HOTPTest {
    /**
     * Test if HOTP.generate() returns good value with good parameters
     */
    @test('- `HOTP.generate()` - `key` => {string:\'12345678901234567890\'} and default options => ' +
        '{counter:{int:0}, codeDigits:6, addChecksum:false, algorithm:\'sha1\'}')
    testGenerateFunctionValue1() {
        HOTP.generate({ string: '12345678901234567890' }).subscribe(_ => unit.assert.equal(_, '755224'))
    }

    @test('- `HOTP.generate()` - `key` => {hex:\'3132333435363738393031323334353637383930\'} and default options => ' +
        '{counter:{int:0}, codeDigits:6, addChecksum:false, algorithm:\'sha1\'}')
    testGenerateFunctionValue2() {
        HOTP.generate({ hex: '3132333435363738393031323334353637383930' }).subscribe(_ => unit.assert.equal(_, '755224'))
    }

    @test('- `HOTP.generate()` - `key` => {string:\'12345678901234567890\'} and options => ' +
        '{counter:{int:5}, codeDigits:6, addChecksum:false, algorithm:\'sha1\'}')
    testGenerateFunctionValue3() {
        HOTP.generate({ string: '12345678901234567890' }, { counter: { int: 5 } }).subscribe(_ => unit.assert.equal(_, '254676'))
    }

    @test('- `HOTP.generate()` - `key` => {string:\'12345678901234567890\'} and options => ' +
        '{counter:{hex:\'9\'}, codeDigits:6, addChecksum:false, algorithm:\'sha1\'}')
    testGenerateFunctionValue4() {
        HOTP.generate({ string: '12345678901234567890' }, { counter: { hex: '9' } }).subscribe(_ => unit.assert.equal(_, '520489'))
    }

    @test('- `HOTP.generate()` - `key` => {string:\'12345678901234567890\'} and options => ' +
        '{counter:{hex:\'2\'}, codeDigits:6, addChecksum:false, algorithm:\'sha1\'}')
    testGenerateFunctionValue5() {
        HOTP.generate({ string: '12345678901234567890' }, { counter: { hex: '2' } }).subscribe(_ => unit.assert.equal(_, '359152'))
    }

    @test('- `HOTP.generate()` - `key` => {string:\'12345678901234567890\'} and options => ' +
        '{counter:{int:7}, codeDigits:10, addChecksum:false, algorithm:\'sha1\'}')
    testGenerateFunctionValue6() {
        HOTP.generate({ string: '12345678901234567890' }, {
            counter: { int: 7 },
            codeDigits: 10
        }).subscribe(_ => unit.assert.equal(_, '0082162583'))
    }

    @test('- `HOTP.generate()` - `key` => {string:\'12345678901234567890\'} and options => ' +
        '{counter:{int:7}, codeDigits:6, addChecksum:true, algorithm:\'sha1\'}')
    testGenerateFunctionValue7() {
        HOTP.generate({ string: '12345678901234567890' }, {
            counter: { int: 7 },
            addChecksum: true
        }).subscribe(_ => unit.assert.equal(_, '1625839'))
    }
}
