# bower-angular-wakanda

[![ angular-wakanda ](http://www.wakanda.org/sites/default/files/medias/128.png)](http://www.wakanda.org/angular-wakanda/)

[![MIT Licensed](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](#license)


*Wakanda® is a registered trademark of WAKANDA SAS in France and/or other countries. All other names mentioned may be trademarks or registered trademarks of their respective owners.*

This repo is for distribution on [Bower](http://bower.io/). You can check out demos
in the [NG-Wakanda-Pack](https://github.com/Wakanda/NG-Wakanda-Pack/) repository.


## EXPERIMENTAL

THIS IS AN ALPHA RELEASE, AND ACTIVE DEVELOPMENT IS ONGOING. THE ANGULAR-WAKANDA CONNECTOR IS UNSTABLE AND NOT FINAL AND SHOULD NOT BE USED IN PRODUCTION (WHATEVER THAT MEANS FOR YOU).

*Fell free to test it for some upcoming project but be aware that it is still incomplete and its API is potentially subject to change.*

## Install

Install with [bower](http://bower.io):

```shell
bower install angular-wakanda
```

Add a `<script>` tag to your `index.html`:

```html
<script src="/bower_components/angular/angular.min.js"></script>
<script src="/bower_components/angular-wakanda/angular-wakanda.min.js"></script>
```

Add `wakanda` as a dependency for your app:

```javascript
angular.module('myApp', ['wakanda']);
```

And finally use the `$wakanda` injected service:

```javascript
$wakanda.init().then(function (ds) {

	$scope.contacts = ds.Contact.$find();

});
```

## Resources

* [Tutorial](https://wakanda.github.io/NG-Wakanda-Pack)
* [Documentation](http://doc.wakanda.org/Wakanda/help/Title/en/page4419.html)
* [Home page](http://www.wakanda.org/angular-wakanda/)
* [Bug tracker](http://beetle.wakanda.org/)
* [Yeoman generator](https://www.npmjs.org/package/generator-angular-wakanda)

## License 

*The MIT License*

Copyright (c) 2015 WAKANDA S.A.S.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
