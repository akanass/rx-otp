import { Buffer } from 'buffer';
import { flatMap } from 'rxjs/operators';
import { U2F } from '../../src';

describe('- Integration u2f.test.ts file', () => {
    /**
     * Test if U2F.decodeAuthKey() function returns the same value than initial value in base32
     */
    test('- `U2F.decodeAuthKey()` must return the same value than initial value in base32', (done) => {
        U2F.encodeAuthKey(Buffer.from('secret key'))
            .pipe(
                flatMap(_ => U2F.decodeAuthKey(_))
            ).subscribe(_ => {
            expect(_.toString('hex')).toBe(Buffer.from('secret key').toString('hex'));
            done();
        });
    });

    /**
     * Test if U2F._cleanBase32Key() function returns good value
     */
    test('- `U2F._cleanBase32Key()` must return good value - 1', (done) => {
        U2F[ '_cleanBase32Key' ]('RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5').subscribe(_ => {
            expect(_).toBe('RHCQ3M3YP5KYU4VS7KGT2IUHR7M4TEC5');
            done();
        });
    });

    test('- `U2F._cleanBase32Key()` must return good value - 2', (done) => {
        U2F[ '_cleanBase32Key' ]('RHCQ 3M3Y P5KY U4V_ 7KG- 2IU. R7M4 TEC5').subscribe(_ => {
            expect(_).toBe('RHCQ3M3YP5KYU4V7KG2IUR7M4TEC5');
            done();
        });
    });

    /**
     * Test if U2F.generateTOTPUri() function returns good value with good parameters
     */
    test('- `U2F.generateTOTPUri()` - secret => \'RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5\',' +
        'account_name => \'akanass\', issuer => \'rx-otp\' and options => {time:30, code_digits:6, algorithm:\'SHA512\'}', (done) => {
        U2F.generateTOTPUri('RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5', 'akanass', 'rx-otp')
            .subscribe(_ => {
                expect(_).toBe('otpauth://totp/rx-otp:akanass?secret=RHCQ3M3YP5KYU4VS7KGT2IUHR7M4TEC5' +
                    '&issuer=rx-otp&algorithm=SHA512&digits=6&period=30');
                done();
            });
    });

    test('- `U2F.generateTOTPUri()` - secret => \'RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5\',' +
        'account_name => \'akanass\', issuer => \'rx-otp\' and options => {time:10, code_digits:8, algorithm:\'SHA1\'}', (done) => {
        U2F.generateTOTPUri('RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5', 'akanass', 'rx-otp', {
            time: 10,
            code_digits: 8,
            algorithm: 'SHA1'
        })
            .subscribe(_ => {
                expect(_).toBe('otpauth://totp/rx-otp:akanass?secret=RHCQ3M3YP5KYU4VS7KGT2IUHR7M4TEC5' +
                    '&issuer=rx-otp&algorithm=SHA1&digits=8&period=10');
                done();
            });
    });

    /**
     * Test if U2F.generateAuthToken() function returns good value with good parameters
     */
    test('- `U2F.generateAuthToken()` - secret => \'RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5\' and options => ' +
        '{time:30, timestamp:59000, code_digits:6, add_checksum:false, truncation_offset: -1, algorithm:\'SHA512\'}', (done) => {
        U2F.generateAuthToken('RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5', { timestamp: 59000 })
            .subscribe(_ => {
                expect(_).toBe('766122');
                done();
            });
    });

    /**
     * Test if U2F.verifyAuthToken() function returns good value with good parameters
     */
    test('- `U2F.verifyAuthToken()` - token: \'766122\', secret => \'RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5\' and options => ' +
        '{time:30, timestamp:59000, code_digits:6, add_checksum:false, truncation_offset: -1, algorithm:\'SHA512\'}', (done) => {
        U2F.verifyAuthToken('766122', 'RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5', { timestamp: 59000 })
            .subscribe(_ => {
                expect(_).toEqual({
                    delta: 0,
                    delta_format: 'int'
                });
                done();
            });
    });

    /**
     * Test if U2F.qrCode() function returns good value with good parameters
     */
    test('- `U2F.qrCode()` must return a svg', (done) => {
        U2F.generateTOTPUri('RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5', 'akanass', 'rx-otp')
            .pipe(
                flatMap(_ => U2F.qrCode(_))
            )
            .subscribe(_ => {
                expect(_).toEqual('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47 47">' +
                    '<path d="M1 1h7v7h-7zM12 1h1v1h-1zM14 1h7v2h-1v-1h-3v1h-1v-1h-1v1h1v1h1v2h1v2h1v-2h1v2h1v-2h-1v-1h-1v1h-' +
                    '1v-2h-1v-1h3v1h1v-1h1v1h1v1h3v-2h-1v1h-1v-1h-1v-1h-1v-1h2v1h2v-1h1v1h1v1h-1v3h1v2h-1v-1h-1v1h1v1h-1v1h-' +
                    '1v1h-2v-1h-3v2h-1v-1h-3v-1h1v-1h-1v1h-1v-1h-1v-1h1v-1h1v1h1v-1h-1v-1h-2v-1h1v-1h-1v1h-1v-3h1zM29 ' +
                    '1h1v3h-1zM31 1h1v1h-1zM37 1h1v1h-1zM39 1h7v7h-7zM2 2v5h5v-5zM34 2h1v2h-2v1h-1v1h1v1h-1v1h1v-1h1v2h-1v5h1v1h' +
                    '-3v-1h1v-1h-1v-1h1v-1h-1v-1h1v-1h-1v-2h-1v-3h2v-1h2zM36 2h1v2h1v2h-3v-1h1zM40 2v5h5v-5zM3 3h3v3h-3zM9 3h3v1h' +
                    '-2v1h1v1h-1v3h-1zM41 3h3v3h-3zM28 4h1v1h-1zM12 6h1v1h-1zM22 6v3h3v-3zM34 6h1v1h-1zM11 7h1v1h1v1h1v3h1v1h-1v1h1v' +
                    '-1h1v-1h1v2h-1v3h2v-3h1v1h1v1h1v1h-1v3h1v1h-1v1h-2v-1h1v-1h-1v-1h1v-1h-1v1h-2v-1h-3v-2h-1v1h-1v1h-2v-1h1v-1h1v' +
                    '-1h1v-1h1v-2h-2v1h1v1h-1v1h-1v1h-1v-1h-1v-1h2v-1h-2v-1h-1v-1h2v1h1v-1h1zM13 7h1v1h-1zM23 7h1v1h-1zM29 7h1v2h-1zM35' +
                    ' 7h1v1h1v-1h1v2h-2v1h-1zM1 9h1v1h1v1h2v-1h-2v-1h5v1h-2v2h-1v1h-1v1h-2v-1h1v-1h-1v-1h-1zM18 9v1h1v-1zM39 9h5v1h2v1h' +
                    '-1v1h1v3h-3v1h2v1h1v2h-2v-1h-1v-1h-1v-3h2v-1h-3v-1h1v-2h-3zM9 10h1v1h-1zM26 10h1v1h1v1h-1v1h-1v1h-2v1h-1v-1h-1v2h' +
                    '-1v-1h-1v-1h1v-1h-1v-1h2v1h3v-2h1zM29 10h1v1h1v1h-1v1h-2v-1h1zM34 10h1v1h1v1h-1v1h-1zM36 10h3v1h1v1h-1v1h-1v2h3v2h' +
                    '-1v-1h-1v3h-2v-1h1v-2h-1v-1h-1v-1h1v-1h-1v-1h2v-1h-2zM15 11h1v1h-1zM22 11h1v1h-1zM1 12h1v1h-1zM18 12h1v1h-1zM5' +
                    ' 13h3v1h-1v1h1v1h-5v-1h1v-1h1v1h1v-1h-1zM19 13h1v1h-1zM30 13h1v1h-1zM35 13h1v1h-1zM40 13h1v1h-1zM26 14h1v3h' +
                    '-1v1h1v1h1v1h-3v1h1v1h1v1h-1v4h-4v1h-1v-1h-2v-1h1v-1h1v-2h-1v-1h1v-1h3v-2h1v-2h-1v-2h2zM28 14h1v2h1v-1h1v3h1v1h' +
                    '-1v1h-2v-1h1v-2h-2zM1 15h1v1h1v1h-2zM8 16h1v1h-1zM22 16h1v1h-1zM32 16h4v1h-3v1h-1zM3 17h3v1h-1v1h-4v-1h2zM7' +
                    ' 17h1v1h-1zM21 17h1v1h-1zM23 17h1v1h-1zM8 18h1v1h1v1h2v2h-2v1h1v1h-1v2h-4v1h3v1h-3v1h-1v1h1v1h-1v2h3v1h' +
                    '-1v1h-1v-1h-2v-2h-2v1h-1v-5h2v3h1v-3h1v-4h-1v1h-2v-1h1v-1h1v-2h1v-2h1v2h2v-1h-1v-1h1zM11 18h2v1h-2zM22' +
                    ' 18h1v1h-1zM40 18h1v1h-1zM42 18h1v1h1v4h1v1h1v1h-3v1h-4v1h-1v1h2v1h-1v1h-1v-1h-2v-1h1v-1h-1v-1h1v-3h-1v' +
                    '-1h1v-1h1v-1h1v1h2v-1h1zM14 19h1v1h-1zM32 19h1v1h1v1h-1v2h-2v-3h1zM35 19h1v1h-1zM2 20h1v1h-1zM13' +
                    ' 20h1v3h-1zM17 20h1v1h-1zM45 20h1v1h-1zM27 21h1v1h-1zM34 21h1v1h-1zM1 22h1v1h-1zM6 22v3h3v-3zM17' +
                    ' 22h1v1h-1zM22 22v3h3v-3zM38 22v3h3v-3zM45 22h1v1h-1zM7 23h1v1h-1zM12 23h1v1h-1zM15' +
                    ' 23h2v2h2v1h-1v2h-1v1h-2v-1h1v-1h-1v1h-2v-1h1v-1h-1v-1h1v-1h1zM18 23h1v1h-1zM23 23h1v1h-1zM27' +
                    ' 23h4v2h2v3h2v1h-3v-2h-1v2h1v1h1v1h1v1h1v1h-2v1h1v2h1v-1h1v1h2v-1h-2v-1h1v-1h2v-1h2v2h-2v3h1v-' +
                    '2h1v1h1v-1h1v1h1v2h1v-1h1v2h-1v1h1v3h-1v1h-1v-1h-1v-1h1v-1h-2v1h-5v1h-1v-2h1v-4h-4v-1h-1v-1h-' +
                    '1v1h1v1h1v1h1v1h-1v1h1v1h-1v1h1v1h-3v1h1v1h-3v1h-4v-1h3v-1h-1v-1h1v-1h-1v-3h2v-1h1v-2h-2v1h-1v-' +
                    '2h1v-3h2v1h-1v2h1v-1h2v-1h-1v-1h1v-1h-1v-1h-1v-1h-1v-2h1v-2h-2v-1h-1zM33 23h3v3h-1v-2h-1v1h-1zM39' +
                    ' 23h1v1h-1zM42 23v1h1v-1zM11 24h1v2h-1zM15 25v1h1v-1zM3 26h1v1h-1zM10 26h1v1h-1zM43 26h1v1h-1zM45' +
                    ' 26h1v1h-1zM26 27h2v1h-1v1h-1v1h1v2h-1v-1h-1v-1h-1v-1h-1v-1h3zM35 27h1v1h-1zM42 27h1v1h1v-1h1v1h1v1h' +
                    '-1v1h-1v-1h-1v2h2v1h-1v1h-1v-1h-1v-2h-1v-1h1zM9 28h2v1h1v1h-2v-1h-1zM12 28h1v1h-1zM19 28h1v1h-1zM7' +
                    ' 29h2v1h1v1h-2v-1h-1zM13 29h2v1h-2zM17 29h2v2h-1v-1h-1zM27 29h1v1h-1zM12 30h1v1h-1zM15' +
                    ' 30h2v1h1v1h1v1h-2v1h-1v-1h-1v1h1v1h1v2h2v-2h1v1h1v-1h-1v-1h1v-1h1v1h2v-1h-1v-1h3v1h-1v2h-2v1h' +
                    '-1v1h1v-1h3v1h1v2h-1v3h-3v1h-1v-1h-1v-2h-1v-1h-1v-1h-2v1h1v3h-2v-1h1v-1h-1v1h-1v-1h-1v-3h-1v1h' +
                    '-1v1h-3v-1h-2v-1h2v-1h-2v-1h2v-1h1v1h1v-1h2v1h-1v1h-1v1h1v-1h1v-1h1v1h1v1h1v-1h-1v-1h-1v-1h-1v' +
                    '-1h-2v1h-1v-1h-2v-1h3v-1h1v1h1v-1h1v1h2v-1h-1zM28 30h2v1h-2zM34 30h1v1h-1zM45 30h1v1h-1zM6' +
                    ' 31h2v1h-2zM30 31h1v1h-1zM35 31h1v1h-1zM37 31h2v1h-2zM19 33h1v1h-1zM35 33h1v1h-1zM42 33h1v1h-1zM45 33h1v1h-1zM17' +
                    ' 34h2v1h-2zM43 34h2v2h-1v-1h-1zM5 35h1v3h-2v-1h-2v-1h3zM1 37h1v1h-1zM42 37v3h1v-3zM22 38v3h3v-3zM38 38v3h3v-3zM1' +
                    ' 39h7v7h-7zM12 39h1v1h1v1h-3v-1h1zM23 39h1v1h-1zM30 39v2h-1v2h1v-1h2v-1h-1v-2zM34 39h2v1h-2zM39 39h1v1h-1zM2' +
                    ' 40v5h5v-5zM9 40h1v1h1v1h5v2h-1v-1h-1v1h-1v-1h-1v1h-3zM3 41h3v3h-3zM34 41h1v1h-1zM18 42h1v1h-1zM26 42h1v1h-1zM17' +
                    ' 43h1v1h-1zM19 43h2v1h-1v1h-1zM23 43h3v1h-1v1h-1v1h-2v-1h1zM34 43h2v1h-1v1h-1zM37 43h3v1h-2v1h2v1h-3v-1h-1v-1h1zM12' +
                    ' 44h1v1h-1zM14 44h1v1h1v1h-2zM21 44h1v1h-1zM40 44h1v1h-1zM42 44h2v1h-2zM9 45h3v1h-3zM20 45h1v1h-1zM32' +
                    ' 45h1v1h-1zM35 45h1v1h-1zM44 45h1v1h-1z"/></svg>');
                done();
            });
    });

    test('- `U2F.qrCode()` must return a png in Buffer format', (done) => {
        U2F.qrCode('text', { type: 'png' }).subscribe(_ => {
            expect(Buffer.isBuffer(_)).toBeTruthy();
            done();
        });
    });

    test('- `U2F.qrCode()` must return a png in Buffer format with specific size', (done) => {
        U2F.qrCode('text', { type: 'png', size: 3 }).subscribe(_ => {
            expect(Buffer.isBuffer(_)).toBeTruthy();
            done();
        });
    });
});
