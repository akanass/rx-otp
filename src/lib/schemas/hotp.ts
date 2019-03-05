/**
 * HOTP generate schema
 */
export const HOTP_GENERATE_SCHEMA = {
    '$schema': 'http://json-schema.org/draft-07/schema#',
    '$id': '/rx-otp/schemas/hotp-generate.json#',
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
            '$ref': 'definitions.json#/definitions/truncation_offset',
            'default': -1
        },
        'algorithm': {
            '$ref': 'definitions.json#/definitions/algorithm',
            'default': 'SHA512'
        }
    },
    'required': ['key', 'counter', 'code_digits', 'add_checksum', 'truncation_offset', 'algorithm'],
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

/**
 * HOTP verify schema
 */
export const HOTP_VERIFY_SCHEMA = {
    '$schema': 'http://json-schema.org/draft-07/schema#',
    '$id': '/rx-otp/schemas/hotp-verify.json#',
    'title': 'Schema for HOTP verification',
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
            'default': 50
        },
        'counter': {
            'default': 0
        },
        'counter_format': {
            '$ref': 'definitions.json#/definitions/counter_format',
            'default': 'int'
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
        },
        'previous_otp_allowed': {
            '$ref': 'definitions.json#/definitions/bool',
            'default': false
        }
    },
    'required': ['token', 'key', 'window', 'counter', 'add_checksum', 'truncation_offset', 'algorithm', 'previous_otp_allowed'],
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
