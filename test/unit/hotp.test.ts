import { suite, test } from 'mocha-typescript';
import * as unit from 'unit.js';

import { Observable } from 'rxjs/Observable';
import { HOTP } from '../../src';

@suite('- Unit HOTPTest file')
export class HOTPTest {
    /**
     * Test if HOTP class has generate function
     */
    @test('- `HOTP` class must have `generate` function')
    testGenerateFunction() {
        unit.function(HOTP.generate);
    }

    /**
     * Test if HOTP.generate() function returns an Observable
     */
    @test('- `HOTP.generate()` must return an `Observable`')
    testGenerateFunctionReturnObservable() {
        unit.object(HOTP.generate(undefined)).isInstanceOf(Observable);
    }
}
