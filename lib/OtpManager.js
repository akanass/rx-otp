/* See LICENSE file for terms of use */
'use strict';

module.exports = {
    hotp: require('./components/HOTP'),
    totp: require('./components/TOTP'),
    googleAuthenticator: require('./components/GoogleAuthenticator')
};