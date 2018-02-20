import { suite, test } from 'mocha-typescript';
import * as unit from 'unit.js';

import { Observable } from 'rxjs/Observable';
import { HOTP } from '../../src';

@suite('- Unit HOTPTest file')
export class HOTPTest {
    /**
     * Test if HOTP class has generate function
     */
    @test('- `HOTP` class must have `generate` function')
    testGenerateFunction() {
        unit.function(HOTP.generate);
    }

    /**
     * Test if HOTP.generate() function returns an Observable
     */
    @test('- `HOTP.generate()` must return an `Observable`')
    testGenerateFunctionReturnObservable() {
        unit.object(HOTP.generate(undefined))
            .isInstanceOf(Observable);
    }

    /**
     * Test if HOTP.generate() function returns an error if key isn't setted
     */
    @test('- `HOTP.generate()` must return an error if key isn\'t setted')
    testGenerateFunctionReturnObservableErrorKeyRequired() {
        HOTP.generate(undefined)
            .subscribe(undefined, error => unit.string(error.message).is('"key" is required'));
    }

    /**
     * Test if HOTP.generate() function returns an error if key isn't an object
     */
    @test('- `HOTP.generate()` must return an error if key isn\'t an object')
    testGenerateFunctionReturnObservableErrorKeyObject(done) {
        HOTP.generate(null)
            .subscribe(undefined, error => unit.string(error.message).is('"key" must be an object').when(_ => done()));
    }

    /**
     * Test if HOTP.generate() function returns an error if key isn't an object with good property
     */
    @test('- `HOTP.generate()` must return an error if key isn\'t an object with good property')
    testGenerateFunctionReturnObservableErrorKeyObjectProperty(done) {
        HOTP.generate({})
            .subscribe(undefined, error => unit.string(error.message)
                .is('"key" must contain at least one of [string, hex]').when(_ => done()));
    }

    /**
     * Test if HOTP.generate() function returns an error if key has an empty string property
     */
    @test('- `HOTP.generate()` must return an error if key has an empty string property')
    testGenerateFunctionReturnObservableErrorKeyObjectPropertyStringEmpty(done) {
        HOTP.generate({ string: '' })
            .subscribe(undefined, error =>
                unit.string(error.message).is('child "string" fails because ["key" is not allowed to be empty]').when(_ => done())
            );
    }

    /**
     * Test if HOTP.generate() function returns an error if key has an empty hex property
     */
    @test('- `HOTP.generate()` must return an error if key has an empty hex property')
    testGenerateFunctionReturnObservableErrorKeyObjectPropertyHexEmpty(done) {
        HOTP.generate({ hex: '' })
            .subscribe(undefined, error => unit.string(error.message)
                .is('child "hex" fails because ["key" is not allowed to be empty]').when(_ => done()));
    }

    /**
     * Test if HOTP.generate() function returns an error if key has a wrong hex property
     */
    @test('- `HOTP.generate()` must return an error if key has a wrong hex property')
    testGenerateFunctionReturnObservableErrorKeyObjectPropertyHexWrong(done) {
        HOTP.generate({ hex: 'A' })
            .subscribe(undefined, error =>
                unit.string(error.message)
                    .is('child "hex" fails because ["key" with value "A" fails to match the required pattern: /^[A-Fa-f0-9]{2,}$/]')
                    .when(_ => done())
            );
    }

    /**
     * Test if HOTP.generate() function returns an error if key has both string and hex properties
     */
    @test('- `HOTP.generate()` must return an error if key has both string and hex properties')
    testGenerateFunctionReturnObservableErrorKeyObjectPropertyCount(done) {
        HOTP.generate({ string: 'a', hex: 'AA' })
            .subscribe(undefined, error =>
                unit.string(error.message)
                    .is('"key" contains a conflict between exclusive peers [string, hex]').when(_ => done())
            );
    }

    /**
     * Test if HOTP.generate() function returns an error if counter option isn't an object with good property
     */
    @test('- `HOTP.generate()` must return an error if counter option isn\'t an object with good property')
    testGenerateFunctionReturnObservableErrorOptionCounterObjectProperty(done) {
        HOTP.generate({ string: 'secret user' }, { counter: {} })
            .subscribe(undefined, error =>
                unit.string(error.message)
                    .is('child "counter" fails because ["options" must contain at least one of [int, hex]]').when(_ => done())
            );
    }

