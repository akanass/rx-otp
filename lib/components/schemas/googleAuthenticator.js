/* See LICENSE file for terms of use */
'use strict';

// import library
var joi = require('joi');

module.exports = {
    user: joi.string().required(),
    issuer: joi.string().required(),
    secret: joi.string().regex(/^[A-Z2-7]{2,}$/)
};