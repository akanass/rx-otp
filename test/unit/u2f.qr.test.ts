import { Observable } from 'rxjs';
import { U2F } from '../../src';

describe('- Unit u2f.test.ts file', () => {
    /**
     * Test if U2F.qrCode() function returns an Observable
     */
    test('- `U2F.qrCode()` must return an `Observable`', (done) => {
        expect(U2F.qrCode(undefined)).toBeInstanceOf(Observable);
        done();
    });

    /**
     * Test if U2F.qrCode() function returns an error if text isn't set
     */
    test('- `U2F.qrCode()` must return an error if text isn\'t set', (done) => {
        U2F.qrCode(undefined)
            .subscribe(() => undefined, error => {
                expect(error.message).toBe('data should have required property \'text\'');
                done();
            });
    });

    /**
     * Test if U2F.qrCode() function returns an error if text isn't a string
     */
    test('- `U2F.qrCode()` must return an error if text isn\'t a string', (done) => {
        U2F.qrCode(null)
            .subscribe(() => undefined, error => {
                expect(error.message).toBe('data.text should be string');
                done();
            });
    });

    /**
     * Test if U2F.qrCode() function returns an error if text is an empty string
     */
    test('- `U2F.qrCode()` must return an error if text is an empty string', (done) => {
        U2F.qrCode('')
            .subscribe(() => undefined, error => {
                expect(error.message).toBe('data.text should NOT be shorter than 1 characters');
                done();
            });
    });

    /**
     * Test if U2F.qrCode() function returns an error if ec_level is wrong
     */
    test('- `U2F.qrCode()` must return an error if ec_level is wrong', (done) => {
        U2F.qrCode('RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5', { ec_level: null })
            .subscribe(() => undefined, error => {
                expect(error.message).toBe('data.ec_level should be equal to one of the allowed values');
                done();
            });
    });

    /**
     * Test if U2F.qrCode() function returns an error if type is wrong
     */
    test('- `U2F.qrCode()` must return an error if type is wrong', (done) => {
        U2F.qrCode('RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5', { type: null })
            .subscribe(() => undefined, error => {
                expect(error.message).toBe('data.type should be equal to one of the allowed values');
                done();
            });
    });

    /**
     * Test if U2F.qrCode() function returns an error if size isn't a number
     */
    test('- `U2F.qrCode()` must return an error if size isn\'t a number', (done) => {
        U2F.qrCode('RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5', { size: null })
            .subscribe(() => undefined, error => {
                expect(error.message).toBe('data.size should be number');
                done();
            });
    });

    /**
     * Test if U2F.qrCode() function returns an error if size value is less than 1
     */
    test('- `U2F.qrCode()` must return an error if size value is less than 1', (done) => {
        U2F.qrCode('RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5', { size: 0 })
            .subscribe(() => undefined, error => {
                expect(error.message).toBe('data.size should be >= 1');
                done();
            });
    });
});
