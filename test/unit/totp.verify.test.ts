import { Observable } from 'rxjs';
import { TOTP } from '../../src';
import { TOTPVerifyValidatedData, Validator } from '../../src/lib/schemas';

describe('- Unit totp.verify.test.ts file', () => {
  /**
   * Test if TOTP.verify() function returns an Observable
   */
  test('- `TOTP.verify()` must return an `Observable`', (done) => {
    expect(TOTP.verify(undefined, undefined)).toBeInstanceOf(Observable);
    done();
  });

  /**
   * Test if TOTP.verify() function returns an error if token isn't set
   */
  test('- `TOTP.verify()` must return an error if key isn\'t set', (done) => {
    TOTP.verify(undefined, 'A')
      .subscribe({
        error: error => {
          expect(error.message).toBe('data must have required property \'token\'');
          done();
        }
      });
  });

  /**
   * Test if TOTP.verify() function returns an error if token isn't a string
   */
  test('- `TOTP.verify()` must return an error if token isn\'t a string', (done) => {
    TOTP.verify(null, 'A')
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/token must be string');
          done();
        }
      });
  });

  /**
   * Test if TOTP.verify() function returns an error if token has wrong value
   */
  test('- `TOTP.verify()` must return an error if token has wrong value', (done) => {
    TOTP.verify('', 'A')
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/token must match pattern "^[0-9]{1,11}$"');
          done();
        }
      });
  });

  /**
   * Test if TOTP.verify() function returns an error if key isn't set
   */
  test('- `TOTP.verify()` must return an error if key isn\'t set', (done) => {
    TOTP.verify('123456', undefined)
      .subscribe({
        error: error => {
          expect(error.message).toBe('data must have required property \'key\'');
          done();
        }
      });
  });

  /**
   * Test if TOTP.verify() function returns an error if key isn't a string
   */
  test('- `TOTP.verify()` must return an error if key isn\'t a string', (done) => {
    TOTP.verify('123456', null)
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/key must be string');
          done();
        }
      });
  });

  /**
   * Test if TOTP.verify() function returns an error if key is an empty string
   */
  test('- `TOTP.verify()` must return an error if key is an empty string', (done) => {
    TOTP.verify('123456', '')
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/key must NOT have fewer than 1 characters');
          done();
        }
      });
  });

  /**
   * Test if TOTP.verify() function returns an error if key_format is wrong
   */
  test('- `TOTP.verify()` must return an error if key_format is wrong', (done) => {
    TOTP.verify('123456', 'AA', { key_format: null })
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/key_format must be equal to one of the allowed values');
          done();
        }
      });
  });

  /**
   * Test if TOTP.verify() function returns an error if key has a wrong hex value
   */
  test('- `TOTP.verify()` must return an error if key has a wrong hex value', (done) => {
    TOTP.verify('123456', 'A', { key_format: 'hex' })
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/key must match pattern "^[A-Fa-f0-9]{2,}$"');
          done();
        }
      });
  });

  /**
   * Test if TOTP.verify() function returns an error if window isn't a number
   */
  test('- `TOTP.verify()` must return an error if window isn\'t a number', (done) => {
    TOTP.verify('123456', 'secret key', { window: null })
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/window must be number');
          done();
        }
      });
  });

  /**
   * Test if TOTP.verify() function returns an error if window value is less than 0
   */
  test('- `TOTP.verify()` must return an error if window value is less than 0', (done) => {
    TOTP.verify('123456', 'secret key', { window: -1 })
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/window must be >= 0');
          done();
        }
      });
  });

  /**
   * Test if TOTP.verify() function returns an error if time isn't a number
   */
  test('- `TOTP.verify()` must return an error if time isn\'t a number', (done) => {
    TOTP.verify('123456', 'secret key', { time: null })
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/time must be number');
          done();
        }
      });
  });

  /**
   * Test if TOTP.verify() function returns an error if time value is less than 1
   */
  test('- `TOTP.verify()` must return an error if time value is less than 1', (done) => {
    TOTP.verify('123456', 'secret key', { time: 0 })
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/time must be >= 1');
          done();
        }
      });
  });

  /**
   * Test if TOTP.verify() function returns an error if timestamp value isn't a number
   */
  test('- `TOTP.verify()` must return an error if timestamp value isn\'t a number', (done) => {
    TOTP.verify('123456', 'secret key', { timestamp: null })
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/timestamp must be number');
          done();
        }
      });
  });

  /**
   * Test if TOTP.verify() function returns an error if add_checksum isn't a boolean
   */
  test('- `TOTP.verify()` must return an error if add_checksum isn\'t a boolean', (done) => {
    TOTP.verify('123456', 'secret key', { add_checksum: null })
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/add_checksum must be boolean');
          done();
        }
      });
  });

  /**
   * Test if TOTP.verify() function returns an error if truncation_offset isn't a number
   */
  test('- `TOTP.verify()` must return an error if truncation_offset isn\'t a number', (done) => {
    TOTP.verify('123456', 'secret key', { truncation_offset: null })
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/truncation_offset must be number');
          done();
        }
      });
  });

  /**
   * Test if TOTP.verify() function returns an error if truncation_offset value is less than -1
   */
  test('- `TOTP.verify()` must return an error if truncation_offset value is less than -1', (done) => {
    TOTP.verify('123456', 'secret key', { truncation_offset: -2 })
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/truncation_offset must be >= -1');
          done();
        }
      });
  });

  /**
   * Test if TOTP.verify() function returns an error if truncation_offset value is greater than 15
   */
  test('- `TOTP.verify()` must return an error if truncation_offset value is greater than 15', (done) => {
    TOTP.verify('123456', 'secret key', { truncation_offset: 16 })
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/truncation_offset must be <= 15');
          done();
        }
      });
  });

  /**
   * Test if TOTP.verify() function returns an error if algorithm is wrong
   */
  test('- `TOTP.verify()` must return an error if algorithm is wrong', (done) => {
    TOTP.verify('123456', 'secret key', { algorithm: null })
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/algorithm must be equal to one of the allowed values');
          done();
        }
      });
  });

  /**
   * Test if Validator.validateDataWithSchemaReference() function returns all default values
   */
  test('- `Validator.validateDataWithSchemaReference()` must return all default values', (done) => {
      Validator.validateDataWithSchemaReference('/rx-otp/schemas/totp-verify.json', {
        token: '123456',
        key: 'secret key'
      })
        .subscribe((_: TOTPVerifyValidatedData) => {
          expect(_.token).toEqual('123456');
          expect(_.key).toEqual('secret key');
          expect(_.key_format).toEqual('str');
          expect(_.window).toEqual(1);
          expect(_.time).toEqual(30);
          expect(typeof _.timestamp).toEqual('number');
          expect(_.add_checksum).toEqual(false);
          expect(_.truncation_offset).toEqual(-1);
          expect(_.algorithm).toEqual('SHA512');
          done();
        });
    }
  );

  /**
   * Test if Validator.validateDataWithSchemaReference() function returns updated values
   */
  test('- `Validator.validateDataWithSchemaReference()` must return updated values', (done) => {
      Validator.validateDataWithSchemaReference('/rx-otp/schemas/totp-verify.json',
        {
          token: '123456',
          key: '00000000',
          key_format: 'hex',
          window: 50,
          time: 1,
          timestamp: 1551278559229,
          algorithm: 'SHA256'
        })
        .subscribe((_: TOTPVerifyValidatedData) => {
          expect(_).toEqual({
            token: '123456',
            key: '00000000',
            key_format: 'hex',
            window: 50,
            time: 1,
            timestamp: 1551278559229,
            add_checksum: false,
            truncation_offset: -1,
            algorithm: 'SHA256'
          });
          done();
        });
    }
  );
});
