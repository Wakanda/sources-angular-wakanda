module.exports = function(grunt) {

  var files = [
    'src/extras/Class.js',
    'src/WAF/extra-init.js',
    'src/WAF/Dates.js',
    'src/WAF/Rest.js',
    'src/WAF/Data-Provider.js',
    'src/angular-wakanda.js'
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
          'angular-wakanda.min.js': files
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
          sourceMapName: 'angular-wakanda.debug.min.js.map'
        },
        files: {
          'angular-wakanda.debug.min.js': files
        }
      }
    }
  });
  
  grunt.registerTask('build', ['uglify:prod']);
  grunt.registerTask('build-debug', ['uglify:debug']);
  
  //simply call (the following command with your specified version) example : grunt publish 0.5.2
  grunt.registerTask('publish-bowerFile',function(target){
    var bowerJson = grunt.file.readJSON('bower.publish.json');
    var version = target;
    var toJson = JSON.stringify(bowerJson,null,'  ');
    toJson = toJson.replace('<%=version%>',version);
    grunt.file.write('publish/bower.json',toJson);
  });
  
  grunt.registerTask('publish',function(target){
    if(target === null){
      grunt.fail.warn("Must specify version number");
    }
    var version = target;
    grunt.file.copy('angular-wakanda.min.js','publish/angular-wakanda.min.js');
    grunt.file.copy('README.publish.md','publish/README.md');
    grunt.file.copy('RELEASESNOTES.md','publish/RELEASESNOTES.md');
    grunt.task.run('publish-bowerFile:'+target);
  });
  
};