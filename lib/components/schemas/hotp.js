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
        counter: joi.object().keys({
            int: joi.number().integer().min(0),
            hex: joi.string().regex(/^[A-Fa-f0-9]{1,16}$/)
        }).xor('int','hex').default({int: 0}),
        codeDigits: joi.number().integer().min(1).max(10).default(6),
        addChecksum: joi.boolean().default(false),
        truncationOffset: joi.number().integer().min(0).max(15)
    }),
    optVerify: joi.object().keys({
        window: joi.number().integer().min(0).default(50),
        counter: joi.object().keys({
            int: joi.number().integer().min(0),
            hex: joi.string().regex(/^[A-Fa-f0-9]{1,16}$/)
        }).xor('int','hex').default({int: 0}),
        addChecksum: joi.boolean().default(false),
        truncationOffset: joi.number().integer().min(0).max(15)
    }),
    token: joi.string().regex(/^[0-9]{1,11}$/)
};