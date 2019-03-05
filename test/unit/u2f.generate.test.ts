import { Observable } from 'rxjs';
import { U2F } from '../../src';

describe('- Unit u2f.generate.test.ts file', () => {
    /**
     * Test if U2F.generateAuthToken() function returns an Observable
     */
    test('- `U2F.generateAuthToken()` must return an `Observable`', (done) => {
        expect(U2F.generateAuthToken(undefined)).toBeInstanceOf(Observable);
        done();
    });

    /**
     * Test if U2F.generateAuthToken() function returns an error if key isn't set
     */
    test('- `U2F.generateAuthToken()` must return an error if key isn\'t set', (done) => {
        U2F.generateAuthToken(undefined)
            .subscribe(() => undefined, error => {
                expect(error.message).toBe('Cannot read property \'replace\' of undefined');
                done();
            });
    });

    /**
     * Test if U2F.generateAuthToken() function returns an error if key is an empty string
     */
    test('- `U2F.generateAuthToken()` must return an error if key is an empty string', (done) => {
        U2F.generateAuthToken('')
            .subscribe(() => undefined, error => {
                expect(error.message).toBe('data.key should match pattern "^[A-Fa-f0-9]{2,}$"');
                done();
            });
    });

    /**
     * Test if U2F.generateAuthToken() function returns an error if time isn't a number
     */
    test('- `U2F.generateAuthToken()` must return an error if time isn\'t a number', (done) => {
        U2F.generateAuthToken('RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5', { time: null })
            .subscribe(() => undefined, error => {
                expect(error.message).toBe('data.time should be number');
                done();
            });
    });

    /**
     * Test if U2F.generateAuthToken() function returns an error if time value is less than 1
     */
    test('- `U2F.generateAuthToken()` must return an error if time value is less than 1', (done) => {
        U2F.generateAuthToken('RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5', { time: 0 })
            .subscribe(() => undefined, error => {
                expect(error.message).toBe('data.time should be >= 1');
                done();
            });
    });

    /**
     * Test if U2F.generateAuthToken() function returns an error if timestamp value isn't a number
     */
    test('- `U2F.generateAuthToken()` must return an error if timestamp value isn\'t a number', (done) => {
        U2F.generateAuthToken('RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5', { timestamp: null })
            .subscribe(() => undefined, error => {
                expect(error.message).toBe('data.timestamp should be number');
                done();
            });
    });

    /**
     * Test if U2F.generateAuthToken() function returns an error if code_digits isn't a number
     */
    test('- `U2F.generateAuthToken()` must return an error if code_digits isn\'t a number', (done) => {
        U2F.generateAuthToken('RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5', { code_digits: null })
            .subscribe(() => undefined, error => {
                expect(error.message).toBe('data.code_digits should be number');
                done();
            });
    });

    /**
     * Test if U2F.generateAuthToken() function returns an error if code_digits value is less than 1
     */
    test('- `U2F.generateAuthToken()` must return an error if code_digits value is less than 1', (done) => {
        U2F.generateAuthToken('RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5', { code_digits: 0 })
            .subscribe(() => undefined,
                error => {
                    expect(error.message).toBe('data.code_digits should be >= 1');
                    done();
                });
    });

    /**
     * Test if U2F.generateAuthToken() function returns an error if code_digits value is greater than 10
     */
    test('- `U2F.generateAuthToken()` must return an error if code_digits value is greater than 10', (done) => {
        U2F.generateAuthToken('RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5', { code_digits: 11 })
            .subscribe(() => undefined,
                error => {
                    expect(error.message).toBe('data.code_digits should be <= 10');
                    done();
                });
    });

    /**
     * Test if U2F.generateAuthToken() function returns an error if add_checksum isn't a boolean
     */
    test('- `U2F.generateAuthToken()` must return an error if add_checksum isn\'t a boolean', (done) => {
        U2F.generateAuthToken('RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5', { add_checksum: null })
            .subscribe(() => undefined, error => {
                expect(error.message).toBe('data.add_checksum should be boolean');
                done();
            });
    });

    /**
     * Test if U2F.generateAuthToken() function returns an error if truncation_offset isn't a number
     */
    test('- `U2F.generateAuthToken()` must return an error if truncation_offset isn\'t a number', (done) => {
        U2F.generateAuthToken('RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5', { truncation_offset: null })
            .subscribe(() => undefined, error => {
                expect(error.message).toBe('data.truncation_offset should be number');
                done();
            });
    });

    /**
     * Test if U2F.generateAuthToken() function returns an error if truncation_offset value is less than -1
     */
    test('- `U2F.generateAuthToken()` must return an error if truncation_offset value is less than -1', (done) => {
        U2F.generateAuthToken('RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5', { truncation_offset: -2 })
            .subscribe(() => undefined,
                error => {
                    expect(error.message).toBe('data.truncation_offset should be >= -1');
                    done();
                });
    });

    /**
     * Test if U2F.generateAuthToken() function returns an error if truncation_offset value is greater than 15
     */
    test('- `U2F.generateAuthToken()` must return an error if truncation_offset value is greater than 15', (done) => {
        U2F.generateAuthToken('RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5', { truncation_offset: 16 })
            .subscribe(() => undefined,
                error => {
                    expect(error.message).toBe('data.truncation_offset should be <= 15');
                    done();
                });
    });

    /**
     * Test if U2F.generateAuthToken() function returns an error if algorithm is wrong
     */
    test('- `U2F.generateAuthToken()` must return an error if algorithm is wrong', (done) => {
        U2F.generateAuthToken('RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5', { algorithm: null })
            .subscribe(() => undefined,
                error => {
                    expect(error.message).toBe('data.algorithm should be equal to one of the allowed values');
                    done();
                });
    });
});
