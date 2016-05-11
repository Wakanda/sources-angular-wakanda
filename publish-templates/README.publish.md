# angular-wakanda - v<%=version%>

[![ angular-wakanda ](https://wakanda.github.io/angular-wakanda/images/angular-wakanda.png)](https://wakanda.github.io/angular-wakanda/)

[![MIT Licensed](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](#license)

This repo is for distribution on `bower` and `npm`. You can check out [10 minutes quickstart](http://wakanda.github.io/angular-wakanda/#/doc/quickstart) to learn how to user angular-wakanda.

The sources for this module are in the main [Wakanda/sources-angular-wakanda](https://github.com/Wakanda/sources-angular-wakanda) repo. Please file pull requests against that repo and issues on  [Wakanda/wakanda-issues](https://github.com/Wakanda/wakanda-issues/labels/Angular-Wakanda).


## Install

Install with [bower](http://bower.io):

```bash
bower install angular-wakanda
```

Or via npm

```bash
npm install angular-wakanda
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

And finally use the `$wakanda` injected factory:

```javascript
$wakanda.init().then(function (ds) {

	$scope.contacts = ds.Contact.$all();

});
```

## Resources

* [Home page, documentation and tutorial](https://wakanda.github.io/angular-wakanda/)
* [Source repo](https://github.com/Wakanda/sources-angular-wakanda)
* [Github issues](https://github.com/Wakanda/wakanda-issues/labels/Angular-Wakanda)

## License

*Wakanda® is a registered trademark of WAKANDA SAS in France and/or other countries. All other names mentioned may be trademarks or registered trademarks of their respective owners.*

*The MIT License*

Copyright (c) 2016 WAKANDA S.A.S.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
