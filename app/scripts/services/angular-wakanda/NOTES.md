Angular-Wakanda Notes
=====================
There is an ongoing refactor between the v0.4.x and the v0.5.x, this document aims to keep a list of :

* the APIs / features added
* the differences between the two versions

Keep in mind this is an ongoing process (the work is still in progress). Anything written here won't be final until the release of the v0.5


##Public APIs added :

###NgWakEntity

* `$key()` : returns the key of the entity
* `$stamp()` : returns the stamp of the entity
* `$isNew()` : returns true if the entity was created front-side and is not yet saved

###NgWakEntityCollection

* `$find()` : returns a new collection fro the current collection (feature from the v0.4.3 to merge)

###$wakanda.$ds

##Temporary regressions

* You can auto expand on n>1 relationships but not yet on 1>n (next sprint)