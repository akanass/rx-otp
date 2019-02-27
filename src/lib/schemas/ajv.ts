// Import library
import * as Ajv from 'ajv';
import * as defineKeywords  from 'ajv-keywords';
// Import all schemas
import { DEFINITIONS_SCHEMA } from './definitions';
import { HOTP_GENERATE_SCHEMA, HOTP_VERIFY_SCHEMA } from './hotp';
import { TOTP_GENERATE_SCHEMA, TOTP_VERIFY_SCHEMA } from './totp';

// New instance of AJV with all schemas
export const ajv = new Ajv({
    useDefaults: true,
    $data: true,
    schemas: [
        HOTP_GENERATE_SCHEMA,
        HOTP_VERIFY_SCHEMA,
        TOTP_GENERATE_SCHEMA,
        TOTP_VERIFY_SCHEMA,
        DEFINITIONS_SCHEMA
    ]
});

// Add additional keywords to ajv instance
defineKeywords(ajv);
