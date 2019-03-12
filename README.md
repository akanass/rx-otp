<div style="overflow:hidden;margin-bottom:20px;">
<div style="float:left;line-height:60px">
    <a href="https://travis-ci.org/njl07/rx-otp.svg?branch=master">
        <img src="https://travis-ci.org/njl07/rx-otp.svg?branch=master" alt="build" />
    </a>
    <a href="https://coveralls.io/github/njl07/rx-otp?branch=master">
        <img src="https://coveralls.io/repos/github/njl07/rx-otp/badge.svg?branch=master" alt="coveralls" />
    </a>
    <a href="https://david-dm.org/njl07/rx-otp">
        <img src="https://david-dm.org/njl07/rx-otp.svg" alt="dependencies" />
    </a>
    <a href="https://david-dm.org/njl07/rx-otp?type=dev">
        <img src="https://david-dm.org/njl07/rx-otp/dev-status.svg" alt="devDependencies" />
    </a>
</div>
<div style="float:right;">
    <a href="https://www.typescriptlang.org/docs/tutorial.html">
        <img src="https://cdn-images-1.medium.com/max/800/1*8lKzkDJVWuVbqumysxMRYw.png"
             align="right" alt="Typescript logo" width="50" height="50"/>
    </a>
    <a href="http://reactivex.io/rxjs">
        <img src="http://reactivex.io/assets/Rx_Logo_S.png"
             align="right" alt="ReactiveX logo" width="50" height="50"/>
    </a>
</div>
</div>

# One-Time Password manager

One Time Password manager is fully compliant with [HOTP](http://tools.ietf.org/html/rfc4226) (counter based one time passwords) and [TOTP](http://tools.ietf.org/html/rfc6238) (time based one time passwords). It can be used in conjunction with the `Google Authenticator`, for Two-Factor Authentication, which has free apps for `iOS`, `Android` and `BlackBerry`.

All methods described in both `RFC` are implemented in [API](#api).

Now [RxJS](http://reactivex.io/rxjs) compliant, wrote in full [Typescript](https://www.typescriptlang.org/docs/tutorial.html) | [ES6](https://babeljs.io/docs/learn-es2015/) for client and server side.

## Table of contents

* [Installation](#installation)
* [Super simple to use](#super-simple-to-use)
* [Browser compatibility](#browser-compatibility)
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

It's fully `Typescript` | `ES6` wrotten so you can import it :

```typescript
import {HOTP} from "@akanass/rx-otp";
```

or use `CommonJS`:

```javascript
const HOTP = require('@akanass/rx-otp').HOTP;
```

Now, it's easy to perform a generation of `HOTP`:

```typescript
HOTP.generate('12345678901234567890').subscribe(
    token => console.log(token), // display 125165 in the console
    err => console.error(err) // show error in console
);
```

[Back to top](#table-of-contents)

## Browser compatibility

**RX-OTP** can be used in your favorite browser to have all features in your own front application.

Just import `browser/index.js` script and enjoy:

```javascript
<script src="node_modules/@akanass/rx-otp/browser/index.js" type="application/javascript"></script>
<script type="application/javascript">
    const HOTP = ro.HOTP;
    
    HOTP.generate('12345678901234567890').subscribe(
        function(token){
            console.log(token); // display 125165 in the console
        },
        function(err){
            console.error(err); // show error in console
        }
    );
</script>
```

Browser version is a **standalone** version so you just need to `copy/paste` file from `node_modules/@akanass/rx-otp/browser/index.js` when you want to create your bundle and change path to it.

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

* [./documentation/HOTP.md](https://github.com/njl07/rx-otp/blob/master/documentation/HOTP.md)
* [./documentation/TOTP.md](https://github.com/njl07/rx-otp/blob/master/documentation/TOTP.md)
* [./documentation/U2F.md](https://github.com/njl07/rx-otp/blob/master/documentation/U2F.md)

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

* v1.0.0 (2019-03-08)
    * Add **scope** to library and move to **`@akanass/rx-otp`**
    * Rewritten all **library and test files in `Typescript`**
    * Add `typings` support
    * Use `JEST` for testing
    * Use [json-schema](https://json-schema.org/) and [ajv](https://github.com/epoberezkin/ajv) library to validate functions' parameters

[Back to top](#table-of-contents)

## License
Copyright (c) 2019 **Nicolas Jessel**. Licensed under the [MIT license](https://github.com/njl07/rx-otp/blob/master/LICENSE.md).

[Back to top](#table-of-contents)
