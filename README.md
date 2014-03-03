#angular-wakanda-front

If you want to directly use the angular-wakanda-connector : [get it here](master/app/scripts/services/angular-wakanda-connector).

Scaffolded with yeoman angular generator in order to follow the yeoman+grunt+bower workflow.

###Included :

A wakanda solution on which the tests are based is included : **Contact.zip** - extract it anywhere, launch it with Wakanda Server before `grunt serve` (see bellow).

###Needed :

* node
* yeoman : `npm install yo -g` (optional this was used to scaffold the project)
* bower `npm install bower -g` (shipped with yeoman)
* grunt `npm install grunt -g` (shipped with yeoman)
* grunt `npm karma grunt -g` (for unit test - though there arent many for the moment)

###Init

Once you have all above, to init :

* `npm install` (install the local dependencies)
* `bower install` (install the frontend dependencies)
* Go to `app/scripts/services/angular-wakanda-connector` and `npm install` (for this moment, this is necessary for development purposes, more in `app/scripts/services/angular-wakanda-connector/README.md`)

Last step : duplicate `wakandaApp.default.json` to wakandaApp.json and set your own settings

###Grunt tasks :

* To test (will launch a test server) : `grunt serve` (will launch your app in livereload mode)
* To test in build mode (will build AND launch a server) : `grunt serve:dist`
* To build only : `grunt build` (your build is in `dist` flder)
* To copy your build to your Wakanda Project folder :
    * first run `grunt build`
    * then run `grunt wakCopyBuild` probably with `--force` (warning, before copying, it cleans up the WebFolder so be sure of what you set in wakandaApp.json)

---

Changes in the Gruntfile.js :

In order to get the REST API, I had to proxy the /rest/* request via grunt-connect-proxy.
Here are the following modifications made to the original yeoman Gruntfile :

* a `proxyMiddleware` is applied to the different connect tasks
* a wakandaApp attribute, containing infos about your wakanda app server was added to the yeoman attribute in the grunt config (from `wakandaApp.json` file)
* for each connect task, a `configureProxies:target` task was added
* added the wakWebFolder target in clean and copy tasks, to be able to transfer your built project to your wakanda WebFolder, just by doing `grunt wakCopyBuild` (expect to have to add --force, I left this warning because it empties the WebFolder before copying the build)
* added watch tasks to rebuild the connector into a closured file with sourcemaps (see more in `app/scripts/services/angular-wakanda-connector/README.md`)