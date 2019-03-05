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
    algorithm?: 'SHA1' | 'SHA256' | 'SHA512';
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
    algorithm?: 'SHA1' | 'SHA256' | 'SHA512';
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
    algorithm?: 'SHA1' | 'SHA256' | 'SHA512';
}

export interface TOTPGenerateValidatedData extends TOTPGenerateOptions {
    key: string;
}

/**
 * TOTP verification options interface
 */
export interface TOTPVerifyOptions {
    key_format?: 'str' | 'hex';
    window?: number;
    time?: number;
    timestamp?: number;
    add_checksum?: boolean;
    truncation_offset?: number;
    algorithm?: 'SHA1' | 'SHA256' | 'SHA512';
}

export interface TOTPVerifyValidatedData extends TOTPVerifyOptions {
    token: string;
    key: string;
}

/**
 * U2F uri options interface
 */
export interface U2FUriOptions {
    time?: number;
    code_digits?: number;
    algorithm?: 'SHA1' | 'SHA256' | 'SHA512';
}

export interface U2FUriValidatedData extends U2FUriOptions {
    secret: string;
    account_name: string;
    issuer: string;
}

/**
 * U2F generation options interface
 */
export interface U2FGenerateOptions {
    time?: number;
    timestamp?: number;
    code_digits?: number;
    add_checksum?: boolean;
    truncation_offset?: number;
    algorithm?: 'SHA1' | 'SHA256' | 'SHA512';
}

export interface U2FGenerateValidatedData extends U2FGenerateOptions {
    key: string;
}

/**
 * U2F verification options interface
 */
export interface U2FVerifyOptions {
    window?: number;
    time?: number;
    timestamp?: number;
    add_checksum?: boolean;
    truncation_offset?: number;
    algorithm?: 'SHA1' | 'SHA256' | 'SHA512';
}

export interface U2FVerifyValidatedData extends U2FVerifyOptions {
    token: string;
    key: string;
}

/**
 * QR code generation options interface
 */
export interface QrCodeGenerateOptions {
    ec_level?: string;
    type?: string;
    size?: number;
}

export interface QrCodeGenerateValidatedOptions extends QrCodeGenerateOptions {
    text: string;
}
