// Protractor configuration for the wakanda server

wakandaApp = require('./wakandaApp');

exports.config = {
  specs : [
    './test/e2e/**/*.js'
  ],
  baseUrl : 'http://'+wakandaApp.host+':'+wakandaApp.port
};