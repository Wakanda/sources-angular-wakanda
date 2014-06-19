/**
 * Protractor configuration
 * 
 * This configuration is dynamic.
 * Some tests don't need to be checked every time (the tool ones).
 * By default, it will test on localhost:9000, but you can launch tests on your own wakanda project after doing a grunt wakCopy
 * 
 * To launch them, use the npm run command lines defined in the package.json like npm run e2e-test (there are more)
 */

exports.config = (function(){
  
  var baseUrl = 'http://localhost:9000';
  var specs = [];
  specs.push('./test/e2e/**/*.launch.js');
  
  if(process.argv.indexOf('--run-tool') > -1){
    specs.push('./test/e2e/**/*.tool.js');
  }
  if(process.argv.indexOf('--run-spec') > -1){
    specs.push('./test/e2e/**/*.spec.js');
  }
  if(process.argv.indexOf('--test-wak') > -1){
    wakandaApp = require('./wakandaApp');
    baseUrl = 'http://'+wakandaApp.host+':'+wakandaApp.port;
  }
  
  return {
    specs : specs,
    baseUrl : baseUrl
  };
  
})();