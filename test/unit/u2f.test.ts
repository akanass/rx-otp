import { Buffer } from 'buffer';
import { Observable } from 'rxjs';
import { U2F } from '../../src';

describe('- Unit u2f.test.ts file', () => {
  /**
   * Test if U2F.generateOTPKey() function returns an Observable
   */
  test('- `U2F.generateOTPKey()` must return an `Observable`', (done) => {
    expect(U2F.generateOTPKey()).toBeInstanceOf(Observable);
    done();
  });

  /**
   * Test if U2F.generateOTPKey() function returns a random hexadecimal string of 20 bytes
   */
  test('- `U2F.generateOTPKey()` must return a random hexadecimal string of 20 bytes', (done) => {
    U2F.generateOTPKey().subscribe(_ => {
      expect(_.length).toEqual(40);
      expect(typeof _).toBe('string');
      done();
    });
  });

  /**
   * Test if U2F.generateOTPKey() function returns a random Buffer of 20 bytes
   */
  test('- `U2F.generateOTPKey()` must return a random Buffer of 20 bytes', (done) => {
    U2F.generateOTPKey(true).subscribe(_ => {
      expect(_).toBeInstanceOf(Buffer);
      done();
    });
  });

  /**
   * Test if U2F.encodeAuthKey() function returns an Observable
   */
  test('- `U2F.encodeAuthKey()` must return an `Observable`', (done) => {
    expect(U2F.encodeAuthKey(undefined)).toBeInstanceOf(Observable);
    done();
  });

  /**
   * Test if U2F.encodeAuthKey() function throws an error if parameter isn't set
   */
  test('- `U2F.encodeAuthKey()` must throw an error if parameter isn\'t set', (done) => {
    U2F.encodeAuthKey(undefined).subscribe({
      error: error => {
        expect(error.message)
          .toBe('The first argument must be of type string or an instance of ' +
            'Buffer, ArrayBuffer, or Array or an Array-like Object. Received undefined');
        done();
      }
    });
  });

  /**
   * Test if U2F.encodeAuthKey() function throws an error if parameter is wrong type
   */
  test('- `U2F.encodeAuthKey()` must throw an error if parameter is wrong type', (done) => {
    U2F.encodeAuthKey(null).subscribe({
      error: error => {
        expect(error.message)
          .toBe('The first argument must be of type string or an instance of ' +
            'Buffer, ArrayBuffer, or Array or an Array-like Object. Received null');
        done();
      }
    });
  });

  /**
   * Test if U2F.encodeAuthKey() function returns a base32 encoded string
   */
  test('- `U2F.encodeAuthKey()` must return a base32 encoded string', (done) => {
    U2F.encodeAuthKey(Buffer.from('secret key')).subscribe(_ => {
      expect(typeof _).toBe('string');
      done();
    });
  });

  /**
   * Test if U2F.generateAuthKey() function returns an Observable
   */
  test('- `U2F.generateAuthKey()` must return an `Observable`', (done) => {
    expect(U2F.generateAuthKey()).toBeInstanceOf(Observable);
    done();
  });

  /**
   * Test if U2F.encodeAuthKey() function returns a base32 encoded string of 39 chars length
   */
  test('- `U2F.generateAuthKey()` must return a base32 encoded string of 39 chars length', (done) => {
    U2F.generateAuthKey().subscribe(_ => {
      expect(typeof _).toBe('string');
      expect(_.length).toBe(39);
      done();
    });
  });

  /**
   * Test if U2F.decodeAuthKey() function returns an Observable
   */
  test('- `U2F.decodeAuthKey()` must return an `Observable`', (done) => {
    expect(U2F.decodeAuthKey(undefined)).toBeInstanceOf(Observable);
    done();
  });

  /**
   * Test if U2F.decodeAuthKey() function returns an error if parameter isn't set
   */
  test('- `U2F.decodeAuthKey()` must throw an error if parameter isn\'t set', (done) => {
    U2F.decodeAuthKey(undefined).subscribe({
      error: error => {
        expect(error.message).toBe('Cannot read properties of undefined (reading \'replace\')');
        done();
      }
    });
  });

  /**
   * Test if U2F._cleanBase32Key() function returns an Observable
   */
  test('- `U2F._cleanBase32Key()` must return an `Observable`', (done) => {
    expect(U2F['_cleanBase32Key'](undefined)).toBeInstanceOf(Observable);
    done();
  });
});
