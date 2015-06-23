// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
  var wakandaApp = require('./wakandaApp.json');
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: [
      'dots',
      'junit',
      'coverage',
      'html'
    ],

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: [
      'mocha',
      'sinon',
      'chai'
    ],

    preprocessors: {
      // source files, that you wanna generate coverage for
      // do not include tests or libraries
      'app/scripts/services/angular-wakanda/src/angular-wakanda.js' : ['coverage'],
      '**/*.html'   : ['html2js'],
      '**/*.json'   : ['json_fixtures']
    },

    // list of files / patterns to load in the browser
    files: [
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/bower_components/angular-resource/angular-resource.js',
      'app/bower_components/angular-cookies/angular-cookies.js',
      'app/bower_components/angular-sanitize/angular-sanitize.js',
      'app/bower_components/angular-route/angular-route.js',
      // APP
      'app/scripts/app.js',
      // WAF libraries injection
      'app/scripts/services/angular-wakanda/src/WAF/extra-init.js',
      'app/scripts/services/angular-wakanda/src/WAF/Dates.js',
      'app/scripts/services/angular-wakanda/src/WAF/Data-Provider.js',
      'app/scripts/services/angular-wakanda/src/WAF/Rest.js',
      // extras
      'app/scripts/services/angular-wakanda/src/extras/Class.js',
      // angular-wakanda
      'app/scripts/services/angular-wakanda/src/angular-wakanda.js',
      // helpers
      'app/scripts/services/unitTestsHelpers.js',
      'app/scripts/services/rootScopeSafeApply.js',
      'app/scripts/controllers/*.js',
//      'test/mock/**/*.js',
      'test/spec/**/*spec.js'
    ],
    
    proxies:  {
      '/rest': 'http://'+wakandaApp.host+':'+wakandaApp.port+'/rest',
      '/unit-tests': 'http://'+wakandaApp.host+':'+wakandaApp.port+'/unit-tests'
    },

    // the default configuration
    junitReporter: {
      outputFile: './reports/result/test-results.xml',
      suite: ''
    },
    jshintPreprocessor: {
      jshintrc: '.jshintrc'
    },
    // optionally, configure the reporter
    coverageReporter: {
      reporters: [
        {type: 'cobertura', subdir: '.', dir: './reports/coverage/'},
        {type: 'html', subdir: '.', dir: './reports/html/'}
      ]
    },
    htmlReporter: {
      reportName: 'tests',
      outputDir: './reports/html/',
      namedFiles: true
    },

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 9001,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true
  });
};
