#angular-wakanda-connector

To use this service in your app, add the scripts in this order to your page :


    <script src="scripts/services/angular-wakanda-connector/WAF/extra-init.js"></script>
    <script src="scripts/services/angular-wakanda-connector/WAF/Rest.js"></script>
    <script src="scripts/services/angular-wakanda-connector/WAF/Data-Provider.js"></script>
    <script src="scripts/services/angular-wakanda-connector/angular-wakanda-connector.js"></script>

Run `npm install`, it will install the modules needed to build the minified version of the service.
Then simply run `grunt build` or `grunt build-debug` (if you want the version with sourcemaps)

Watch/reload tasks on the `grunt serve` of the main Gruntfile.js were added, they will automatically rebuild then reload the min file.

In development, the above lines are changed to :

    <script src="scripts/services/angular-wakanda-connector/angular-wakanda-connector.debug.min.js"></script>