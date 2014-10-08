angular-wakanda.js vAlpha - release notes
===================================================

Understand this module is still under development and the current releases are alpha versions.

The versions provided can be unstable, the features may not be finished. I'll try to keep this document up to date (it may not be completly accurate).

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
* setup e2e test environnement with protractor
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
* 1>n relationships (no deffered, no collection methods)

##v0.0.6
* bug fix on undefined object

##v0.0.5
* added photo src retrieving support

##...