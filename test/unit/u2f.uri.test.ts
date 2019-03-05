import { Observable } from 'rxjs';
import { U2F } from '../../src';

describe('- Unit u2f.uri.test.ts file', () => {
    /**
     * Test if U2F.generateTOTPUri() function returns an Observable
     */
    test('- `U2F.generateTOTPUri()` must return an `Observable`', (done) => {
        expect(U2F.generateTOTPUri(undefined, undefined, undefined)).toBeInstanceOf(Observable);
        done();
    });

    /**
     * Test if U2F.generateTOTPUri() function returns an error if secret isn't set
     */
    test('- `U2F.generateTOTPUri()` must return an error if secret isn\'t set', (done) => {
        U2F.generateTOTPUri(undefined, undefined, undefined).subscribe(() => undefined, error => {
            expect(error.message).toBe('Cannot read property \'replace\' of undefined');
            done();
        });
    });

    /**
     * Test if U2F.generateTOTPUri() function returns an error if secret has a wrong value
     */
    test('- `U2F.generateTOTPUri()` must return an error if secret has a wrong value', (done) => {
        U2F.generateTOTPUri('', undefined, undefined).subscribe(() => undefined, error => {
            expect(error.message).toBe('data.secret should match pattern "^[A-Z2-7]{2,}$"');
            done();
        });
    });

    /**
     * Test if U2F.generateTOTPUri() function returns an error if account_name isn't set
     */
    test('- `U2F.generateTOTPUri()` must return an error if account_name isn\'t set', (done) => {
        U2F.generateTOTPUri('RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5', undefined, undefined).subscribe(() => undefined, error => {
            expect(error.message).toBe('data should have required property \'account_name\'');
            done();
        });
    });

    /**
     * Test if U2F.generateTOTPUri() function returns an error if account_name isn't a string
     */
    test('- `U2F.generateTOTPUri()` must return an error if account_name isn\'t a string', (done) => {
        U2F.generateTOTPUri('RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5', null, undefined).subscribe(() => undefined, error => {
            expect(error.message).toBe('data.account_name should be string');
            done();
        });
    });

    /**
     * Test if U2F.generateTOTPUri() function returns an error if account_name is an empty string
     */
    test('- `U2F.generateTOTPUri()` must return an error if account_name is an empty string', (done) => {
        U2F.generateTOTPUri('RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5', '', undefined).subscribe(() => undefined, error => {
            expect(error.message).toBe('data.account_name should NOT be shorter than 1 characters');
            done();
        });
    });
    /**
     * Test if U2F.generateTOTPUri() function returns an error if issuer isn't set
     */
    test('- `U2F.generateTOTPUri()` must return an error if account_name isn\'t set', (done) => {
        U2F.generateTOTPUri('RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5', 'akanass', undefined).subscribe(() => undefined, error => {
            expect(error.message).toBe('data should have required property \'issuer\'');
            done();
        });
    });

    /**
     * Test if U2F.generateTOTPUri() function returns an error if issuer isn't a string
     */
    test('- `U2F.generateTOTPUri()` must return an error if issuer isn\'t a string', (done) => {
        U2F.generateTOTPUri('RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5', 'akanass', null).subscribe(() => undefined, error => {
            expect(error.message).toBe('data.issuer should be string');
            done();
        });
    });

    /**
     * Test if U2F.generateTOTPUri() function returns an error if issuer is an empty string
     */
    test('- `U2F.generateTOTPUri()` must return an error if issuer is an empty string', (done) => {
        U2F.generateTOTPUri('RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5', 'akanass', '').subscribe(() => undefined, error => {
            expect(error.message).toBe('data.issuer should NOT be shorter than 1 characters');
            done();
        });
    });

    /**
     * Test if U2F.generateTOTPUri() function returns an error if time isn't a number
     */
    test('- `U2F.generateTOTPUri()` must return an error if time isn\'t a number', (done) => {
        U2F.generateTOTPUri('RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5', 'akanass', 'rx-otp', { time: null })
            .subscribe(() => undefined, error => {
                expect(error.message).toBe('data.time should be number');
                done();
            });
    });

    /**
     * Test if U2F.generateTOTPUri() function returns an error if time value is less than 1
     */
    test('- `U2F.generateTOTPUri()` must return an error if time value is less than 1', (done) => {
        U2F.generateTOTPUri('RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5', 'akanass', 'rx-otp', { time: 0 })
            .subscribe(() => undefined, error => {
                expect(error.message).toBe('data.time should be >= 1');
                done();
            });
    });

    /**
     * Test if U2F.generateTOTPUri() function returns an error if code_digits isn't a number
     */
    test('- `U2F.generateTOTPUri()` must return an error if code_digits isn\'t a number', (done) => {
        U2F.generateTOTPUri('RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5', 'akanass', 'rx-otp', { code_digits: null })
            .subscribe(() => undefined, error => {
                expect(error.message).toBe('data.code_digits should be number');
                done();
            });
    });

    /**
     * Test if U2F.generateTOTPUri() function returns an error if code_digits value is less than 1
     */
    test('- `U2F.generateTOTPUri()` must return an error if code_digits value is less than 1', (done) => {
        U2F.generateTOTPUri('RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5', 'akanass', 'rx-otp', { code_digits: 0 })
            .subscribe(() => undefined, error => {
                expect(error.message).toBe('data.code_digits should be >= 1');
                done();
            });
    });

    /**
     * Test if U2F.generateTOTPUri() function returns an error if code_digits value is greater than 10
     */
    test('- `U2F.generateTOTPUri()` must return an error if code_digits value is greater than 10', (done) => {
        U2F.generateTOTPUri('RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5', 'akanass', 'rx-otp', { code_digits: 11 })
            .subscribe(() => undefined, error => {
                expect(error.message).toBe('data.code_digits should be <= 10');
                done();
            });
    });

    /**
     * Test if U2F.generateTOTPUri() function returns an error if algorithm is wrong
     */
    test('- `U2F.generateTOTPUri()` must return an error if algorithm is wrong', (done) => {
        U2F.generateTOTPUri('RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5', 'akanass', 'rx-otp', { algorithm: null })
            .subscribe(() => undefined, error => {
                expect(error.message).toBe('data.algorithm should be equal to one of the allowed values');
                done();
            });
    });
});