    /**
     * Test if HOTP.generate() function returns an error if counter option with int value is less than 0
     */
    @test('- `HOTP.generate()` must return an error if counter option with int value is less than 0')
    testGenerateFunctionReturnObservableErrorOptionCounterObjectPropertyIntLess0(done) {
        HOTP.generate({ string: 'secret user' }, { counter: { int: -1 } })
            .subscribe(undefined, error =>
                unit.string(error.message)
                    .is('child "counter" fails because [child "int" fails because ["options" must be larger than or equal to 0]]')
                    .when(_ => done())
            );
    }

    /**
     * Test if HOTP.generate() function returns an error if counter option with hex value is empty
     */
    @test('- `HOTP.generate()` must return an error if counter option with hex value is empty')
    testGenerateFunctionReturnObservableErrorOptionCounterObjectPropertyHexEmpty(done) {
        HOTP.generate({ string: 'secret user' }, { counter: { hex: '' } })
            .subscribe(undefined, error =>
                unit.string(error.message)
                    .is('child "counter" fails because [child "hex" fails because ["options" is not allowed to be empty]]')
                    .when(_ => done())
            );
    }

    /**
     * Test if HOTP.generate() function returns an error if counter option with hex value is wrong
     */
    @test('- `HOTP.generate()` must return an error if counter option with hex value is wrong')
    testGenerateFunctionReturnObservableErrorOptionCounterObjectPropertyHexWrongValue(done) {
        HOTP.generate({ string: 'secret user' }, { counter: { hex: '00000000000000000' } })
            .subscribe(undefined, error =>
                unit.string(error.message)
                    .is('child "counter" fails because [child "hex" fails because ' +
                        '["options" with value "00000000000000000" fails to match the required pattern: /^[A-Fa-f0-9]{1,16}$/]]')
                    .when(_ => done())
            );
    }

    /**
     * Test if HOTP.generate() function returns an error if counter option has both int and hex properties
     */
    @test('- `HOTP.generate()` must return an error if counter option has both int and hex properties')
    testGenerateFunctionReturnObservableErrorOptionCounterObjectBothProperties(done) {
        HOTP.generate({ string: 'secret user' }, { counter: { int: 0, hex: 'A' } })
            .subscribe(undefined, error =>
                unit.string(error.message)
                    .is('child "counter" fails because ["options" contains a conflict between exclusive peers [int, hex]]')
                    .when(_ => done())
            );
    }

    /**
     * Test if HOTP.generate() function returns an error if codeDigits option value is less than 1
     */
    @test('- `HOTP.generate()` must return an error if codeDigits option value is less than 1')
    testGenerateFunctionReturnObservableErrorOptionCodeDigitsLess1(done) {
        HOTP.generate({ string: 'secret user' }, { codeDigits: 0 })
            .subscribe(undefined, error =>
                unit.string(error.message)
                    .is('child "codeDigits" fails because ["options" must be larger than or equal to 1]')
                    .when(_ => done())
            );
    }

    /**
     * Test if HOTP.generate() function returns an error if codeDigits option value is greater than 10
     */
    @test('- `HOTP.generate()` must return an error if codeDigits option value is greater than 10')
    testGenerateFunctionReturnObservableErrorOptionCodeDigitsGreater10(done) {
        HOTP.generate({ string: 'secret user' }, { codeDigits: 11 })
            .subscribe(undefined, error =>
                unit.string(error.message)
                    .is('child "codeDigits" fails because ["options" must be less than or equal to 10]')
                    .when(_ => done())
            );
    }

    /**
     * Test if HOTP.generate() function returns an error if truncationOffset option value is less than 0
     */
    @test('- `HOTP.generate()` must return an error if truncationOffset option value is not a boolean')
    testGenerateFunctionReturnObservableErrorOptionTruncationOffsetLess0(done) {
        HOTP.generate({ string: 'secret user' }, { truncationOffset: -1 })
            .subscribe(undefined, error =>
                unit.string(error.message)
                    .is('child "truncationOffset" fails because ["options" must be larger than or equal to 0]')
                    .when(_ => done())
            );
    }

    /**
     * Test if HOTP.generate() function returns an error if truncationOffset option value is greater than 15
     */
    @test('- `HOTP.generate()` must return an error if truncationOffset option value is not a boolean')
    testGenerateFunctionReturnObservableErrorOptionTruncationOffsetGreater15(done) {
        HOTP.generate({ string: 'secret user' }, { truncationOffset: 16 })
            .subscribe(undefined, error =>
                unit.string(error.message)
                    .is('child "truncationOffset" fails because ["options" must be less than or equal to 15]')
                    .when(_ => done())
            );
    }
}
