import { Observable } from 'rxjs';
import { U2F } from '../../src';

describe('- Unit u2f.generate.test.ts file', () => {
  /**
   * Test if U2F.generateAuthToken() function returns an Observable
   */
  test('- `U2F.generateAuthToken()` must return an `Observable`', (done) => {
    expect(U2F.generateAuthToken(undefined)).toBeInstanceOf(Observable);
    done();
  });

  /**
   * Test if U2F.generateAuthToken() function returns an error if key isn't set
   */
  test('- `U2F.generateAuthToken()` must return an error if key isn\'t set', (done) => {
    U2F.generateAuthToken(undefined)
      .subscribe({
        error: error => {
          expect(error.message).toBe('Cannot read properties of undefined (reading \'replace\')');
          done();
        }
      });
  });

  /**
   * Test if U2F.generateAuthToken() function returns an error if key is an empty string
   */
  test('- `U2F.generateAuthToken()` must return an error if key is an empty string', (done) => {
    U2F.generateAuthToken('')
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/key must match pattern "^[A-Fa-f0-9]{2,}$"');
          done();
        }
      });
  });

  /**
   * Test if U2F.generateAuthToken() function returns an error if time isn't a number
   */
  test('- `U2F.generateAuthToken()` must return an error if time isn\'t a number', (done) => {
    U2F.generateAuthToken('RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5', { time: null })
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/time must be number');
          done();
        }
      });
  });

  /**
   * Test if U2F.generateAuthToken() function returns an error if time value is less than 1
   */
  test('- `U2F.generateAuthToken()` must return an error if time value is less than 1', (done) => {
    U2F.generateAuthToken('RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5', { time: 0 })
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/time must be >= 1');
          done();
        }
      });
  });

  /**
   * Test if U2F.generateAuthToken() function returns an error if timestamp value isn't a number
   */
  test('- `U2F.generateAuthToken()` must return an error if timestamp value isn\'t a number', (done) => {
    U2F.generateAuthToken('RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5', { timestamp: null })
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/timestamp must be number');
          done();
        }
      });
  });

  /**
   * Test if U2F.generateAuthToken() function returns an error if code_digits isn't a number
   */
  test('- `U2F.generateAuthToken()` must return an error if code_digits isn\'t a number', (done) => {
    U2F.generateAuthToken('RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5', { code_digits: null })
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/code_digits must be number');
          done();
        }
      });
  });

  /**
   * Test if U2F.generateAuthToken() function returns an error if code_digits value is less than 1
   */
  test('- `U2F.generateAuthToken()` must return an error if code_digits value is less than 1', (done) => {
    U2F.generateAuthToken('RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5', { code_digits: 0 })
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/code_digits must be >= 1');
          done();
        }
      });
  });

  /**
   * Test if U2F.generateAuthToken() function returns an error if code_digits value is greater than 10
   */
  test('- `U2F.generateAuthToken()` must return an error if code_digits value is greater than 10', (done) => {
    U2F.generateAuthToken('RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5', { code_digits: 11 })
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/code_digits must be <= 10');
          done();
        }
      });
  });

  /**
   * Test if U2F.generateAuthToken() function returns an error if add_checksum isn't a boolean
   */
  test('- `U2F.generateAuthToken()` must return an error if add_checksum isn\'t a boolean', (done) => {
    U2F.generateAuthToken('RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5', { add_checksum: null })
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/add_checksum must be boolean');
          done();
        }
      });
  });

  /**
   * Test if U2F.generateAuthToken() function returns an error if truncation_offset isn't a number
   */
  test('- `U2F.generateAuthToken()` must return an error if truncation_offset isn\'t a number', (done) => {
    U2F.generateAuthToken('RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5', { truncation_offset: null })
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/truncation_offset must be number');
          done();
        }
      });
  });

  /**
   * Test if U2F.generateAuthToken() function returns an error if truncation_offset value is less than -1
   */
  test('- `U2F.generateAuthToken()` must return an error if truncation_offset value is less than -1', (done) => {
    U2F.generateAuthToken('RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5', { truncation_offset: -2 })
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/truncation_offset must be >= -1');
          done();
        }
      });
  });

  /**
   * Test if U2F.generateAuthToken() function returns an error if truncation_offset value is greater than 15
   */
  test('- `U2F.generateAuthToken()` must return an error if truncation_offset value is greater than 15', (done) => {
    U2F.generateAuthToken('RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5', { truncation_offset: 16 })
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/truncation_offset must be <= 15');
          done();
        }
      });
  });

  /**
   * Test if U2F.generateAuthToken() function returns an error if algorithm is wrong
   */
  test('- `U2F.generateAuthToken()` must return an error if algorithm is wrong', (done) => {
    U2F.generateAuthToken('RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5', { algorithm: null })
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/algorithm must be equal to one of the allowed values');
          done();
        }
      });
  });
});
