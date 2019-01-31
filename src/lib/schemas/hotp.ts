
/**
 * HOTP verify options schema
 *
 * @type {ObjectSchema}
 */
/*export const HOTP_VERIFY_OPTIONS = Joi.object().keys({
    window: Joi.number().integer().min(0).default(50),
    counter: Joi.object().keys({
        int: Joi.number().integer().min(0),
        hex: Joi.string().regex(/^[A-Fa-f0-9]{1,16}$/)
    }).xor('int', 'hex').default({ int: 0 }),
    addChecksum: Joi.boolean().default(false),
    truncationOffset: Joi.number().integer().min(0).max(15),
    algorithm: Joi.string().valid('sha1', 'sha256', 'sha512').default('sha1'),
    previousOTPAllowed: Joi.boolean().default(false)
});*/

/**
 * HOTP token schema
 *
 * @type {StringSchema}
 */
/*export const HOTP_TOKEN = Joi.string().regex(/^[0-9]{1,11}$/).required();*/

/**
 * HOTP generate schema
 */
export const HOTP_GENERATE_SCHEMA = {
    '$schema': 'http://json-schema.org/draft-07/schema#',
    '$id': '/otp.js/schemas/hotp-generate.json#',
    'title': 'Schema for HOTP generation',
    'type': 'object',
    'properties': {
        'key': {},
        'key_format': {
            '$ref': 'definitions.json#/definitions/key_format',
            'default': 'str'
        },
        'counter': {
            'default': 0
        },
        'counter_format': {
            '$ref': 'definitions.json#/definitions/counter_format',
            'default': 'int'
        },
        'code_digits': {
            '$ref': 'definitions.json#/definitions/code_digits',
            'default': 6
        },
        'add_checksum': {
            '$ref': 'definitions.json#/definitions/bool',
            'default': false
        },
        'truncation_offset': {
            '$ref': 'definitions.json#/definitions/truncation_offset'
        },
        'algorithm': {
            '$ref': 'definitions.json#/definitions/algorithm',
            'default': 'sha256'
        }
    },
    'required': ['key', 'counter', 'code_digits', 'add_checksum', 'algorithm'],
    'dependencies': {
        'key': ['key_format'],
        'counter': ['counter_format']
    },
    'additionalProperties': false,
    'allOf': [
        {
            'if': {
                'properties': {
                    'key_format': {
                        'const': 'str'
                    }
                }
            },
            'then': {
                'properties': {
                    'key': {
                        '$ref': 'definitions.json#/definitions/str'
                    }
                }
            },
            'else': {
                'properties': {
                    'key': {
                        '$ref': 'definitions.json#/definitions/key_hex'
                    }
                }
            }
        },
        {
            'if': {
                'properties': {
                    'counter_format': {
                        'const': 'int'
                    }
                }
            },
            'then': {
                'properties': {
                    'counter': {
                        '$ref': 'definitions.json#/definitions/int'
                    }
                }
            },
            'else': {
                'properties': {
                    'counter': {
                        '$ref': 'definitions.json#/definitions/counter_hex'
                    }
                }
            }
        }
    ]
};
