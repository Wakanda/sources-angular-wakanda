// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html

module.exports = function(config) {
  var wakandaApp = require('./test/server.integration.json');
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: [
      'verbose',
      'junit',
      'coverage',
      'html'
    ],

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: [
      'mocha',
      'chai-as-promised',
      // 'sinon-chai',
      'sinon',
      'chai'
    ],

    preprocessors: {
      // source files, that you wanna generate coverage for
      // do not include tests or libraries
      'src/**/*.js' : ['coverage'],
      '**/*.html'   : ['html2js'],
      '**/*.json'   : ['json_fixtures']
    },

    // list of files / patterns to load in the browser
    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'dist/angular-wakanda.js',
      //
      'test/helpers/unitTestsHelpers.js',
      'test/helpers/rootScopeSafeApply.js',
      //
      'test/spec/services/unitTestsPolyfill.js',
      'test/spec/*-spec.js'
    ],

    proxies:  {
      '/rest': wakandaApp.host + ':' + wakandaApp.port + '/rest',
      '/unit-tests': wakandaApp.host + ':' + wakandaApp.port + '/unit-tests'
    },

    // the default configuration
    junitReporter: {
      outputDir: './reports',
      outputFile: './reports/result/test-results.xml',
      suite: ''
    },
    // jshintPreprocessor: {
    //   jshintrc: '.jshintrc'
    // },
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
    port: 9876,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // mocha config
    client: {
      mocha: {
        timeout : 6000 // 6 seconds - upped from 2 seconds to allow slow emulators to complete
      }
    },
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
