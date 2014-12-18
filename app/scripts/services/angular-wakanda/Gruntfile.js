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

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-concat-sourcemap');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify:{
      prod:{
        options:{
          banner: banner,
          wrap: true,
          compress: {
            drop_console: true
          }
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
    },
    copy:{
      publishBower:{
        files:[
          {expand: true, src: ['src/**'], dest: 'publish/'},
          {src: ['README.publish.md'], dest: 'publish/README.md'},
          {src: ['RELEASESNOTES.md'], dest: 'publish/RELEASESNOTES.md'},
          {src: ['angular-wakanda.debug.min.js'], dest: 'publish/angular-wakanda.debug.min.js'},
          {src: ['angular-wakanda.debug.min.js.map'], dest: 'publish/angular-wakanda.debug.min.js.map'},
          {src: ['angular-wakanda.debug.min.js.map'], dest: 'publish/angular-wakanda.debug.min.js.map'},
          {src: ['angular-wakanda.min.js'], dest: 'publish/angular-wakanda.min.js'},//most important !!!
          {src: ['package.json'], dest: 'publish/package.json'},
          {src: ['Gruntfile.js'], dest: 'publish/Gruntfile.js'}
        ]
      }
    },
    clean:{
      publishBower:{
        files : [{
          dot:false,
          src:[
            'publish/*',
            'publish/src/*',
            '!publish/.git*'
          ]
        }]
      }
    }
  });

  grunt.registerTask('build', ['uglify:prod']);
  grunt.registerTask('build-debug', ['uglify:debug']);

  //simply call (the following command with your specified version) example : grunt publish:0.5.2
  grunt.registerTask('publish-bowerFile',function(target){
    var bowerJson = grunt.file.readJSON('bower.publish.json');
    var version = target;
    var toJson = JSON.stringify(bowerJson,null,'  ');
    toJson = toJson.replace('<%=version%>',version);
    grunt.file.write('publish/bower.json',toJson);
  });

  //just call grunt publish (will publish the angular connector in publish folder, ready to go for bower with the version number set in the package.json)
  grunt.registerTask('publish',function(){
    var version = grunt.config.get('pkg').version;
    grunt.log.write("Publishing version "+version);
    grunt.task.run('clean:publishBower');
    grunt.task.run('copy:publishBower');
    grunt.task.run('publish-bowerFile:'+version);
  });

};