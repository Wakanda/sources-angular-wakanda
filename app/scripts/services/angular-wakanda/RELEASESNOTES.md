angular-wakanda.js - release notes
===================================================

##V1.0.3
* $serverRefresh is now deprecated, a warning is displayed on console at each call
* Update dataProvider to latest version
* Optimize some unit test that were too slow

##V1.0.2
* Fix issue with image upload
* Fix issue with $toJSON method
* Fix issue with with object attribute update on entity
* Fix entity creation with related entity on $create parameter

##v1.0.1
* Correct license in package.json
* Add repository in package.json

##v1.0.0
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
