import * as Joi from 'joi';

/**
 * HOTP key schema
 *
 * @type {ObjectSchema}
 */
export const HOTP_KEY = Joi.object().keys({
    string: Joi.string(),
    hex: Joi.string().regex(/^[A-Fa-f0-9]{2,}$/)
}).xor('string', 'hex');

/**
 * HOTP generation options schema
 *
 * @type {ObjectSchema}
 */
export const HOTP_GENERATION_OPTIONS = Joi.object().keys({
    counter: Joi.object().keys({
        int: Joi.number().integer().min(0),
        hex: Joi.string().regex(/^[A-Fa-f0-9]{1,16}$/)
    }).xor('int', 'hex').default({ int: 0 }),
    codeDigits: Joi.number().integer().min(1).max(10).default(6),
    addChecksum: Joi.boolean().default(false),
    truncationOffset: Joi.number().integer().min(0).max(15),
    algorithm: Joi.string().valid('sha1', 'sha256', 'sha512').default('sha1')
});

/**
 * HOTP verify options schema
 *
 * @type {ObjectSchema}
 */
export const HOTP_VERIFY_OPTIONS = Joi.object().keys({
    window: Joi.number().integer().min(0).default(50),
    counter: Joi.object().keys({
        int: Joi.number().integer().min(0),
        hex: Joi.string().regex(/^[A-Fa-f0-9]{1,16}$/)
    }).xor('int', 'hex').default({ int: 0 }),
    addChecksum: Joi.boolean().default(false),
    truncationOffset: Joi.number().integer().min(0).max(15),
    algorithm: Joi.string().valid('sha1', 'sha256', 'sha512').default('sha1'),
    previousOTPAllowed: Joi.boolean().default(false)
});

/**
 * HOTP token schema
 *
 * @type {StringSchema}
 */
export const HOTP_TOKEN = Joi.string().regex(/^[0-9]{1,11}$/).required();
