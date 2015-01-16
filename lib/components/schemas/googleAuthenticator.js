/* See LICENSE file for terms of use */
'use strict';

// import library
var joi = require('joi');

module.exports = {
    user: joi.string().required(),
    issuer: joi.string().required(),
    secret: joi.string().regex(/^[A-Z2-7]{2,}$/),
    token: joi.string().regex(/^[0-9]{6}$/),
    window: joi.number().integer().min(0)
};