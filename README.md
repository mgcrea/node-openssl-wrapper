# OpenSSL Wrapper

[![project status](https://img.shields.io/badge/status-stable-green.svg?style=flat)](https://github.com/mgcrea/node-openssl-wrapper) [![license](https://img.shields.io/github/license/mgcrea/node-openssl-wrapper.svg?style=flat)](https://tldrlegal.com/license/mit-license) [![build status](http://img.shields.io/travis/mgcrea/node-openssl-wrapper/master.svg?style=flat)](http://travis-ci.org/mgcrea/node-openssl-wrapper) [![dependencies status](https://img.shields.io/david/mgcrea/node-openssl-wrapper.svg?style=flat)](https://david-dm.org/mgcrea/node-openssl-wrapper) [![devDependencies status](https://img.shields.io/david/dev/mgcrea/node-openssl-wrapper.svg?style=flat)](https://david-dm.org/mgcrea/node-openssl-wrapper#info=devDependencies) [![coverage status](http://img.shields.io/codeclimate/coverage/github/mgcrea/node-openssl-wrapper.svg?style=flat)](https://codeclimate.com/github/mgcrea/node-openssl-wrapper) [![climate status](https://img.shields.io/codeclimate/github/mgcrea/node-openssl-wrapper.svg?style=flat)](https://codeclimate.com/github/mgcrea/node-openssl-wrapper)

NodeJS OpenSSL wrapper

## Usage

### Examples

1. Generate an RSA key

``` javascript
import {exec as openssl} from 'openssl-wrapper';
const password = 'github';

return openssl('genrsa', {des3: true, passout: `pass:${password}`, '2048': false}, function(err, buffer) {
	console.log(buffer.toString());
});
```

2. Verify a CMS/SMIME signature & decrypt the CMS/SMIME enveloped data using promises

``` javascript
import Promise from 'bluebird';
import openssl from 'openssl-wrapper';
const opensslAsync = Promise.promisify(openssl.exec);

// Extract enveloped data
return opensslAsync('cms.verify', signedData, {inform: 'DER', noverify: true})
	// Decrypt enveloped data
	.then(opensslAsync('cms.decrypt', data, {inform: 'DER', recip: __dirname + '/myCertificate.crt', inkey: __dirname + '/myCertificate.key'}))
	// Debug decrypted data
	.then((data) =>
		console.log(data);
	)
```

### Available scripts

| **Script** | **Description** |
|----------|-------|
| start | Alias of test:watch |
| test | Run mocha unit tests |
| test:watch | Run and watch mocha unit tests |
| lint | Run eslint static tests |
| compile | Compile the library |
| compile:watch | Compile and watch the library |


## Authors

**Olivier Louvignes**

+ http://olouv.com
+ http://github.com/mgcrea


## License

```
The MIT License

Copyright (c) 2016 Olivier Louvignes

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```
