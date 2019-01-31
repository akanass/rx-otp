import { HOTP } from '../../src';
import { Observable } from 'rxjs';

describe('- Unit hotp.test.ts file', () => {
    /**
    * Test if HOTP.generate() function returns an Observable
    */
    test('- `HOTP.generate()` must return an `Observable`', () => {
        expect(HOTP.generate(undefined)).toBeInstanceOf(Observable);
    });

    /**
    * Test if HOTP.generate() function returns an error if key isn't set
    */
    test('- `HOTP.generate()` must return an error if key isn\'t set', () => {
        HOTP.generate(undefined)
            .subscribe(() => undefined, error => expect(error.message).toBe('data should have required property \'.key\''));
    });

    /**
    * Test if HOTP.generate() function returns an error if key isn't a string
    */
    test('- `HOTP.generate()` must return an error if key isn\'t a string', () => {
        HOTP.generate(null)
            .subscribe(() => undefined, error => expect(error.message).toBe('data.key should be string'));
    });

    /**
    * Test if HOTP.generate() function returns an error if key is an empty string
    */
    test('- `HOTP.generate()` must return an error if key is an empty string', () => {
        HOTP.generate('')
            .subscribe(() => undefined, error => expect(error.message).toBe('data.key should NOT be shorter than 1 characters'));
    });

    /**
    * Test if HOTP.generate() function returns an error if key_format isn't set
    */
    test('- `HOTP.generate()` must return an error if key_format isn\'t set', () => {
        HOTP.generate('A', {key_format: undefined})
            .subscribe(() => undefined,
                    error => expect(error.message).toBe('data should have required property \'.key_format\''));
    });

    /**
    * Test if HOTP.generate() function returns an error if key_format is wrong
    */
    test('- `HOTP.generate()` must return an error if key_format is wrong', () => {
        HOTP.generate('A', {key_format: null})
            .subscribe(() => undefined,
                    error => expect(error.message).toBe('data.key_format should be equal to one of the allowed values'));
    });

    /**
    * Test if HOTP.generate() function returns an error if key has a wrong hex value
    */
    test('- `HOTP.generate()` must return an error if key has a wrong hex value', () => {
        HOTP.generate('A', {key_format: 'hex'})
            .subscribe(() => undefined, error => expect(error.message).toBe('data.key should match pattern "^[A-Fa-f0-9]{2,}$"'));
    });

    /**
     * Test if HOTP.generate() function returns an error if counter isn't set
     */
    test('- `HOTP.generate()` must return an error if counter isn\'t set', () => {
        HOTP.generate('secret key', {counter: undefined})
            .subscribe(() => undefined, error => expect(error.message).toBe('data should have required property \'.counter\''));
    });

    /**
     * Test if HOTP.generate() function returns an error if counter isn't a number
     */
    test('- `HOTP.generate()` must return an error if counter isn\'t a number', () => {
        HOTP.generate('secret key', {counter: null})
            .subscribe(() => undefined, error => expect(error.message).toBe('data.counter should be number'));
    });

    /**
     * Test if HOTP.generate() function returns an error if counter value is less than 0
     */
    test('- `HOTP.generate()` must return an error if counter value is less than 0', () => {
        HOTP.generate('secret key', {counter: -1})
            .subscribe(() => undefined, error => expect(error.message).toBe('data.counter should be >= 0'));
    });

    /**
     * Test if HOTP.generate() function returns an error if counter_format isn't set
     */
    test('- `HOTP.generate()` must return an error if counter_format isn\'t set', () => {
        HOTP.generate('A', {counter_format: undefined})
            .subscribe(() => undefined,
                error => expect(error.message).toBe('data should have required property \'.counter_format\''));
    });

    /**
     * Test if HOTP.generate() function returns an error if counter_format is wrong
     */
    test('- `HOTP.generate()` must return an error if counter_format is wrong', () => {
        HOTP.generate('secret key', {counter_format: null})
            .subscribe(() => undefined,
                    error => expect(error.message).toBe('data.counter_format should be equal to one of the allowed values'));
    });

    /**
     * Test if HOTP.generate() function returns an error if counter_format is wrong
     */
    test('- `HOTP.generate()` must return an error if counter has a wrong hex value', () => {
        HOTP.generate('secret key', {counter: '00000000000000000', counter_format: 'hex'})
            .subscribe(() => undefined,
                    error => expect(error.message).toBe('data.counter should match pattern "^[A-Fa-f0-9]{1,16}$"'));
    });

    /**
     * Test if HOTP.generate() function returns an error if code_digits isn't set
     */
    test('- `HOTP.generate()` must return an error if code_digits isn\'t set', () => {
        HOTP.generate('secret key', {code_digits: undefined})
            .subscribe(() => undefined,
                    error => expect(error.message).toBe('data should have required property \'.code_digits\''));
    });

    /**
     * Test if HOTP.generate() function returns an error if code_digits isn't a number
     */
    test('- `HOTP.generate()` must return an error if code_digits isn\'t a number', () => {
        HOTP.generate('secret key', {code_digits: null})
            .subscribe(() => undefined, error => expect(error.message).toBe('data.code_digits should be number'));
    });

    /**
     * Test if HOTP.generate() function returns an error if code_digits value is less than 1
     */
    test('- `HOTP.generate()` must return an error if code_digits value is less than 1', () => {
        HOTP.generate('secret key', {code_digits: 0})
            .subscribe(() => undefined,
                    error => expect(error.message).toBe('data.code_digits should be >= 1'));
    });

    /**
     * Test if HOTP.generate() function returns an error if code_digits value is greater than 10
     */
    test('- `HOTP.generate()` must return an error if code_digits value is greater than 10', () => {
        HOTP.generate('secret key', {code_digits: 11})
            .subscribe(() => undefined,
                    error => expect(error.message).toBe('data.code_digits should be <= 10'));
    });

    /**
     * Test if HOTP.generate() function returns an error if add_checksum isn't set
     */
    test('- `HOTP.generate()` must return an error if add_checksum isn\'t set', () => {
        HOTP.generate('secret key', {add_checksum: undefined})
            .subscribe(() => undefined,
                error => expect(error.message).toBe('data should have required property \'.add_checksum\''));
    });

    /**
     * Test if HOTP.generate() function returns an error if add_checksum isn't a boolean
     */
    test('- `HOTP.generate()` must return an error if add_checksum isn\'t a boolean', () => {
        HOTP.generate('secret key', {add_checksum: null})
            .subscribe(() => undefined, error => expect(error.message).toBe('data.add_checksum should be boolean'));
    });

    /**
     * Test if HOTP.generate() function returns an error if truncation_offset isn't set
     */
    test('- `HOTP.generate()` must return an error if truncation_offset isn\'t set', () => {
        HOTP.generate('secret key', {truncation_offset: undefined})
            .subscribe(() => undefined,
                error => expect(error.message).toBe('data should have required property \'.truncation_offset\''));
    });

    /**
     * Test if HOTP.generate() function returns an error if truncation_offset isn't a number
     */
    test('- `HOTP.generate()` must return an error if truncation_offset isn\'t a number', () => {
        HOTP.generate('secret key', {truncation_offset: null})
            .subscribe(() => undefined, error => expect(error.message).toBe('data.truncation_offset should be number'));
    });

    /**
     * Test if HOTP.generate() function returns an error if truncation_offset value is less than -1
     */
    test('- `HOTP.generate()` must return an error if truncation_offset value is less than -1', () => {
        HOTP.generate('secret key', {truncation_offset: -2})
            .subscribe(() => undefined,
                error => expect(error.message).toBe('data.truncation_offset should be >= -1'));
    });

    /**
     * Test if HOTP.generate() function returns an error if truncation_offset value is greater than 15
     */
    test('- `HOTP.generate()` must return an error if truncation_offset value is greater than 15', () => {
        HOTP.generate('secret key', {truncation_offset: 16})
            .subscribe(() => undefined,
                error => expect(error.message).toBe('data.truncation_offset should be <= 15'));
    });

    /**
     * Test if HOTP.generate() function returns an error if algorithm isn't set
     */
    test('- `HOTP.generate()` must return an error if algorithm isn\'t set', () => {
        HOTP.generate('A', {algorithm: undefined})
            .subscribe(() => undefined,
                error => expect(error.message).toBe('data should have required property \'.algorithm\''));
    });

    /**
     * Test if HOTP.generate() function returns an error if algorithm is wrong
     */
    test('- `HOTP.generate()` must return an error if algorithm is wrong', () => {
        HOTP.generate('secret key', {algorithm: null})
            .subscribe(() => undefined,
                error => expect(error.message).toBe('data.algorithm should be equal to one of the allowed values'));
    });

    /**
     * Test if HOTP._validateGenerateData() function returns all default values
     */
    test('- `HOTP._validateGenerateData()` must return all default values', () => {
        HOTP['_validateGenerateData']({key: 'secret key'})
            .subscribe(_ =>
                expect(_).toEqual({
                    key: 'secret key',
                    key_format: 'str',
                    counter: 0,
                    counter_format: 'int',
                    code_digits: 6,
                    add_checksum: false,
                    truncation_offset: -1,
                    algorithm: 'sha512'
                })
            );
    });

    /**
     * Test if HOTP._validateGenerateData() function returns updated values
     */
    test('- `HOTP._validateGenerateData()` must return updated values', () => {
        HOTP['_validateGenerateData']({key: '00000000', key_format: 'hex', counter: 1, code_digits: 10, algorithm: 'sha256'})
            .subscribe(_ =>
                expect(_).toEqual({
                    key: '00000000',
                    key_format: 'hex',
                    counter: 1,
                    counter_format: 'int',
                    code_digits: 10,
                    add_checksum: false,
                    truncation_offset: -1,
                    algorithm: 'sha256'
                })
            );
    });
});
