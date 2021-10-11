import { Observable } from 'rxjs';
import { U2F } from '../../src';

describe('- Unit u2f.verify.test.ts file', () => {
  /**
   * Test if U2F.verifyAuthToken() function returns an Observable
   */
  test('- `U2F.verifyAuthToken()` must return an `Observable`', (done) => {
    expect(U2F.verifyAuthToken(undefined, undefined)).toBeInstanceOf(Observable);
    done();
  });

  /**
   * Test if U2F.verifyAuthToken() function returns an error if token isn't set
   */
  test('- `U2F.verifyAuthToken()` must return an error if key isn\'t set', (done) => {
    U2F.verifyAuthToken(undefined, 'RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5')
      .subscribe({
        error: error => {
          expect(error.message).toBe('data must have required property \'token\'');
          done();
        }
      });
  });

  /**
   * Test if U2F.verifyAuthToken() function returns an error if token isn't a string
   */
  test('- `U2F.verifyAuthToken()` must return an error if token isn\'t a string', (done) => {
    U2F.verifyAuthToken(null, 'RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5')
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/token must be string');
          done();
        }
      });
  });

  /**
   * Test if U2F.verifyAuthToken() function returns an error if token has wrong value
   */
  test('- `U2F.verifyAuthToken()` must return an error if token has wrong value', (done) => {
    U2F.verifyAuthToken('', 'RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5')
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/token must match pattern "^[0-9]{1,11}$"');
          done();
        }
      });
  });

  /**
   * Test if U2F.verifyAuthToken() function returns an error if key isn't set
   */
  test('- `U2F.verifyAuthToken()` must return an error if key isn\'t set', (done) => {
    U2F.verifyAuthToken('123456', undefined)
      .subscribe({
        error: error => {
          expect(error.message).toBe('Cannot read properties of undefined (reading \'replace\')');
          done();
        }
      });
  });

  /**
   * Test if U2F.verifyAuthToken() function returns an error if key is an empty string
   */
  test('- `U2F.verifyAuthToken()` must return an error if key is an empty string', (done) => {
    U2F.verifyAuthToken('123456', '')
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/key must match pattern "^[A-Fa-f0-9]{2,}$"');
          done();
        }
      });
  });

  /**
   * Test if U2F.verifyAuthToken() function returns an error if window isn't a number
   */
  test('- `U2F.verifyAuthToken()` must return an error if window isn\'t a number', (done) => {
    U2F.verifyAuthToken('123456', 'RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5', { window: null })
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/window must be number');
          done();
        }
      });
  });

  /**
   * Test if U2F.verifyAuthToken() function returns an error if window value is less than 0
   */
  test('- `U2F.verifyAuthToken()` must return an error if window value is less than 0', (done) => {
    U2F.verifyAuthToken('123456', 'RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5', { window: -1 })
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/window must be >= 0');
          done();
        }
      });
  });

  /**
   * Test if U2F.verifyAuthToken() function returns an error if time isn't a number
   */
  test('- `U2F.verifyAuthToken()` must return an error if time isn\'t a number', (done) => {
    U2F.verifyAuthToken('123456', 'RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5', { time: null })
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/time must be number');
          done();
        }
      });
  });

  /**
   * Test if U2F.verifyAuthToken() function returns an error if time value is less than 1
   */
  test('- `U2F.verifyAuthToken()` must return an error if time value is less than 1', (done) => {
    U2F.verifyAuthToken('123456', 'RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5', { time: 0 })
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/time must be >= 1');
          done();
        }
      });
  });

  /**
   * Test if U2F.verifyAuthToken() function returns an error if timestamp value isn't a number
   */
  test('- `U2F.verifyAuthToken()` must return an error if timestamp value isn\'t a number', (done) => {
    U2F.verifyAuthToken('123456', 'RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5', { timestamp: null })
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/timestamp must be number');
          done();
        }
      });
  });

  /**
   * Test if U2F.verifyAuthToken() function returns an error if add_checksum isn't a boolean
   */
  test('- `U2F.verifyAuthToken()` must return an error if add_checksum isn\'t a boolean', (done) => {
    U2F.verifyAuthToken('123456', 'RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5', { add_checksum: null })
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/add_checksum must be boolean');
          done();
        }
      });
  });

  /**
   * Test if U2F.verifyAuthToken() function returns an error if truncation_offset isn't a number
   */
  test('- `U2F.verifyAuthToken()` must return an error if truncation_offset isn\'t a number', (done) => {
    U2F.verifyAuthToken('123456', 'RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5', { truncation_offset: null })
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/truncation_offset must be number');
          done();
        }
      });
  });

  /**
   * Test if U2F.verifyAuthToken() function returns an error if truncation_offset value is less than -1
   */
  test('- `U2F.verifyAuthToken()` must return an error if truncation_offset value is less than -1', (done) => {
    U2F.verifyAuthToken('123456', 'RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5', { truncation_offset: -2 })
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/truncation_offset must be >= -1');
          done();
        }
      });
  });

  /**
   * Test if U2F.verifyAuthToken() function returns an error if truncation_offset value is greater than 15
   */
  test('- `U2F.verifyAuthToken()` must return an error if truncation_offset value is greater than 15', (done) => {
    U2F.verifyAuthToken('123456', 'RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5', { truncation_offset: 16 })
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/truncation_offset must be <= 15');
          done();
        }
      });
  });

  /**
   * Test if U2F.verifyAuthToken() function returns an error if algorithm is wrong
   */
  test('- `U2F.verifyAuthToken()` must return an error if algorithm is wrong', (done) => {
    U2F.verifyAuthToken('123456', 'RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5', { algorithm: null })
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/algorithm must be equal to one of the allowed values');
          done();
        }
      });
  });
});
