/**
 * U2F uri schema
 */
export const U2F_URI_SCHEMA = {
    '$schema': 'http://json-schema.org/draft-07/schema#',
    '$id': '/rx-otp/schemas/u2f-uri.json#',
    'title': 'Schema for U2F uri',
    'type': 'object',
    'properties': {
        'secret': {
            '$ref': 'definitions.json#/definitions/base32'
        },
        'account_name': {
            '$ref': 'definitions.json#/definitions/str'
        },
        'issuer': {
            '$ref': 'definitions.json#/definitions/str'
        },
        'code_digits': {
            '$ref': 'definitions.json#/definitions/code_digits',
            'default': 6
        },
        'time': {
            '$ref': 'definitions.json#/definitions/time_sec',
            'default': 30
        },
        'algorithm': {
            '$ref': 'definitions.json#/definitions/algorithm',
            'default': 'SHA512'
        }
    },
    'required': [ 'secret', 'account_name', 'issuer', 'code_digits', 'time', 'algorithm' ],
    'additionalProperties': false
};

/**
 * U2F generate schema
 */
export const U2F_GENERATE_SCHEMA = {
    '$schema': 'http://json-schema.org/draft-07/schema#',
    '$id': '/rx-otp/schemas/u2f-generate.json#',
    'title': 'Schema for U2F generation',
    'type': 'object',
    'properties': {
        'key': {
            '$ref': 'definitions.json#/definitions/key_hex'
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
    'additionalProperties': false
};

/**
 * U2F verify schema
 */
export const U2F_VERIFY_SCHEMA = {
    '$schema': 'http://json-schema.org/draft-07/schema#',
    '$id': '/rx-otp/schemas/u2f-verify.json#',
    'title': 'Schema for U2F verification',
    'type': 'object',
    'properties': {
        'token': {
            '$ref': 'definitions.json#/definitions/token'
        },
        'key': {
            '$ref': 'definitions.json#/definitions/key_hex'
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
    'additionalProperties': false
};

/**
 * QR code schema
 */
export const U2F_QR_SCHEMA = {
    '$schema': 'http://json-schema.org/draft-07/schema#',
    '$id': '/rx-otp/schemas/u2f-qr.json#',
    'title': 'Schema for QR code generation',
    'type': 'object',
    'properties': {
        'text': {
            '$ref': 'definitions.json#/definitions/str'
        },
        'ec_level': {
            '$ref': 'definitions.json#/definitions/ec_level',
            'default': 'M'
        },
        'type': {
            '$ref': 'definitions.json#/definitions/qr_type',
            'default': 'svg'
        },
        'size': {
            '$ref': 'definitions.json#/definitions/qr_size'
        }
    },
    'required': [ 'text', 'ec_level', 'type' ],
    'additionalProperties': false
};
