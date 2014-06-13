module.exports = function(grunt) {

  var files = [
    'src/extras/Class.js',
    'src/WAF/extra-init.js',
    'src/WAF/Dates.js',
    'src/WAF/Rest.js',
    'src/WAF/Data-Provider.js',
    'src/angular-wakanda-connector.js'
  ];
  
  var banner = '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */';

//  require('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-concat-sourcemap');
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify:{
      prod:{
        options:{
          banner: banner,
          wrap: true
        },
        files: {
          'angular-wakanda-connector.min.js': files
        }
      },
      debug:{
        options:{
          banner: banner,
          compress: {
            sequences: false,
            properties: false,
            dead_code: false,
            drop_debugger: false,
            unsafe: false,
            unsafe_comps: false,
            conditionals: false,
            comparisons: false,
            evaluate: false,
            booleans: false,
            loops: false,
            unused: false,
            hoist_funs: false,
            hoist_vars: false,
            if_return: false,
            join_vars: false,
            cascade: false,
            side_effects: false,
            pure_getters: false,
            pure_funcs: null,
            negate_iife: false,
            screw_ie8: false,
            drop_console: false,
            angular: false,
            warnings: true
          },
          mangle: false,//keep variable names
          beautify:true,//better to debug
          wrap: true,
          sourceMap: true,
          sourceMapName: 'angular-wakanda-connector.debug.min.js.map'
        },
        files: {
          'angular-wakanda-connector.debug.min.js': files
        }
      }
    }
  });
  
  grunt.registerTask('build', ['uglify:prod']);
  grunt.registerTask('build-debug', ['uglify:debug']);
  
};