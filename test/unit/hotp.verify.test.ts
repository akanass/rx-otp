import { Observable } from 'rxjs';
import { HOTP } from '../../src';
import { HOTPGenerateValidatedData, Validator } from '../../src/lib/schemas';

describe('- Unit hotp.verify.test.ts file', () => {
  /**
   * Test if HOTP.verify() function returns an Observable
   */
  test('- `HOTP.verify()` must return an `Observable`', (done) => {
    expect(HOTP.verify(undefined, undefined)).toBeInstanceOf(Observable);
    done();
  });

  /**
   * Test if HOTP.verify() function returns an error if token isn't set
   */
  test('- `HOTP.verify()` must return an error if key isn\'t set', (done) => {
    HOTP.verify(undefined, undefined)
      .subscribe({
        error: error => {
          expect(error.message).toBe('data must have required property \'token\'');
          done();
        }
      });
  });

  /**
   * Test if HOTP.verify() function returns an error if token isn't a string
   */
  test('- `HOTP.verify()` must return an error if token isn\'t a string', (done) => {
    HOTP.verify(null, 'A')
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/token must be string');
          done();
        }
      });
  });

  /**
   * Test if HOTP.verify() function returns an error if token has wrong value
   */
  test('- `HOTP.verify()` must return an error if token has wrong value', (done) => {
    HOTP.verify('', 'A')
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/token must match pattern "^[0-9]{1,11}$"');
          done();
        }
      });
  });

  /**
   * Test if HOTP.verify() function returns an error if key isn't set
   */
  test('- `HOTP.verify()` must return an error if key isn\'t set', (done) => {
    HOTP.verify('123456', undefined)
      .subscribe({
        error: error => {
          expect(error.message).toBe('data must have required property \'key\'');
          done();
        }
      });
  });

  /**
   * Test if HOTP.verify() function returns an error if key isn't a string
   */
  test('- `HOTP.verify()` must return an error if key isn\'t a string', (done) => {
    HOTP.verify('123456', null)
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/key must be string');
          done();
        }
      });
  });

  /**
   * Test if HOTP.verify() function returns an error if key is an empty string
   */
  test('- `HOTP.verify()` must return an error if key is an empty string', (done) => {
    HOTP.verify('123456', '')
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/key must NOT have fewer than 1 characters');
          done();
        }
      });
  });

  /**
   * Test if HOTP.verify() function returns an error if key_format is wrong
   */
  test('- `HOTP.verify()` must return an error if key_format is wrong', (done) => {
    HOTP.verify('123456', 'AA', { key_format: null })
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/key_format must be equal to one of the allowed values');
          done();
        }
      });
  });

  /**
   * Test if HOTP.verify() function returns an error if key has a wrong hex value
   */
  test('- `HOTP.verify()` must return an error if key has a wrong hex value', (done) => {
    HOTP.verify('123456', 'A', { key_format: 'hex' })
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/key must match pattern "^[A-Fa-f0-9]{2,}$"');
          done();
        }
      });
  });

  /**
   * Test if HOTP.verify() function returns an error if window isn't a number
   */
  test('- `HOTP.verify()` must return an error if window isn\'t a number', (done) => {
    HOTP.verify('123456', 'secret key', { window: null })
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/window must be number');
          done();
        }
      });
  });

  /**
   * Test if HOTP.verify() function returns an error if window value is less than 0
   */
  test('- `HOTP.verify()` must return an error if window value is less than 0', (done) => {
    HOTP.verify('123456', 'secret key', { window: -1 })
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/window must be >= 0');
          done();
        }
      });
  });

  /**
   * Test if HOTP.verify() function returns an error if counter isn't a number
   */
  test('- `HOTP.verify()` must return an error if counter isn\'t a number', (done) => {
    HOTP.verify('123456', 'secret key', { counter: null })
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/counter must be number');
          done();
        }
      });
  });

  /**
   * Test if HOTP.verify() function returns an error if counter value is less than 0
   */
  test('- `HOTP.verify()` must return an error if counter value is less than 0', (done) => {
    HOTP.verify('123456', 'secret key', { counter: -1 })
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/counter must be >= 0');
          done();
        }
      });
  });

  /**
   * Test if HOTP.verify() function returns an error if counter_format is wrong
   */
  test('- `HOTP.verify()` must return an error if counter_format is wrong', (done) => {
    HOTP.verify('123456', 'secret key', { counter_format: null })
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/counter_format must be equal to one of the allowed values');
          done();
        }
      });
  });

  /**
   * Test if HOTP.verify() function returns an error if counter_format is wrong
   */
  test('- `HOTP.verify()` must return an error if counter has a wrong hex value', (done) => {
    HOTP.verify('123456', 'secret key', { counter: '00000000000000000', counter_format: 'hex' })
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/counter must match pattern "^[A-Fa-f0-9]{1,16}$"');
          done();
        }
      });
  });

  /**
   * Test if HOTP.verify() function returns an error if add_checksum isn't a boolean
   */
  test('- `HOTP.verify()` must return an error if add_checksum isn\'t a boolean', (done) => {
    HOTP.verify('123456', 'secret key', { add_checksum: null })
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/add_checksum must be boolean');
          done();
        }
      });
  });

  /**
   * Test if HOTP.verify() function returns an error if truncation_offset isn't a number
   */
  test('- `HOTP.verify()` must return an error if truncation_offset isn\'t a number', (done) => {
    HOTP.verify('123456', 'secret key', { truncation_offset: null })
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/truncation_offset must be number');
          done();
        }
      });
  });

  /**
   * Test if HOTP.verify() function returns an error if truncation_offset value is less than -1
   */
  test('- `HOTP.verify()` must return an error if truncation_offset value is less than -1', (done) => {
    HOTP.verify('123456', 'secret key', { truncation_offset: -2 })
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/truncation_offset must be >= -1');
          done();
        }
      });
  });

  /**
   * Test if HOTP.verify() function returns an error if truncation_offset value is greater than 15
   */
  test('- `HOTP.verify()` must return an error if truncation_offset value is greater than 15', (done) => {
    HOTP.verify('123456', 'secret key', { truncation_offset: 16 })
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/truncation_offset must be <= 15');
          done();
        }
      });
  });

  /**
   * Test if HOTP.verify() function returns an error if algorithm is wrong
   */
  test('- `HOTP.verify()` must return an error if algorithm is wrong', (done) => {
    HOTP.verify('123456', 'secret key', { algorithm: null })
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/algorithm must be equal to one of the allowed values');
          done();
        }
      });
  });

  /**
   * Test if HOTP.verify() function returns an error if previous_otp_allowed isn't a boolean
   */
  test('- `HOTP.verify()` must return an error if previous_otp_allowed isn\'t a boolean', (done) => {
    HOTP.verify('123456', 'secret key', { previous_otp_allowed: null })
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/previous_otp_allowed must be boolean');
          done();
        }
      });
  });

  /**
   * Test if Validator.validateDataWithSchemaReference() function returns all default values
   */
  test('- `Validator.validateDataWithSchemaReference()` must return all default values', (done) => {
    Validator.validateDataWithSchemaReference('/rx-otp/schemas/hotp-verify.json', {
      token: '123456',
      key: 'secret key'
    })
      .subscribe((_: HOTPGenerateValidatedData) => {
          expect(_).toEqual({
            token: '123456',
            key: 'secret key',
            key_format: 'str',
            window: 50,
            counter: 0,
            counter_format: 'int',
            add_checksum: false,
            truncation_offset: -1,
            algorithm: 'SHA512',
            previous_otp_allowed: false
          });
          done();
        }
      );
  });

  /**
   * Test if Validator.validateDataWithSchemaReference() function returns updated values
   */
  test('- `Validator.validateDataWithSchemaReference()` must return updated values', (done) => {
    Validator.validateDataWithSchemaReference('/rx-otp/schemas/hotp-verify.json', {
      token: '123456',
      key: '00000000',
      key_format: 'hex',
      window: 5,
      counter: 1,
      algorithm: 'SHA256',
      previous_otp_allowed: true
    })
      .subscribe((_: HOTPGenerateValidatedData) => {
          expect(_).toEqual({
            token: '123456',
            key: '00000000',
            key_format: 'hex',
            window: 5,
            counter: 1,
            counter_format: 'int',
            add_checksum: false,
            truncation_offset: -1,
            algorithm: 'SHA256',
            previous_otp_allowed: true
          });
          done();
        }
      );
  });
})
;
