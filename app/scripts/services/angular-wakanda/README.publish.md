# bower-angular-wakanda

This repo is for distribution on `bower`. The source for this module is currently
in the [NG-Wakanda-Pack repo](https://github.com/AMorgaut/NG-Wakanda-Pack/).
Please file [issues](https://github.com/AMorgaut/NG-Wakanda-Pack/issues) and [pull requests](https://github.com/AMorgaut/NG-Wakanda-Pack/pulls) against that repo.

## Warning

**Angular-Wakanda is not ready for prodution**

Fell free to test it for some upcoming project but be aware that it is still incomplete and its API potentially subject to change.

## Install

Install with [bower](http://bower.io):

```shell
bower install angular-wakanda
```

Add a `<script>` tags to your `index.html`:

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

## Documentation

[Tutorial](http://ng-wakanda-pack.us.wak-apps.com/) 
& [Documentation](https://github.com/AMorgaut/NG-Wakanda-Pack/blob/master/API-DOC.md) 
are curently available in the [NG-Wakanda-Pack](https://github.com/AMorgaut/NG-Wakanda-Pack/).

## License

This connector use the Wakanda Framework data provider and share its dual (GPL/Commercial) [Wakanda License](http://wakanda.org/license)
