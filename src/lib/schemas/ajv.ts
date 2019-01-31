// Import library
import * as Ajv from 'ajv';
// Import all schemas
import { DEFINITIONS_SCHEMA } from './definitions';
import { HOTP_GENERATE_SCHEMA } from './hotp';

// New instance of AJV with all schemas
export const ajv = new Ajv({
    useDefaults: true,
    $data: true,
    schemas: [
        HOTP_GENERATE_SCHEMA,
        DEFINITIONS_SCHEMA
    ]
});

// Export HOTP generation validator
export const hotpGenerateValidator = ajv.getSchema('/otp.js/schemas/hotp-generate.json');
