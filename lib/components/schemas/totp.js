/* See LICENSE file for terms of use */
'use strict';

// import library
var joi = require('joi');

module.exports = {
    key: joi.object().keys({
        string: joi.string(),
        hex: joi.string().regex(/^[A-Fa-f0-9]{2,}$/)
    }).xor('string','hex'),
    opt: joi.object().keys({
        time: joi.number().integer().min(1).unit('seconds').default(30),
        timestamp: joi.number().integer().min(0).unit('milliseconds'),
        codeDigits: joi.number().integer().min(1).max(10).default(6),
        addChecksum: joi.boolean().default(false),
        truncationOffset: joi.number().integer().min(0).max(15),
        algorithm: joi.string().valid('sha1', 'sha256', 'sha512').default('sha1')
    }),
    optVerify: joi.object().keys({
        window: joi.number().integer().min(0).default(6),
        time: joi.number().integer().min(1).unit('seconds').default(30),
        timestamp: joi.number().integer().min(0).unit('milliseconds'),
        addChecksum: joi.boolean().default(false),
        truncationOffset: joi.number().integer().min(0).max(15),
        algorithm: joi.string().valid('sha1', 'sha256', 'sha512').default('sha1')
    }),
    token: joi.string().regex(/^[0-9]{1,11}$/)
};