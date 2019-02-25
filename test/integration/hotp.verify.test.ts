import { HOTP } from '../../src';

describe('- Integration hotp.verify.test.ts file (http://tools.ietf.org/html/rfc4226#page-32)', () => {
    /**
     * Test if HOTP.verify() returns good value with good parameters
     */
    test('- `HOTP.verify()` - token => \'755224\' , key => \'3132333435363738393031323334353637383930\' and options => ' +
        '{key_format:\'hex\', window:50, counter:\'0\', counter_format:\'hex\', add_checksum:false, truncation_offset: -1, ' +
        'algorithm:\'sha1\', previous_otp_allowed:false}', (done) => {
        HOTP.verify('755224', '3132333435363738393031323334353637383930', {
            key_format: 'hex',
            counter: '0',
            counter_format: 'hex',
            algorithm: 'sha1'
        }).subscribe(_ => {
            expect(_).toEqual({
                delta: '0000000000000000',
                delta_format: 'hex'
            });
            done();
        });
    });

    test('- `HOTP.verify()` - token => \'755224\' , key => \'12345678901234567890\' and options => ' +
        '{key_format:\'str\', window:50, counter:0, counter_format:\'int\', add_checksum:false, truncation_offset: -1, ' +
        'algorithm:\'sha1\', previous_otp_allowed:false}', (done) => {
        HOTP.verify('755224', '12345678901234567890', {
            algorithm: 'sha1'
        }).subscribe(_ => {
            expect(_).toEqual({
                delta: 0,
                delta_format: 'int'
            });
            done();
        });
    });

    test('- `HOTP.verify()` - token => \'520489\' , key => \'12345678901234567890\' and options => ' +
        '{key_format:\'str\', window:50, counter:0, counter_format:\'int\', add_checksum:false, truncation_offset: -1, ' +
        'algorithm:\'sha1\', previous_otp_allowed:false}', (done) => {
        HOTP.verify('520489', '12345678901234567890', {
            algorithm: 'sha1'
        }).subscribe(_ => {
            expect(_).toEqual({
                delta: 9,
                delta_format: 'int'
            });
            done();
        });
    });

    test('- `HOTP.verify()` - token => \'338314\' , key => \'3132333435363738393031323334353637383930\' and options => ' +
        '{key_format:\'hex\', window:50, counter:\'0\', counter_format:\'hex\', add_checksum:false, truncation_offset: -1, ' +
        'algorithm:\'sha1\', previous_otp_allowed:false}', (done) => {
        HOTP.verify('338314', '3132333435363738393031323334353637383930', {
            key_format: 'hex',
            counter: '0',
            counter_format: 'hex',
            algorithm: 'sha1'
        }).subscribe(_ => {
            expect(_).toEqual({
                delta: '0000000000000004',
                delta_format: 'hex'
            });
            done();
        });
    });

    test('- `HOTP.verify()` - token => \'755224\' , key => \'12345678901234567890\' and options => ' +
        '{key_format:\'str\', window:50, counter:4, counter_format:\'int\', add_checksum:false, truncation_offset: -1, ' +
        'algorithm:\'sha1\', previous_otp_allowed:false}', (done) => {
        HOTP.verify('755224', '12345678901234567890', {
            counter: 4,
            algorithm: 'sha1'
        }).subscribe(() => undefined, error => {
            expect(error.message).toBe('The token \'755224\' doesn\'t match for the given paramaters');
            done();
        });
    });

    test('- `HOTP.verify()` - token => \'755224\' , key => \'12345678901234567890\' and options => ' +
        '{key_format:\'str\', window:50, counter:9, counter_format:\'int\', add_checksum:false, truncation_offset: -1, ' +
        'algorithm:\'sha1\', previous_otp_allowed:true}', (done) => {
        HOTP.verify('755224', '12345678901234567890', {
            counter: 9,
            algorithm: 'sha1',
            previous_otp_allowed: true
        }).subscribe(_ => {
            expect(_).toEqual({
                delta: -9,
                delta_format: 'int'
            });
            done();
        });
    });

    test('- `HOTP.verify()` - token => \'338314\' , key => \'3132333435363738393031323334353637383930\' and options => ' +
        '{key_format:\'hex\', window:50, counter:\'0\', counter_format:\'hex\', add_checksum:false, truncation_offset: 10, ' +
        'algorithm:\'sha1\', previous_otp_allowed:false}', (done) => {
        HOTP.verify('338314', '3132333435363738393031323334353637383930', {
            key_format: 'hex',
            counter: '0',
            counter_format: 'hex',
            algorithm: 'sha1',
            truncation_offset: 10
        }).subscribe(() => undefined, error => {
            expect(error.message).toBe('The token \'338314\' doesn\'t match for the given paramaters');
            done();
        });
    });

    test('- `HOTP.verify()` - token => \'755224\' , key => \'3132333435363738393031323334353637383930\' and options => ' +
        '{key_format:\'hex\', window:9, counter:\'0000000000000009\', counter_format:\'hex\', add_checksum:false, truncation_offset: -1, ' +
        'algorithm:\'sha1\', previous_otp_allowed:true}', (done) => {
        HOTP.verify('755224', '3132333435363738393031323334353637383930', {
            key_format: 'hex',
            counter: '0000000000000009',
            counter_format: 'hex',
            algorithm: 'sha1',
            window: 9,
            previous_otp_allowed: true
        }).subscribe(_ => {
            expect(_).toEqual({
                delta: '-0000000000000009',
                delta_format: 'hex'
            });
            done();
        });
    });

    test('- `HOTP.verify()` - token => \'1964319491\' , key => \'8D379B1811FCB786727DDEEDAB5DED1092EC8D60\' and options => ' +
        '{key_format:\'hex\', window:300, counter:\'7DE1ED09E1AE8F1E\', counter_format:\'hex\', ' +
        'add_checksum:false, truncation_offset: -1, algorithm:\'sha1\', previous_otp_allowed:false}', (done) => {
        HOTP.verify('1964319491', '8D379B1811FCB786727DDEEDAB5DED1092EC8D60', {
            key_format: 'hex',
            counter: '7DE1ED09E1AE8F1E',
            counter_format: 'hex',
            algorithm: 'sha1',
            window: 300
        }).subscribe(_ => {
            expect(_).toEqual({
                delta: '00000000000000F2',
                delta_format: 'hex'
            });
            done();
        });
    });
});
