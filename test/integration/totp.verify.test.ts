import { TOTP } from '../../src';

describe('- Integration totp.verify.test.ts file (http://tools.ietf.org/html/rfc6238#page-15)', () => {
    /**
     * Test if TOTP.verify() returns good value with good parameters
     */
    test('- `TOTP.verify()` - token => \'94287082\' , key => \'12345678901234567890\' and options => ' +
        '{key_format:\'str\', window:1, time:30, timestamp:59000, add_checksum:false, truncation_offset: -1, ' +
        'algorithm:\'SHA1\'}', (done) => {
        TOTP.verify('94287082', '12345678901234567890', {
            timestamp: 59000,
            algorithm: 'SHA1'
        }).subscribe(_ => {
            expect(_).toEqual({
                delta: 0,
                delta_format: 'int'
            });
            done();
        });
    });

    test('- `TOTP.verify()` - token => \'94287082\' , key => \'3132333435363738393031323334353637383930\' and options => ' +
        '{key_format:\'str\', window:1, time:30, timestamp:59000, add_checksum:false, truncation_offset: -1, ' +
        'algorithm:\'SHA1\'}', (done) => {
        TOTP.verify('94287082', '3132333435363738393031323334353637383930', {
            key_format: 'hex',
            timestamp: 59000,
            algorithm: 'SHA1'
        }).subscribe(_ => {
            expect(_).toEqual({
                delta: 0,
                delta_format: 'int'
            });
            done();
        });
    });

    test('- `TOTP.verify()` - token => \'94287082\' , key => \'12345678901234567890\' and options => ' +
        '{key_format:\'str\', window:1, time:30, timestamp:59000, add_checksum:false, truncation_offset: 10, ' +
        'algorithm:\'SHA1\'}', (done) => {
        TOTP.verify('94287082', '12345678901234567890', {
            timestamp: 59000,
            truncation_offset: 10,
            algorithm: 'SHA1'
        }).subscribe(_ => undefined, error => {
            expect(error.message).toBe('The token \'94287082\' doesn\'t match for the given paramaters');
            done();
        });
    });
});
