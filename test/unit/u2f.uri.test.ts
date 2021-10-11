import { Observable } from 'rxjs';
import { U2F } from '../../src';

describe('- Unit u2f.uri.test.ts file', () => {
  /**
   * Test if U2F.generateTOTPUri() function returns an Observable
   */
  test('- `U2F.generateTOTPUri()` must return an `Observable`', (done) => {
    expect(U2F.generateTOTPUri(undefined, undefined, undefined)).toBeInstanceOf(Observable);
    done();
  });

  /**
   * Test if U2F.generateTOTPUri() function returns an error if secret isn't set
   */
  test('- `U2F.generateTOTPUri()` must return an error if secret isn\'t set', (done) => {
    U2F.generateTOTPUri(undefined, undefined, undefined).subscribe({
      error: error => {
        expect(error.message).toBe('Cannot read properties of undefined (reading \'replace\')');
        done();
      }
    });
  });

  /**
   * Test if U2F.generateTOTPUri() function returns an error if secret has a wrong value
   */
  test('- `U2F.generateTOTPUri()` must return an error if secret has a wrong value', (done) => {
    U2F.generateTOTPUri('', null, null).subscribe({
      error: error => {
        expect(error.message).toBe('data/secret must match pattern "^[A-Z2-7]{2,}$"');
        done();
      }
    });
  });

  /**
   * Test if U2F.generateTOTPUri() function returns an error if account_name isn't set
   */
  test('- `U2F.generateTOTPUri()` must return an error if account_name isn\'t set', (done) => {
    U2F.generateTOTPUri('RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5', undefined, undefined).subscribe({
      error: error => {
        expect(error.message).toBe('data must have required property \'account_name\'');
        done();
      }
    });
  });

  /**
   * Test if U2F.generateTOTPUri() function returns an error if account_name isn't a string
   */
  test('- `U2F.generateTOTPUri()` must return an error if account_name isn\'t a string', (done) => {
    U2F.generateTOTPUri('RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5', null, null).subscribe({
      error: error => {
        expect(error.message).toBe('data/account_name must be string');
        done();
      }
    });
  });

  /**
   * Test if U2F.generateTOTPUri() function returns an error if account_name is an empty string
   */
  test('- `U2F.generateTOTPUri()` must return an error if account_name is an empty string', (done) => {
    U2F.generateTOTPUri('RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5', '', null).subscribe({
      error: error => {
        expect(error.message).toBe('data/account_name must NOT have fewer than 1 characters');
        done();
      }
    });
  });
  /**
   * Test if U2F.generateTOTPUri() function returns an error if issuer isn't set
   */
  test('- `U2F.generateTOTPUri()` must return an error if account_name isn\'t set', (done) => {
    U2F.generateTOTPUri('RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5', 'akanass', undefined).subscribe({
      error: error => {
        expect(error.message).toBe('data must have required property \'issuer\'');
        done();
      }
    });
  });

  /**
   * Test if U2F.generateTOTPUri() function returns an error if issuer isn't a string
   */
  test('- `U2F.generateTOTPUri()` must return an error if issuer isn\'t a string', (done) => {
    U2F.generateTOTPUri('RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5', 'akanass', null).subscribe({
      error: error => {
        expect(error.message).toBe('data/issuer must be string');
        done();
      }
    });
  });

  /**
   * Test if U2F.generateTOTPUri() function returns an error if issuer is an empty string
   */
  test('- `U2F.generateTOTPUri()` must return an error if issuer is an empty string', (done) => {
    U2F.generateTOTPUri('RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5', 'akanass', '').subscribe({
      error: error => {
        expect(error.message).toBe('data/issuer must NOT have fewer than 1 characters');
        done();
      }
    });
  });

  /**
   * Test if U2F.generateTOTPUri() function returns an error if time isn't a number
   */
  test('- `U2F.generateTOTPUri()` must return an error if time isn\'t a number', (done) => {
    U2F.generateTOTPUri('RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5', 'akanass', 'rx-otp', { time: null })
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/time must be number');
          done();
        }
      });
  });

  /**
   * Test if U2F.generateTOTPUri() function returns an error if time value is less than 1
   */
  test('- `U2F.generateTOTPUri()` must return an error if time value is less than 1', (done) => {
    U2F.generateTOTPUri('RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5', 'akanass', 'rx-otp', { time: 0 })
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/time must be >= 1');
          done();
        }
      });
  });

  /**
   * Test if U2F.generateTOTPUri() function returns an error if code_digits isn't a number
   */
  test('- `U2F.generateTOTPUri()` must return an error if code_digits isn\'t a number', (done) => {
    U2F.generateTOTPUri('RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5', 'akanass', 'rx-otp', { code_digits: null })
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/code_digits must be number');
          done();
        }
      });
  });

  /**
   * Test if U2F.generateTOTPUri() function returns an error if code_digits value is less than 1
   */
  test('- `U2F.generateTOTPUri()` must return an error if code_digits value is less than 1', (done) => {
    U2F.generateTOTPUri('RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5', 'akanass', 'rx-otp', { code_digits: 0 })
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/code_digits must be >= 1');
          done();
        }
      });
  });

  /**
   * Test if U2F.generateTOTPUri() function returns an error if code_digits value is greater than 10
   */
  test('- `U2F.generateTOTPUri()` must return an error if code_digits value is greater than 10', (done) => {
    U2F.generateTOTPUri('RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5', 'akanass', 'rx-otp', { code_digits: 11 })
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/code_digits must be <= 10');
          done();
        }
      });
  });

  /**
   * Test if U2F.generateTOTPUri() function returns an error if algorithm is wrong
   */
  test('- `U2F.generateTOTPUri()` must return an error if algorithm is wrong', (done) => {
    U2F.generateTOTPUri('RHCQ 3M3Y P5KY U4VS 7KGT 2IUH R7M4 TEC5', 'akanass', 'rx-otp', { algorithm: null })
      .subscribe({
        error: error => {
          expect(error.message).toBe('data/algorithm must be equal to one of the allowed values');
          done();
        }
      });
  });
});
