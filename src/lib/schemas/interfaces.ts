/**
 * HOTP generation options interface
 */
export interface HOTPGenerateOptions {
    key_format?: 'str' | 'hex';
    counter?: number | string;
    counter_format?: 'int' | 'hex';
    code_digits?: number;
    add_checksum?: boolean;
    truncation_offset?: number;
    algorithm?: 'sha1' | 'sha256' | 'sha512';
}

export interface HOTPGenerateValidatedData extends HOTPGenerateOptions {
    key: string;
}

/**
 * OTP verify result interface
 */
export interface OTPVerifyResult {
    delta: number | string;
    delta_format: 'int' | 'hex';
}

/**
 * HOTP verification options interface
 */
export interface HOTPVerifyOptions {
    key_format?: 'str' | 'hex';
    window?: number;
    counter?: number | string;
    counter_format?: 'int' | 'hex';
    add_checksum?: boolean;
    truncation_offset?: number;
    algorithm?: 'sha1' | 'sha256' | 'sha512';
    previous_otp_allowed?: boolean;
}

export interface HOTPVerifyValidatedData extends HOTPVerifyOptions {
    token: string;
    key: string;
}

/**
 * TOTP generation options interface
 */
export interface TOTPGenerateOptions {
    key_format?: 'str' | 'hex';
    time?: number;
    timestamp?: number;
    code_digits?: number;
    add_checksum?: boolean;
    truncation_offset?: number;
    algorithm?: 'sha1' | 'sha256' | 'sha512';
}

export interface TOTPGenerateValidatedData extends TOTPGenerateOptions {
    key: string;
}

/**
 * HOTP verification options interface
 */
export interface TOTPVerifyOptions {
    key_format?: 'str' | 'hex';
    window?: number;
    time?: number;
    timestamp?: number;
    add_checksum?: boolean;
    truncation_offset?: number;
    algorithm?: 'sha1' | 'sha256' | 'sha512';
}

export interface TOTPVerifyValidatedData extends TOTPVerifyOptions {
    token: string;
    key: string;
}
