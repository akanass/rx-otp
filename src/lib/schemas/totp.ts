/**
 * TOTP generate schema
 */
export const TOTP_GENERATE_SCHEMA = {
    '$schema': 'http://json-schema.org/draft-07/schema#',
    '$id': '/rx-otp/schemas/totp-generate.json#',
    'title': 'Schema for TOTP generation',
    'type': 'object',
    'properties': {
        'key': {},
        'key_format': {
            '$ref': 'definitions.json#/definitions/key_format',
            'default': 'str'
        },
        'time': {
            '$ref': 'definitions.json#/definitions/time_sec',
            'default': 30
        },
        'timestamp': {
            '$ref': 'definitions.json#/definitions/int'
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
            '$ref': 'definitions.json#/definitions/truncation_offset',
            'default': -1
        },
        'algorithm': {
            '$ref': 'definitions.json#/definitions/algorithm',
            'default': 'SHA512'
        }
    },
    'dynamicDefaults': {
        'timestamp': 'timestamp'
    },
    'required': [ 'key', 'time', 'code_digits', 'add_checksum', 'truncation_offset', 'algorithm' ],
    'dependencies': {
        'key': [ 'key_format' ]
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
        }
    ]
};

/**
 * TOTP verify schema
 */
export const TOTP_VERIFY_SCHEMA = {
    '$schema': 'http://json-schema.org/draft-07/schema#',
    '$id': '/rx-otp/schemas/totp-verify.json#',
    'title': 'Schema for TOTP verification',
    'type': 'object',
    'properties': {
        'token': {
            '$ref': 'definitions.json#/definitions/token'
        },
        'key': {},
        'key_format': {
            '$ref': 'definitions.json#/definitions/key_format',
            'default': 'str'
        },
        'window': {
            '$ref': 'definitions.json#/definitions/int',
            'default': 1
        },
        'time': {
            '$ref': 'definitions.json#/definitions/time_sec',
            'default': 30
        },
        'timestamp': {
            '$ref': 'definitions.json#/definitions/int'
        },
        'add_checksum': {
            '$ref': 'definitions.json#/definitions/bool',
            'default': false
        },
        'truncation_offset': {
            '$ref': 'definitions.json#/definitions/truncation_offset',
            'default': -1
        },
        'algorithm': {
            '$ref': 'definitions.json#/definitions/algorithm',
            'default': 'SHA512'
        }
    },
    'dynamicDefaults': {
        'timestamp': 'timestamp'
    },
    'required': [ 'token', 'key', 'window', 'time', 'add_checksum', 'truncation_offset', 'algorithm' ],
    'dependencies': {
        'key': [ 'key_format' ]
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
        }
    ]
};
