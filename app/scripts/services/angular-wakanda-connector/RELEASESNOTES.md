angular-wakanda-connector.js vAlpha - release notes
===================================================

Understand this module is still under development and the current releases are alpha versions.

The versions provided can be unstable, the features may not be finished. I'll try to keep this document up to date (it may not be completly accurate).

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