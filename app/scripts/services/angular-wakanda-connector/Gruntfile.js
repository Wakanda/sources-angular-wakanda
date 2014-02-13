module.exports = function(grunt) {

//  require('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-concat-sourcemap');
  
  grunt.initConfig({
    uglify:{
      prod:{
        options:{
          wrap: true
        },
        files: {
          'angular-wakanda-connector.min.js': ['WAF/extra-init.js','WAF/Rest.js','WAF/Data-Provider.js','angular-wakanda-connector.js']
        }
      },
      debug:{
        options:{
          compress: {
            sequences: true,
            properties: true,
            dead_code: true,
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
          'angular-wakanda-connector.debug.min.js': ['WAF/extra-init.js','WAF/Rest.js','WAF/Data-Provider.js','angular-wakanda-connector.js']
        }
      }
    }
  });
  
  grunt.registerTask('build', ['uglify:prod']);
  grunt.registerTask('build-debug', ['uglify:debug']);
  
};