import { Observable } from 'rxjs';
import { HOTP, HOTPGenerateValidatedData } from '../../src';
import { Validator } from '../../src/lib/schemas/validator';

describe('- Unit hotp.generate.test.ts file', () => {
  /**
   * Test if HOTP.generate() function returns an Observable
   */
  test('- `HOTP.generate()` must return an `Observable`', (done) => {
    expect(HOTP.generate(undefined)).toBeInstanceOf(Observable);
    done();
  });

  /**
   * Test if HOTP.generate() function returns an error if key isn't set
   */
  test('- `HOTP.generate()` must return an error if key isn\'t set', (done) => {
    HOTP.generate(undefined)
      .subscribe({
        error: error => {
          expect(error.message).toBe('data must have required property \'key\'');
          done();
        }
      });
  });

  /**
   * Test if HOTP.generate() function returns an error if key isn't a string
   */
  test('- `HOTP.generate()` must return an error if key isn\'t a string', (done) => {
    HOTP.generate(null)
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/key must be string');
          done();
        }
      });
  });

  /**
   * Test if HOTP.generate() function returns an error if key is an empty string
   */
  test('- `HOTP.generate()` must return an error if key is an empty string', (done) => {
    HOTP.generate('')
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/key must NOT have fewer than 1 characters');
          done();
        }
      });
  });

  /**
   * Test if HOTP.generate() function returns an error if key_format is wrong
   */
  test('- `HOTP.generate()` must return an error if key_format is wrong', (done) => {
    HOTP.generate('A', { key_format: null })
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/key must match pattern \"^[A-Fa-f0-9]{2,}$\"');
          done();
        }
      });
  });

  /**
   * Test if HOTP.generate() function returns an error if key has a wrong hex value
   */
  test('- `HOTP.generate()` must return an error if key has a wrong hex value', (done) => {
    HOTP.generate('A', { key_format: 'hex' })
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/key must match pattern "^[A-Fa-f0-9]{2,}$"');
          done();
        }
      });
  });

  /**
   * Test if HOTP.generate() function returns an error if counter isn't a number
   */
  test('- `HOTP.generate()` must return an error if counter isn\'t a number', (done) => {
    HOTP.generate('secret key', { counter: null })
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/counter must be number');
          done();
        }
      });
  });

  /**
   * Test if HOTP.generate() function returns an error if counter value is less than 0
   */
  test('- `HOTP.generate()` must return an error if counter value is less than 0', (done) => {
    HOTP.generate('secret key', { counter: -1 })
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/counter must be >= 0');
          done();
        }
      });
  });

  /**
   * Test if HOTP.generate() function returns an error if counter_format is wrong
   */
  test('- `HOTP.generate()` must return an error if counter_format is wrong', (done) => {
    HOTP.generate('secret key', { counter_format: null })
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/counter_format must be equal to one of the allowed values');
          done();
        }
      });
  });

  /**
   * Test if HOTP.generate() function returns an error if counter_format is wrong
   */
  test('- `HOTP.generate()` must return an error if counter has a wrong hex value', (done) => {
    HOTP.generate('secret key', { counter: '00000000000000000', counter_format: 'hex' })
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/counter must match pattern "^[A-Fa-f0-9]{1,16}$"');
          done();
        }
      });
  });

  /**
   * Test if HOTP.generate() function returns an error if code_digits isn't a number
   */
  test('- `HOTP.generate()` must return an error if code_digits isn\'t a number', (done) => {
    HOTP.generate('secret key', { code_digits: null })
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/code_digits must be number');
          done();
        }
      });
  });

  /**
   * Test if HOTP.generate() function returns an error if code_digits value is less than 1
   */
  test('- `HOTP.generate()` must return an error if code_digits value is less than 1', (done) => {
    HOTP.generate('secret key', { code_digits: 0 })
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/code_digits must be >= 1');
          done();
        }
      });
  });

  /**
   * Test if HOTP.generate() function returns an error if code_digits value is greater than 10
   */
  test('- `HOTP.generate()` must return an error if code_digits value is greater than 10', (done) => {
    HOTP.generate('secret key', { code_digits: 11 })
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/code_digits must be <= 10');
          done();
        }
      });
  });

  /**
   * Test if HOTP.generate() function returns an error if add_checksum isn't a boolean
   */
  test('- `HOTP.generate()` must return an error if add_checksum isn\'t a boolean', (done) => {
    HOTP.generate('secret key', { add_checksum: null })
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/add_checksum must be boolean');
          done();
        }
      });
  });

  /**
   * Test if HOTP.generate() function returns an error if truncation_offset isn't a number
   */
  test('- `HOTP.generate()` must return an error if truncation_offset isn\'t a number', (done) => {
    HOTP.generate('secret key', { truncation_offset: null })
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/truncation_offset must be number');
          done();
        }
      });
  });

  /**
   * Test if HOTP.generate() function returns an error if truncation_offset value is less than -1
   */
  test('- `HOTP.generate()` must return an error if truncation_offset value is less than -1', (done) => {
    HOTP.generate('secret key', { truncation_offset: -2 })
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/truncation_offset must be >= -1');
          done();
        }
      });
  });

  /**
   * Test if HOTP.generate() function returns an error if truncation_offset value is greater than 15
   */
  test('- `HOTP.generate()` must return an error if truncation_offset value is greater than 15', (done) => {
    HOTP.generate('secret key', { truncation_offset: 16 })
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/truncation_offset must be <= 15');
          done();
        }
      });
  });

  /**
   * Test if HOTP.generate() function returns an error if algorithm is wrong
   */
  test('- `HOTP.generate()` must return an error if algorithm is wrong', (done) => {
    HOTP.generate('secret key', { algorithm: null })
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/algorithm must be equal to one of the allowed values');
          done();
        }
      });
  });
});

/**
 * Test if Validator.validateDataWithSchemaReference() function returns all default values
 */
test('- `Validator.validateDataWithSchemaReference()` must return all default values', (done) => {
  Validator.validateDataWithSchemaReference('/rx-otp/schemas/hotp-generate.json', { key: 'secret key' })
    .subscribe((_: HOTPGenerateValidatedData) => {
        expect(_).toEqual({
          key: 'secret key',
          key_format: 'str',
          counter: 0,
          counter_format: 'int',
          code_digits: 6,
          add_checksum: false,
          truncation_offset: -1,
          algorithm: 'SHA512'
        });
        done();
      }
    );
});

/**
 * Test if Validator.validateDataWithSchemaReference() function returns updated values
 */
test('- `Validator.validateDataWithSchemaReference()` must return updated values', (done) => {
  Validator.validateDataWithSchemaReference('/rx-otp/schemas/hotp-generate.json', {
    key: '00000000',
    key_format: 'hex',
    counter: 1,
    code_digits: 10,
    algorithm: 'SHA256'
  })
    .subscribe((_: HOTPGenerateValidatedData) => {
        expect(_).toEqual({
          key: '00000000',
          key_format: 'hex',
          counter: 1,
          counter_format: 'int',
          code_digits: 10,
          add_checksum: false,
          truncation_offset: -1,
          algorithm: 'SHA256'
        });
        done();
      }
    );
});
