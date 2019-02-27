import { Observable, of, throwError } from 'rxjs';
import { defaultIfEmpty, filter, flatMap } from 'rxjs/operators';
import { ajv } from './ajv';
import {
    HOTPGenerateValidatedData,
    HOTPVerifyValidatedData,
    TOTPGenerateValidatedData,
    TOTPVerifyValidatedData
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
    static validateDataWithSchemaReference(keyRef: string,
                                           data: HOTPGenerateValidatedData |
                                               HOTPVerifyValidatedData |
                                               TOTPGenerateValidatedData |
                                               TOTPVerifyValidatedData):
        Observable<HOTPGenerateValidatedData | HOTPVerifyValidatedData | TOTPGenerateValidatedData | TOTPVerifyValidatedData> {
        return of(ajv.getSchema(keyRef))
            .pipe(
                flatMap(validator =>
                    of(validator(data))
                        .pipe(
                            filter(_ => !_),
                            flatMap(() => throwError(new Error(ajv.errorsText(validator.errors)))),
                            defaultIfEmpty(data)
                        )
                )
            );
    }
}
