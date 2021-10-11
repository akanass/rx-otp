import { mergeMap, Observable, of, throwError } from 'rxjs';
import { defaultIfEmpty, filter } from 'rxjs/operators';
import { ajv } from './ajv';
import {
  HOTPGenerateValidatedData,
  HOTPVerifyValidatedData,
  QrCodeGenerateValidatedOptions,
  TOTPGenerateValidatedData,
  TOTPVerifyValidatedData,
  U2FGenerateValidatedData,
  U2FUriValidatedData,
  U2FVerifyValidatedData
} from './interfaces';

export class Validator {
  /**
   * Validates parameters passed in generate() and verify() functions from HOTP and TOTP classes
   *
   * @param {string} keyRef - JSON schema key reference
   * @param {HOTPGenerateValidatedData |
   *          HOTPVerifyValidatedData |
   *          TOTPGenerateValidatedData |
   *          TOTPVerifyValidatedData} data - data to be validated
   *
   * @private
   */
  static validateDataWithSchemaReference = (keyRef: string,
                                            data: HOTPGenerateValidatedData |
                                              HOTPVerifyValidatedData |
                                              TOTPGenerateValidatedData |
                                              TOTPVerifyValidatedData |
                                              U2FUriValidatedData |
                                              U2FGenerateValidatedData |
                                              U2FVerifyValidatedData |
                                              QrCodeGenerateValidatedOptions):
    Observable<HOTPGenerateValidatedData |
      HOTPVerifyValidatedData |
      TOTPGenerateValidatedData |
      TOTPVerifyValidatedData |
      U2FUriValidatedData |
      U2FGenerateValidatedData |
      U2FVerifyValidatedData |
      QrCodeGenerateValidatedOptions> =>
    of(ajv.getSchema(keyRef))
      .pipe(
        mergeMap(validator =>
          of(validator(data))
            .pipe(
              filter(_ => !_),
              mergeMap(() => throwError(() => new Error(ajv.errorsText(validator.errors)))),
              defaultIfEmpty(data)
            )
        )
      );
}
