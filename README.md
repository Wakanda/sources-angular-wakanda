#angular-wakanda-front

![ angular-wakanda ](http://www.wakanda.org/sites/default/files/medias/128.png)

Welcome to the **source repository** of the **angular-wakanda connector**. You'll find here the whole environment that lets us develop the connector.

**If you only wish to retrieve the connector itself**, just get it from bower `bower install angular-wakanda` or from the publish repo [Wakanda/bower-angular-wakanda](https://github.com/Wakanda/bower-angular-wakanda).

##Included

* An angular application, originally scaffolded with yeoman angular generator (v0.7.1) with some changes, mainly on the Gruntfile - see [FAQ for more infos](#faq).
	* Use cases & tests controllers
	* Source code of the connector
	* Dev routines (build ...) for the connector
	* Publish routines for the connector
* A wakanda solution containing a data model + routines to populate the data base with mock data that can be launched by the Wakanda Server.

##Setup

###Prerequisites

* Wakanda Server
* NodeJS
* Java (only for e2e testing)

###Install

You'll need the following global npm packages :

* bower : `npm install bower -g`
* grunt (cli) : `npm install grunt-cli -g`
* protractor : `npm install protractor -g`
	* see [protractor doc](http://angular.github.io/protractor/#/) for more install infos
	* or get to the [FAQ section about protractor](#faq)

###Init

Once you've installed global dependencies (or if you already have them), execute the following steps to init your working environment :

* `npm install`
* `bower install`
* `grunt initConfig` (duplicates `/wakandaApp.default.json` to `/wakandaApp.json`)
	* That specific file will be ignored on commit
	* This is so that you could specify which host/port/webfolder Wakanda Solution you wan't to bind to (if you were to change the port of the Wakanda Solution for example)
* Go to `/app/scripts/services/angular-wakanda` and `npm install`
	* will install the dependencies the connector relies on for building/publishing
	* the node_modules are separated so that the end users could also have such routines on bower and publish repo

###Run

You'll launch two servers :

* Backend : Wakanda Server, on the solution `/WakandaBaseSolution/Contacts`
* Frontend : A node (connect) server, serving the angular application in `/app` :
	* which is containing the connector
	* lives reload on changes
	* proxies request to the backend

####Wakanda Server

Find the path where you installed your Wakanda Server, then, at the root of the project, launch this kind of command line (you can also launch the solution from the Studio if you want) :

`/Users/path/to/your/wakanda/server/Wakanda\ Enterprise\ Server.app/Contents/MacOS/Wakanda\ Enterprise\ Server WakandaBaseSolution/Contacts/Contacts\ Solution/Contacts.waSolution`

####Development Server

The Gruntfile.js at the root of the project provides tasks to ease your work.

**TL;DR** : Use `grunt serve`

* launch dev server : `grunt serve` : starts an http server in your app folder (with livereload mode) - don't forget to [launch your Wakanda Server](#wakanda-server) (so that the front could call the backend - those requests are proxied).
* `grunt build` builds the angular project into the `/dist` folder
* `grunt serve:dist` : same as `grunt serve` but builds the projects before in `/dist` and serves `/dist`

#####Bypass node server / proxy

Previous commands are about the dev server under node that acts like a frontend which dialog with the backend (Wakanda Server), via a proxy, you may want to check your code directly served by a Wakanda server. There are grunt tasks for that !

* To copy your build to your Wakanda Project folder **before, check your wakandaApp.json file** :
    * `grunt build`
    * `grunt wakCopyBuild` (warning, before copying, it cleans up the WebFolder so be sure of what you set in `wakandaApp.json`) - will copy `/dist` content to `WakandaBaseSolution/Contacts/Contacts/WebFolder` (or the specified Webfolder you set in `wakandaApp.json`)
* `grunt wakCopy` : same as above, but will copy the `/app` folder to the `WakandaBaseSolution/Contacts/Contacts/WebFolder` (great for debug)
* `grunt wakInit` : will reinit the WebFolder of your Wakanda solution

###Test

The connector is based on the `Data-Provider.js` from our own WAF framework. Among other things, it handles the rest requests to the Wakanda Server API. Since we can't mock all the behaviors of the rest API, the tests are end to end tests via protractor.

Handlers are exposed on the Wakanda Solution to reset the database at will, so that each time a test suite runs, it starts with a clean db (we know exactly what's in it). You'll see in `/app` some controllers dedicated to e2e-tests and some directives that ease the calls to reset the db.

Before launching any test : 

* launch your [Wakanda Server](#wakanda-server)
* launch your [development server](#development-server) `grunt serve`

Then `npm run e2e-test` : will run the tests specified in `/test/e2e`

Another set of commands is available :

* `npm run e2e-test-tool` will run the e2e tests only on the e2e helpers (assert that the helpers used in test correctly work - not included by default because takes more times and this kind of code doesn't change much, it's not related to the connector)
* `npm run e2e-test-all` run tests on connectors and tools

To launch the tests directly on the Wakanda Server described in `/wakandaApp.json` : first run `grunt wakCopy` ([refer to this section for more infos](#development-server)), then use either one of the following command lines :

* `npm run e2e-test-wak`
* `npm run e2e-test-wak-tool`
* `npm run e2e-test-wak-all`

##Contributing

###Repository organization

The organization of our github repo is simple :

* `master` branch : contains the version that was publicly released - no commits there, only merges from `develop`
* `develop` branch : contains the current version in development - feature branches are integrated to it when finished
* `feature/*` branches : temporary branches for feature development, meant to be merged to `develop` when finished

You want to contribute ?

* Fork the repo
* `git checkout develop` : switch on the develop branch
* `git checkout -b feature/my-awesome-feature` : creature your own branch and switch on it

Then just push this branch to your repo and once you've finished your feature, ask for a pull request to merge with `develop`.

*Note for Wakanda Team developers* : no need to fork the repo, you'll have push permission on it.

###Code organization

* `/` : The root from where you'll lauch the main grunt tasks, the main npm install.
* `WakandaBaseSolution/Contacts`: A Wakanda Solution you launch with a Wakanda Server. It contains :
	* a data model of a db with Employee/Company + Products
	* fixtures to apply to those models
	* specific handlers that will reset the db
* `/app` : A regular angular app (with a router, directives, services and all ...)
* `/app/scripts/services/angular-wakanda` : **This is the folder containing the source code of the connector** :
	* `./publish` : (Wakanda team specific) see [sections bellow](#publishing-releases)
	* `./src`: contains the source files of the connector
		* `./angular-wakanda.js` : this is the **main file of the connector** (the other are dependencies). **This is where you'll code**.

##Publishing releases

*Notes* :

* **This section is specific to Wakanda team members** which are in charge of publishing releases.
* This part could be more automated

The [Wakanda/bower-angular-wakanda](https://github.com/Wakanda/bower-angular-wakanda) repo is where you'll publish each releases. Once pushed and tagged, they will be accessible via `bower install angular-wakanda`.

A set of tasks are already here to automate the following steps (it still can be enhanced).

###Setup publish repo

1. Go to `/app/scripts/services/angular-wakanda`
2. `git clone https://github.com/Wakanda/bower-angular-wakanda.git publish`

Now you have a `publish` directory :

* linked to the [Wakanda/bower-angular-wakanda](https://github.com/Wakanda/bower-angular-wakanda) repo
* which is ignored on commit by your current source repo.

###Prepare release

Stop any livereload server you launched (to make sure that no file will be re-built unless you explicitly want to).

Once you've finished a set of features for a version and merged them to `develop` branch :

* **Upgrade the version** in the 2 following `package.json` files :
	* `/package.json`
	* `/app/scripts/services/angular-wakanda/package.json`
* Upgrade the `/app/scripts/services/angular-wakanda/RELEASESNOTES.md`
* Optional :
	* If you want to upgrade the `bower.json` file that will be shipped to the publish repo, upgrade its template : `/app/scripts/services/angular-wakanda/bower.publish.json` (the version is automatically retrieved from `/app/scripts/services/angular-wakanda/package.json` version attribute)
	* If you want to upgrade the `README.md` file that will be shipped to the publish repo, upgrade its template : `/app/scripts/services/angular-wakanda/README.publish.md`

At this point :

* make a commit "bump to vX.Y.Z"
* git merge to `master`
* git tag your commit as "vX.Y.Z"
* git push branches `master` and `develop` with your tag (you should do this step at the same time you push to the publish repo, so that source / publish repos and bower are updated at the exact same moment)

###Pre-publish release

Before publishing a release, you'll have to go through the build step (building the files that will be released). So, if you didn't do the following steps after [the prepare release step](#prepare-release) and before [the publish release step](#publish-release) :

In `/app/scripts/services/angular-wakanda` :

* run `grunt build` - this will create the production ready connector `angular-wakanda.min.js`
* run `grunt build-debug` (this task is the one run by the livereload service, since you may have stopped it, you need to re-run it to have the correct version in the header of the file). It creates :
	* `angular-wakanda.debug.min.js` : the connector, not minified and with sourceMaps, so that end users could debug it
	* `angular-wakanda.debug.min.js.map` : the sourceMaps of the previous file

###Publish release

Now we'll publish to [the publish repo](https://github.com/Wakanda/bower-angular-wakanda). In `/app/scripts/services/angular-wakanda`, run `grunt publish`. This will copy the needed files to the `./publish` folder (some files based on templating).

* `cd publish` - You are now in the [local publish repo](https://github.com/Wakanda/bower-angular-wakanda)
* git commit with a message like "bump to vX.Y.Z"
* git tag your commit as "vX.Y.Z"
* push to origin

Then draft this [release on the github publish repo](https://github.com/Wakanda/bower-angular-wakanda/releases) :

* choose your tag
* in the description, add what you wrote inside the `RELEASESNOTES.md` + a link to the changelog with the previous version (you can take an example on the previous releases)

Once you are there :

* The source repo is up to date, with a tag "vX.Y.Z" on github
* The publish repo is up to date with a tag "vX.Y.Z" on github
	* It has a changelog
	* It has a drafted release with the list of features you made + a link to see the diff with the previous revision
* Since the publish repo is up to date `bower install angular-wakanda` is also up to date


##FAQ

###Why did you use a node server ?

To benefit from the set of tools the node/npm community provides (which most JavaScript developers will know), such as :

* task runners (lots of automated jobs)
* build tools (uglify)
* development tools (live reload, proxies ...)

All that put together, you get a great development experience AND use tools anybody can take over.

###What changes did you make on the main Gruntfile.js ?

The main Gruntfile.js is based on the one provided by the yeoman angular-generator. But of course, it has been modified to suits our needs :

* proxy : the dev server makes a proxy to your Wakanda Server (host and port are configurable in `/wakandaApp.json` - you could use a remote server - we also provide a [yeoman generator to scaffold your angular wakanda projects](https://github.com/wakanda/generator-angular-wakanda))
* build (connector) : you'll see a specific Gruntfile.js in `/app/scripts/services/angular-wakanda` which is in charge of building the connector (either in dev or production mode). So, when we make a release, people can continue to update source code and run the build routine, without having this whole source repo.
* watch : continuous watch / rebuild of the connector is run so that you don't have to bother about launching that part manually (sourceMaps are here so that you could also debug it with the source files)
* publish (project) : A whole set of grunt tasks such as `grunt build`, `grunt wakCopy` or `grunt wakCopyBuild` are here to help you publish the project to the Wakanda server if you want - [see development server section](#development-server).

###Why are there two repos ?

So that when you do a `bower install` or clone the publish repo, you don't end up with this whole factory that not only contains the connector but all the tools and workflow needed around to make it (that you won't need when you only use the connector and don't bother how it was made or about contributing).

When you're reaching for a one file JavaScript connector, you don't expect to get a backend project (with fixtures), a frontend project and each one with their build routines ...

###How do you feed the database ?

In `WakandaBaseSolution/Contacts/Import` you can see fixtures files which are processed by methods in `WakandaBaseSolution/Contacts/Modules/unitTestsHelpers.js`. Those methods are exposed as http handlers so that the frontend could launch them (you'll see custom directives I made that are in charge of that in `/app/scripts/directives`).

###How can I use this architecture for my own angular-wakanda project ?

You can use this king of code organization for your angular-wakanda if you want (in your case, you wouldn't need all the routines that we use to develop the connector, but you could totally dev your project, build it, ship it ...).

You should also check out our [yeoman generator](https://github.com/Wakanda/generator-angular-wakanda).