# One-Time Password manager

One Time Password manager is fully compliant with [HOTP](http://tools.ietf.org/html/rfc4226) (counter based one time passwords) and [TOTP](http://tools.ietf.org/html/rfc6238) (time based one time passwords). It can be used in conjunction with the `Google Authenticator`, for Two-Factor Authentication, which has free apps for `iOS`, `Android` and `BlackBerry`.

All methods described in both `RFC` are implemented in [API](#api).

Now [RxJS](http://reactivex.io/rxjs) compliant, wrote in full [Typescript](https://www.typescriptlang.org/docs/tutorial.html) | [ES6](https://babeljs.io/docs/learn-es2015/) for client and server side.

## Table of contents

* [Installation](#installation)
* [Super simple to use](#super-simple-to-use)
* [Build your project with Webpack](#build-your-project-with-webpack)
* [API in Detail](#api-in-detail)
* [Contributing](#contributing)
* [Change History](#change-history)
* [License](#license)

## Installation

```sh
$ npm install --save @akanass/rx-otp rxjs

or

$ yarn add @akanass/rx-otp rxjs
```

## Super simple to use

**RX-OTP** is designed to be the simplest way possible to generate and verify OTP.

It's fully `Typescript` | `ES6` written, so you can import it :

```typescript
import {HOTP} from "@akanass/rx-otp";
```

or use `CommonJS`:

```javascript
const HOTP = require('@akanass/rx-otp').HOTP;
```

Now, it's easy to perform a generation of `HOTP`:

```typescript
HOTP.generate('12345678901234567890').subscribe({
    next: token => console.log(token), // display 125165 in the console
    error: err => console.error(err) // show error in console
});
```

[Back to top](#table-of-contents)

## Build your project with Webpack

If you want to include this library inside a project builds with `webpack` for a `client` application, you must add this configuration inside your `webpack configuration`:

```javascript
{
    target: "web",
    node: {
        fs: "empty",
        net: "empty",
        tls: "empty"
    }
}
``` 

For a `server` application, `target` will be `node`, `node` block in configuration **doesn't exist** and `uglify` plugin must be `disabled`. 

[Back to top](#table-of-contents)

## API in Detail

We implemented some functions and to see their details go to documentation folder:

* [./documentation/HOTP.md](https://github.com/akanass/rx-otp/blob/master/documentation/HOTP.md)
* [./documentation/TOTP.md](https://github.com/akanass/rx-otp/blob/master/documentation/TOTP.md)
* [./documentation/U2F.md](https://github.com/akanass/rx-otp/blob/master/documentation/U2F.md)

[Back to top](#table-of-contents)

## Contributing

To set up your development environment:

1. clone the repo to your workspace,
2. in the shell `cd` to the main folder,
3. hit `npm or yarn install`,
4. run `npm or yarn run test`.
    * It will lint the code and execute all tests. 
    * The test coverage report can be viewed from `./coverage/lcov-report/index.html`.

[Back to top](#table-of-contents)

## Change History

* v2.0.0 (2021-10-11)
    * Upgrade all packages' versions to move on `rxjs:7.4.0` and delete incompatible packages
    * Delete browser single version due to incompatibility
    * Delete `es5` version and now module is only on `es2015` and if you want an older support, your bundle system should transpile it to `es5`
    * Fix tests
    * Documentation
* v1.1.0 (2019-07-12)
    * Change repository owner name
    * Latest packages' versions
    * Fix tests
    * Documentation
* v1.0.0 (2019-03-08)
    * Add **scope** to library and move to **`@akanass/rx-otp`**
    * Rewritten all **library and test files in `Typescript`**
    * Add `typings` support
    * Use `JEST` for testing
    * Use [json-schema](https://json-schema.org/) and [ajv](https://github.com/epoberezkin/ajv) library to validate functions' parameters

[Back to top](#table-of-contents)

## License
Copyright (c) 2021 **Nicolas Jessel**. Licensed under the [MIT license](https://github.com/akanass/rx-otp/blob/master/LICENSE.md).

[Back to top](#table-of-contents)
