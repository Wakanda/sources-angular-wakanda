#angular-wakanda-front

If you want to directly use the angular-wakanda-connector in a wakanda project, just download the following file : 
`app/scripts/services/angular-wakanda-connector/angular-wakanda-connector.min.js`

If you want to contribute to the development of the connector, read the following instructions.



###Included :

* An angular application, scaffolded with yeoman angular generator in order to follow the yeoman+grunt+bower workflow. You can launch it on a server with `grunt serve` (see bellow).
* A wakanda solution on which the tests are based is included in `WakandaBaseSolution/Contacts`, launch it with Wakanda Server before `grunt serve` (see bellow).


###Needed (only for the development of the connector) :

* node
* Java (only for e2e testing)
* yeoman : `npm install yo -g` (optional this was used to scaffold the project)
* bower `npm install bower -g` (shipped with yeoman)
* grunt `npm install grunt-cli -g` (shipped with yeoman)

For karma unit tests (optional, most of the testing is e2e)

* grunt `npm karma -g` (for unit tests)

For end-to-end unit tests :

* `npm install protractor -g` will install the e2e test runner
* `webdriver-manager update`
* If this didn't work, see the section about it bellow.

You may have to execute those commands with `sudo`

###Init

Once you have all above, to init :

* `npm install` (install the local dependencies)
* `bower install` (install the frontend dependencies)
* `grunt initConfig` (duplicate `wakandaApp.default.json` to wakandaApp.json), **then customize your own settings**
* Go to `app/scripts/services/angular-wakanda-connector` and `npm install` (for this moment, this is necessary for development purposes, more in `app/scripts/services/angular-wakanda-connector/README.md`)

###Grunt tasks :

* `grunt serve` : starts an http server in your app folder (with livereload mode) - don't forget to launch the Wakanda solution in `WakandaBaseSolution/Contacts` (so that the front could call the backend - those requests are proxied).
* `grunt serve:dist` : same as `grunt serve` but builds the projects before in `dist/` 
* `grunt build` builds your project in the `dist/` folder
* To copy your build to your Wakanda Project folder **before, check your wakandaApp.json file** :
    * first run `grunt build`
    * then run `grunt wakCopyBuild` (warning, before copying, it cleans up the WebFolder so be sure of what you set in `wakandaApp.json`)
* You can also copy the sources to your wakanda server webfolder by : `grunt wakCopy`
* `grunt wakInit` will reinit the WebFolder of your Wakanda solution
    
###Tests (end to end)

The tests are end to end tests, not unit tests, since we have statefull tests with the db+REST.

* To launch the tests : 
	* your wakanda server (which is described in `wakandaApp.json`) must be running. It exposes handlers that will reset the database.
	* your node server must be running (you should have done a `grunt serve`)
	* your node server should be running (the tests on the front are made through it)
* To launch the tests, just type : `npm run e2e-test` (this will launch the test on your )

You can also launch the e2e tests directly on the Wakanda server (without using the node server launched with `grunt serve`). You may use it some times to confirm, nothing differs (since it's only front-end code, it shouldn't). For that :

* `grunt wakCopy` will copy your sources to your wakanda project webfolder
* `npm run e2e-test-wak` will run the e2e tests on your wakanda server specified in `wakandaApp.json`

---

###If you had troubles installing protractor

* If `webdriver-manager update` didn't work, look at the log, you may see something like this :
<pre>
Updating selenium standalone
downloading http://selenium-release.storage.googleapis.com/2.42/selenium-server-standalone-2.42.0.jar...
Updating chromedriver
downloading https://chromedriver.storage.googleapis.com/2.10/chromedriver_mac32.zip…
</pre>
* This may be because of some kind of firewall or proxy problem (see [this thread](https://groups.google.com/forum/#!msg/selenium-users/aIIqHBnB_Is/7ws4xCQ84yQJ)), so :
	* direct download both the files (check the urls above) :
		* http://selenium-release.storage.googleapis.com/2.42/selenium-server-standalone-2.42.0.jar
		* https://chromedriver.storage.googleapis.com/2.10/chromedriver_mac32.zip
	* copy them into the node_modules dependency : 
		* `sudo cp /Users/Rosset/Downloads/selenium-server-standalone-2.42.0.jar /usr/lib/node_modules/protractor/selenium/selenium-server-standalone-2.42.0.jar`
		* `sudo cp /Users/Rosset/Downloads/chromedriver_mac32.zip /usr/lib/node_modules/protractor/selenium/chromedriver_mac32.zip`
		* `cd /usr/lib/node_modules/protractor/selenium/`
		* `unzip chromedriver_mac32.zip`
	* finally : `webdriver-manager update`

---

Changes in the Gruntfile.js :

In order to get the REST API, I had to proxy the /rest/* request via grunt-connect-proxy.
Here are the following modifications made to the original yeoman Gruntfile :

* a `proxyMiddleware` is applied to the different connect tasks
* a wakandaApp attribute, containing infos about your wakanda app server was added to the yeoman attribute in the grunt config (from `wakandaApp.json` file)
* for each connect task, a `configureProxies:target` task was added
* added the wakWebFolder target in clean and copy tasks, to be able to transfer your built project to your wakanda WebFolder, just by doing `grunt wakCopyBuild` (expect to have to add --force, I left this warning because it empties the WebFolder before copying the build)
* added watch tasks to rebuild the connector into a closured file with sourcemaps (see more in `app/scripts/services/angular-wakanda-connector/README.md`)
* disabled jsTest in the watch task (since we use e2e tests)