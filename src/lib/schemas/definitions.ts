export const DEFINITIONS_SCHEMA = {
    '$schema': 'http://json-schema.org/draft-07/schema#',
    '$id': '/rx-otp/schemas/definitions.json#',
    'definitions': {
        'str': {
            'description': 'ASCII string format for OTP generation and validation',
            'type': 'string',
            'minLength': 1
        },
        'int': {
            'description': 'Positive number format for OTP generation and validation',
            'type': 'number',
            'minimum': 0
        },
        'time_sec': {
            'description': 'Time in seconds format for OTP generation and validation',
            'type': 'number',
            'minimum': 1
        },
        'bool': {
            'description': 'Boolean format for OTP generation and validation',
            'type': 'boolean'
        },
        'code_digits': {
            'description': 'Code digits format for OTP generation and validation',
            'type': 'number',
            'minimum': 1,
            'maximum': 10
        },
        'truncation_offset': {
            'description': 'Truncation offset format for OTP generation and validation',
            'type': 'number',
            'minimum': -1,
            'maximum': 15
        },
        'key_hex': {
            'description': 'Secret key in hexadecimal format for OTP generation and validation',
            'type': 'string',
            'pattern': '^[A-Fa-f0-9]{2,}$'
        },
        'counter_hex': {
            'description': 'Counter in hexadecimal format for OTP generation and validation',
            'type': 'string',
            'pattern': '^[A-Fa-f0-9]{1,16}$'
        },
        'key_format': {
            'description': 'Secret key formats allowed for OTP generation and validation',
            'enum': ['str', 'hex']
        },
        'counter_format': {
            'description': 'Counter formats allowed for OTP generation and validation',
            'enum': ['int', 'hex'],
        },
        'algorithm': {
            'description': 'Algorithms allowed for OTP generation and validation',
            'enum': ['SHA1', 'SHA256', 'SHA512'],
        },
        'token': {
            'description': 'Token format for OTP generation and validation',
            'type': 'string',
            'pattern': '^[0-9]{1,11}$'
        },
        'base32': {
            'description': 'Base32 format for OTP generation and validation',
            'type': 'string',
            'pattern': '^[A-Z2-7]{2,}$'
        },
        'ec_level': {
            'description': 'Error correction level for QR code generation',
            'enum': ['L', 'M', 'Q', 'H']
        },
        'qr_type': {
            'description': 'QR code image type',
            'enum': ['png', 'svg']
        },
        'qr_size': {
            'description': 'Size format for QR code generation',
            'type': 'number',
            'minimum': 1
        }
    }
};
