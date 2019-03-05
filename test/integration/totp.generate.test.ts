import { TOTP } from '../../src';

describe('- Integration totp.generate.test.ts file (http://tools.ietf.org/html/rfc6238#page-15)', () => {
    /**
     * Test if TOTP.generate() returns good value with good parameters
     */
    test('- `TOTP.generate()` - key => \'12345678901234567890\' and options => ' +
        '{key_format:\'str\', time:30, timestamp:59000, code_digits:8, add_checksum:false, truncation_offset: -1, ' +
        'algorithm:\'SHA1\'}', (done) => {
        TOTP.generate('12345678901234567890', { timestamp: 59000, code_digits: 8, algorithm: 'SHA1' }).subscribe(_ => {
            expect(_).toBe('94287082');
            done();
        });
    });

    test('- `TOTP.generate()` - key => \'3132333435363738393031323334353637383930313233343536373839303132\' and options => ' +
        '{key_format:\'hex\', time:30, timestamp:1111111111000, code_digits:8, add_checksum:false, truncation_offset: -1, ' +
        'algorithm:\'SHA256\'}', (done) => {
        TOTP.generate('3132333435363738393031323334353637383930313233343536373839303132',
            { key_format: 'hex', timestamp: 1111111111000, code_digits: 8, algorithm: 'SHA256' }).subscribe(_ => {
            expect(_).toBe('67062674');
            done();
        });
    });

    test('- `TOTP.generate()` - key => \'313233343536373839303132333435363738393031323334353637383930' +
        '31323334353637383930313233343536373839303132333435363738393031323334\' and options => ' +
        '{key_format:\'hex\', time:30, timestamp:20000000000000, code_digits:8, add_checksum:false, truncation_offset: -1, ' +
        'algorithm:\'SHA512\'}', (done) => {
        TOTP.generate('313233343536373839303132333435363738393031323334353637383930313233343536373' +
            '83930313233343536373839303132333435363738393031323334',
            { key_format: 'hex', timestamp: 20000000000000, code_digits: 8 }).subscribe(_ => {
            expect(_).toBe('47863826');
            done();
        });
    });
});
