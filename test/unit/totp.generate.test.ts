import { Observable } from 'rxjs';
import { TOTP, TOTPGenerateValidatedData } from '../../src';
import { Validator } from '../../src/lib/schemas/validator';

describe('- Unit totp.generate.test.ts file', () => {
  /**
   * Test if TOTP.generate() function returns an Observable
   */
  test('- `TOTP.generate()` must return an `Observable`', (done) => {
    expect(TOTP.generate(undefined)).toBeInstanceOf(Observable);
    done();
  });

  /**
   * Test if TOTP.generate() function returns an error if key isn't set
   */
  test('- `TOTP.generate()` must return an error if key isn\'t set', (done) => {
    TOTP.generate(undefined)
      .subscribe({
        error: error => {
          expect(error.message).toBe('data must have required property \'key\'');
          done();
        }
      });
  });

  /**
   * Test if TOTP.generate() function returns an error if key isn't a string
   */
  test('- `TOTP.generate()` must return an error if key isn\'t a string', (done) => {
    TOTP.generate(null)
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/key must be string');
          done();
        }
      });
  });

  /**
   * Test if TOTP.generate() function returns an error if key is an empty string
   */
  test('- `TOTP.generate()` must return an error if key is an empty string', (done) => {
    TOTP.generate('')
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/key must NOT have fewer than 1 characters');
          done();
        }
      });
  });

  /**
   * Test if TOTP.generate() function returns an error if key_format is wrong
   */
  test('- `TOTP.generate()` must return an error if key_format is wrong', (done) => {
    TOTP.generate('AA', { key_format: null })
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/key_format must be equal to one of the allowed values');
          done();
        }
      });
  });

  /**
   * Test if TOTP.generate() function returns an error if key has a wrong hex value
   */
  test('- `TOTP.generate()` must return an error if key has a wrong hex value', (done) => {
    TOTP.generate('A', { key_format: 'hex' })
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/key must match pattern "^[A-Fa-f0-9]{2,}$"');
          done();
        }
      });
  });

  /**
   * Test if TOTP.generate() function returns an error if time isn't a number
   */
  test('- `TOTP.generate()` must return an error if time isn\'t a number', (done) => {
    TOTP.generate('secret key', { time: null })
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/time must be number');
          done();
        }
      });
  });

  /**
   * Test if TOTP.generate() function returns an error if time value is less than 1
   */
  test('- `TOTP.generate()` must return an error if time value is less than 1', (done) => {
    TOTP.generate('secret key', { time: 0 })
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/time must be >= 1');
          done();
        }
      });
  });

  /**
   * Test if TOTP.generate() function returns an error if timestamp value isn't a number
   */
  test('- `TOTP.generate()` must return an error if timestamp value isn\'t a number', (done) => {
    TOTP.generate('secret key', { timestamp: null })
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/timestamp must be number');
          done();
        }
      });
  });

  /**
   * Test if TOTP.generate() function returns an error if code_digits isn't a number
   */
  test('- `TOTP.generate()` must return an error if code_digits isn\'t a number', (done) => {
    TOTP.generate('secret key', { code_digits: null })
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/code_digits must be number');
          done();
        }
      });
  });

  /**
   * Test if TOTP.generate() function returns an error if code_digits value is less than 1
   */
  test('- `TOTP.generate()` must return an error if code_digits value is less than 1', (done) => {
    TOTP.generate('secret key', { code_digits: 0 })
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/code_digits must be >= 1');
          done();
        }
      });
  });

  /**
   * Test if TOTP.generate() function returns an error if code_digits value is greater than 10
   */
  test('- `TOTP.generate()` must return an error if code_digits value is greater than 10', (done) => {
    TOTP.generate('secret key', { code_digits: 11 })
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/code_digits must be <= 10');
          done();
        }
      });
  });

  /**
   * Test if TOTP.generate() function returns an error if add_checksum isn't a boolean
   */
  test('- `TOTP.generate()` must return an error if add_checksum isn\'t a boolean', (done) => {
    TOTP.generate('secret key', { add_checksum: null })
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/add_checksum must be boolean');
          done();
        }
      });
  });

  /**
   * Test if TOTP.generate() function returns an error if truncation_offset isn't a number
   */
  test('- `TOTP.generate()` must return an error if truncation_offset isn\'t a number', (done) => {
    TOTP.generate('secret key', { truncation_offset: null })
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/truncation_offset must be number');
          done();
        }
      });
  });

  /**
   * Test if TOTP.generate() function returns an error if truncation_offset value is less than -1
   */
  test('- `TOTP.generate()` must return an error if truncation_offset value is less than -1', (done) => {
    TOTP.generate('secret key', { truncation_offset: -2 })
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/truncation_offset must be >= -1');
          done();
        }
      });
  });

  /**
   * Test if TOTP.generate() function returns an error if truncation_offset value is greater than 15
   */
  test('- `TOTP.generate()` must return an error if truncation_offset value is greater than 15', (done) => {
    TOTP.generate('secret key', { truncation_offset: 16 })
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/truncation_offset must be <= 15');
          done();
        }
      });
  });

  /**
   * Test if TOTP.generate() function returns an error if algorithm is wrong
   */
  test('- `TOTP.generate()` must return an error if algorithm is wrong', (done) => {
    TOTP.generate('secret key', { algorithm: null })
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
      Validator.validateDataWithSchemaReference('/rx-otp/schemas/totp-generate.json', { key: 'secret key' })
        .subscribe((_: TOTPGenerateValidatedData) => {
          expect(_.key).toEqual('secret key');
          expect(_.key_format).toEqual('str');
          expect(_.time).toEqual(30);
          expect(typeof _.timestamp).toEqual('number');
          expect(_.code_digits).toEqual(6);
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
      Validator.validateDataWithSchemaReference('/rx-otp/schemas/totp-generate.json',
        {
          key: '00000000',
          key_format: 'hex',
          time: 1,
          timestamp: 1551278559229,
          code_digits: 10,
          algorithm: 'SHA256'
        })
        .subscribe((_: TOTPGenerateValidatedData) => {
          expect(_).toEqual({
            key: '00000000',
            key_format: 'hex',
            time: 1,
            timestamp: 1551278559229,
            code_digits: 10,
            add_checksum: false,
            truncation_offset: -1,
            algorithm: 'SHA256'
          });
          done();
        });
    }
  );
});
