#angular-wakanda-front

Scaffolded with yeoman angular generator in order to follow the yeoman+grunt+bower workflow.

Needed :

* node
* yeoman : `npm install yo -g`
* bower (shipped with yeoman)
* grunt (shipped with yeoman)

Once you have all above, to init :

* `npm install`
* `bower install`

To test :

* `grunt serve` (will launch your app in livereload mode)

---

Changes in the Gruntfile.js :

In order to get the REST API, I had to proxy the /rest/* request via grunt-connect-proxy.
Here are the following modifications made to the original yeoman Gruntfile :

* a `proxyMiddleware` is applied to the different connect tasks
* a wakandeApp attribute, containing infos about your wakanda app server was added to the yeoman attribute in the grunt config
* for each connect task, a configureProxies:target task was added