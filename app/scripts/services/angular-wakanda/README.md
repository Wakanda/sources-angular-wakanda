#angular-wakanda

###Standalone mode

To use this service in your app, add this script to your page :


    <script src="scripts/services/angular-wakanda/angular-wakanda.min.js"></script>


###Debug mode

To use this service in your app, with the debug version, add this script to your page :


    <script src="scripts/services/angular-wakanda/angular-wakanda.debug.min.js"></script>


###Development mode

Run `npm install`, it will install the modules needed to build the minified version of the service.
Then simply run `grunt build` or `grunt build-debug` (if you want the version with sourcemaps)

Watch/reload tasks on the `grunt serve` of the main Gruntfile.js were added, they will automatically rebuild then reload the min file.