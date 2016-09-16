angular-wakanda.js - release notes
===================================================

## v1.2.0

* [Bugfix] Update WakandaClient dependency
* [Bugfix] Update WakandaClient dependency to fix :
	* Handling `date` and `simple date` attributes
	* Fix upload/remove files
	* Update only changed attributes of an entity
	* Fix on expanding implicitly related entity after an update
	
* [Bugfix] apply the changes after uploading/removing a file

## v1.1.5

* [Bugfix] Fix bug getting DataClass name for related entities attribute

## v1.1.4

* [Bugfix] Fix issue while calling `$wakanda.init()` with an empty data model

## v1.1.3

* [Bugfix] Update WakandaClient dependency to fix IE9 CustomEvent issue in AngularWakanda

## v1.1.2

* [Bugfix] Fix an issue with `$login` method that could fail when `setHostname()` was used and CORS enabled on Wakanda Server

## v1.1.1

* Correct `$wakanda.init()` issue when calling it multiple times with different parameters, resulting on always returning the first fetched catalog
* `$wakanda.$ds` and `$wakanda.getDataStore()` are now deprecated in favor of `$wakanda.init()` method
* Remove actions on entities are now performed with `POST` HTTP verb instead of `GET`
* Fix issue when passing `Date` objects on `params` attribute of `$query` options parameter
* Update Wakanda-Client dependency to version `0.3.2`

## v1.1.0

Angular-Wakanda now relies on [Wakanda-Client](https://github.com/Wakanda/wakanda-javascript-client) instead of WAF to perform communication with Wakanda Server's REST API.
Angular-Wakanda API have been simplified, removing some old buggy methods, and other that could be ambiguous.

### New features

* Server methods that returns collection or entities now directly return Angular-Wakanda collections or entities. No need to call `$transform` helpers methods anymore.
* Add `$recompute` method, to execute server-side logic (calculated attributes computation, `init` and `clientrefresh` events) on a local entity
* Entity method `$isDeferred()` has been added, to check if an entity has been fetched or is deferred

### API simplification

* `$serverRefresh()` has been deleted. Deprecated since v1.0.2
* `$transform.$objectToEntity()` is now deprecated, call to this method can be safely removed, as the transformation is automatic
* `$transform.$objectToCollection()` is now deprecated, call to this method can be safely removed, as the transformation is automatic
* Entity and collection attribute `$fetching` has been removed
* Collection attribute `$queryParams.filter` has been removed
* Parameter `mode` has been removed from collection `$fetch()` method. `$fetch()` always replace the collection content. To append more content to a collection, use `$more()` method.
* Entity method `$isLoaded()` has been removed

## v1.0.4
* Fix a bug when calling `$create` without argument
* Collection user defined methods are now available on every collections (queried, fetched and expanded)
* Correct `angular` dependency on `bower.json` to avoid conflict on angular version
* Update dataProvider to latest version
* Wakanda Solution: correct authentication issue when stopping/reloading server
* Example application, page `test8` correct invalid calls to `$transform` methods

## v1.0.3
* $serverRefresh is now deprecated, a warning is displayed on console at each call
* Update dataProvider to latest version
* Optimize some unit test that were too slow

## v1.0.2
* Fix issue with image upload
* Fix issue with $toJSON method
* Fix issue with with object attribute update on entity
* Fix entity creation with related entity on $create parameter

## v1.0.1
* Correct license in package.json
* Add repository in package.json

## v1.0.0
* **Breaking change:** `dataClass.$find()` has been renamed to `dataClass.$query()`
* **Breaking change:** `dataClass.$findOne()` has been rename to `dataClass.$find()`
* **Breaking change:** `collection.$find()` has been renamed to `collection.$query()`
* **Breaking change:** `collection.$query` has been renamed to `collection.$queryParams`
* API standardization : all methods that return a promise also return a `$promise` object that contained this promise in order to have a more coherent API. Some methods has been renamed to have more coherence between Angular-Wakanda API and Wakanda Server API (see Breaking Changes).
* Delete reference cache management
* Add `$upload()` method on image attribute type
* Add `dataClass.$all()` method
* Add `$wakanda.$transform` helpers to transform a raw entity returned by server to a Angular-Wakanda entity
* Add `$wakandaConfigProvider` to set Wakanda server hostname on application configuration
* Add `entity.$serverRefresh()` method
* *Image* attribute type handling
* Using getter and setter to read/update entity attributes
* Bug fixes and API stabilization
* Add Unit Test

##v0.4.4
* define matching angularjs version (v1.2.6)

##v0.4.3
* add `$find()` method on collections to create a sub-collection from an existing one.

##v0.4.2
* fixes : pointer returned by $find is now the same as the one passed in its callback, so that it could be correctly used in promise chaining

##v0.4.1
* remove logs on prod build - merge PR from @paulsouche

##v0.4.0
* switched dataClass methods to async by default (if you use some, they now return a promise on which you can attach `.then()`). If you want to keep the previous behavior, you can call the synchronous version with the suffix "Sync".

##v0.3.2
* fix bug in `$findOne`
* added aliases
* fix bug in `$prevPage()`

##v0.3.1
* fix date attribute bug (now always a Date object)
* `$wakanda.$ds` as an attribute (alias of `.getDatastore()`)
* private `$_entity` not enumerable anymore
* upgraded to last version of `Data-Provider.js` and `Rest.js`

##v0.3.0
* changed filename from `angular-wakanda-connector.*` to `angular-wakanda.*`
* changed module name from `wakConnectorModule` to `wakanda`
* changed service name from `wakConnectorService` to `$wakanda`
* adapted build and test routines to new names and paths

##v0.2.0
* added directory API support
* modified a little folder organization of the connector (now sources are in `src` folder)
* setup e2e test environment with protractor
* setup first draft of tests on basic features + tests helpers
* setup publishing tool

##v0.1.1
* nestedCollections :
	* added $totalCount
	* better $query
	* $fetch more stable
	* added $more, $nextPage, $prevPage

##v0.1.0
* $find accepts empty params
* refactored $fetch on nested collections (still under dev)
* $findOne(id,options) - added options param (like in $find)

##v0.0.11
* added $fetch, $toJSON, $isLoaded on nested collection
* integrated patch on error between null and $_deferred (undefined)

##v0.0.10
* fixed another "Converting circular structure to JSON" bug in .$toJSON() method

##v0.0.9
* fixed "Converting circular structure to JSON" bug in .$toJSON() method

##v0.0.8
* $fetch on deferred entities (not yet on collections)
* $isLoaded method (makes it easier to check if your entity/collection was fetched or not)
* user defined collection method at the root of your collection (not on the nested ones)
* added .$toJSON() on entities and root collections (not yet on the nested ones)

##v0.0.7
* added calculated attributes
* 1>n relationships (no deferred, no collection methods)

##v0.0.6
* bug fix on undefined object

##v0.0.5
* added photo src retrieving support

##...
