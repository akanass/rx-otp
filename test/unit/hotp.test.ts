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
});
