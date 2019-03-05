import { Observable } from 'rxjs';
import { U2F } from '../../src';

describe('- Unit u2f.verify.test.ts file', () => {
    /**
     * Test if U2F.verifyAuthToken() function returns an Observable
     */
    test('- `U2F.verifyAuthToken()` must return an `Observable`', (done) => {
        expect(U2F.verifyAuthToken(undefined, undefined)).toBeInstanceOf(Observable);
        done();
    });

    /**
     * Test if U2F.verifyAuthToken() function returns an error if token isn't set
     */
    test('- `U2F.verifyAuthToken()` must return an error if key isn\'t set', (done) => {
        U2F.verifyAuthToken(undefined, 'RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5')
            .subscribe(() => undefined, error => {
                expect(error.message).toBe('data should have required property \'token\'');
                done();
            });
    });

    /**
     * Test if U2F.verifyAuthToken() function returns an error if token isn't a string
     */
    test('- `U2F.verifyAuthToken()` must return an error if token isn\'t a string', (done) => {
        U2F.verifyAuthToken(null, 'RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5')
            .subscribe(() => undefined, error => {
                expect(error.message).toBe('data.token should be string');
                done();
            });
    });

    /**
     * Test if U2F.verifyAuthToken() function returns an error if token has wrong value
     */
    test('- `U2F.verifyAuthToken()` must return an error if token has wrong value', (done) => {
        U2F.verifyAuthToken('', 'RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5')
            .subscribe(() => undefined, error => {
                expect(error.message).toBe('data.token should match pattern "^[0-9]{1,11}$"');
                done();
            });
    });

    /**
     * Test if U2F.verifyAuthToken() function returns an error if key isn't set
     */
    test('- `U2F.verifyAuthToken()` must return an error if key isn\'t set', (done) => {
        U2F.verifyAuthToken('123456', undefined)
            .subscribe(() => undefined, error => {
                expect(error.message).toBe('Cannot read property \'replace\' of undefined');
                done();
            });
    });

    /**
     * Test if U2F.verifyAuthToken() function returns an error if key is an empty string
     */
    test('- `U2F.verifyAuthToken()` must return an error if key is an empty string', (done) => {
        U2F.verifyAuthToken('123456', '')
            .subscribe(() => undefined, error => {
                expect(error.message).toBe('data.key should match pattern "^[A-Fa-f0-9]{2,}$"');
                done();
            });
    });

    /**
     * Test if U2F.verifyAuthToken() function returns an error if window isn't a number
     */
    test('- `U2F.verifyAuthToken()` must return an error if window isn\'t a number', (done) => {
        U2F.verifyAuthToken('123456', 'RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5', { window: null })
            .subscribe(() => undefined, error => {
                expect(error.message).toBe('data.window should be number');
                done();
            });
    });

    /**
     * Test if U2F.verifyAuthToken() function returns an error if window value is less than 0
     */
    test('- `U2F.verifyAuthToken()` must return an error if window value is less than 0', (done) => {
        U2F.verifyAuthToken('123456', 'RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5', { window: -1 })
            .subscribe(() => undefined, error => {
                expect(error.message).toBe('data.window should be >= 0');
                done();
            });
    });

    /**
     * Test if U2F.verifyAuthToken() function returns an error if time isn't a number
     */
    test('- `U2F.verifyAuthToken()` must return an error if time isn\'t a number', (done) => {
        U2F.verifyAuthToken('123456', 'RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5', { time: null })
            .subscribe(() => undefined, error => {
                expect(error.message).toBe('data.time should be number');
                done();
            });
    });

    /**
     * Test if U2F.verifyAuthToken() function returns an error if time value is less than 1
     */
    test('- `U2F.verifyAuthToken()` must return an error if time value is less than 1', (done) => {
        U2F.verifyAuthToken('123456', 'RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5', { time: 0 })
            .subscribe(() => undefined, error => {
                expect(error.message).toBe('data.time should be >= 1');
                done();
            });
    });

    /**
     * Test if U2F.verifyAuthToken() function returns an error if timestamp value isn't a number
     */
    test('- `U2F.verifyAuthToken()` must return an error if timestamp value isn\'t a number', (done) => {
        U2F.verifyAuthToken('123456', 'RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5', { timestamp: null })
            .subscribe(() => undefined, error => {
                expect(error.message).toBe('data.timestamp should be number');
                done();
            });
    });

    /**
     * Test if U2F.verifyAuthToken() function returns an error if add_checksum isn't a boolean
     */
    test('- `U2F.verifyAuthToken()` must return an error if add_checksum isn\'t a boolean', (done) => {
        U2F.verifyAuthToken('123456', 'RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5', { add_checksum: null })
            .subscribe(() => undefined, error => {
                expect(error.message).toBe('data.add_checksum should be boolean');
                done();
            });
    });

    /**
     * Test if U2F.verifyAuthToken() function returns an error if truncation_offset isn't a number
     */
    test('- `U2F.verifyAuthToken()` must return an error if truncation_offset isn\'t a number', (done) => {
        U2F.verifyAuthToken('123456', 'RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5', { truncation_offset: null })
            .subscribe(() => undefined, error => {
                expect(error.message).toBe('data.truncation_offset should be number');
                done();
            });
    });

    /**
     * Test if U2F.verifyAuthToken() function returns an error if truncation_offset value is less than -1
     */
    test('- `U2F.verifyAuthToken()` must return an error if truncation_offset value is less than -1', (done) => {
        U2F.verifyAuthToken('123456', 'RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5', { truncation_offset: -2 })
            .subscribe(() => undefined,
                error => {
                    expect(error.message).toBe('data.truncation_offset should be >= -1');
                    done();
                });
    });

    /**
     * Test if U2F.verifyAuthToken() function returns an error if truncation_offset value is greater than 15
     */
    test('- `U2F.verifyAuthToken()` must return an error if truncation_offset value is greater than 15', (done) => {
        U2F.verifyAuthToken('123456', 'RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5', { truncation_offset: 16 })
            .subscribe(() => undefined,
                error => {
                    expect(error.message).toBe('data.truncation_offset should be <= 15');
                    done();
                });
    });

    /**
     * Test if U2F.verifyAuthToken() function returns an error if algorithm is wrong
     */
    test('- `U2F.verifyAuthToken()` must return an error if algorithm is wrong', (done) => {
        U2F.verifyAuthToken('123456', 'RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5', { algorithm: null })
            .subscribe(() => undefined,
                error => {
                    expect(error.message).toBe('data.algorithm should be equal to one of the allowed values');
                    done();
                });
    });
});
