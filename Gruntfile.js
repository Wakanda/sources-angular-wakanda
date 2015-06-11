// Generated on 2014-01-08 using generator-angular 0.7.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function(grunt) {
    
    var wakandaApp;
    
    try{
        wakandaApp = require('./wakandaApp.json');
    }
    catch(e){
        var currentTaskFromCli = process.argv.slice(2);
        if(currentTaskFromCli.length && currentTaskFromCli[0] !== 'initConfig'){
            grunt.fail.warn('wakandaApp.json file missing. Please run grunt initConfig to create it and then customize it');
        }
    }

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);
    
    //to proxy the /rest/* request to your wakanda server
    var proxyMiddleware = function (connect, options) {
        var middlewares = [];
        var directory = options.directory || options.base[options.base.length - 1];
        if (!Array.isArray(options.base)) {
            options.base = [options.base];
        }
        // Setup the proxy
        middlewares.push(require('grunt-connect-proxy/lib/utils').proxyRequest);

        options.base.forEach(function(base) {
            // Serve static files.
            middlewares.push(connect.static(base));
        });

        // Make directory browse-able.
        middlewares.push(connect.directory(directory));
        return middlewares;
    };

    // Define the configuration for all the tasks
    grunt.initConfig({
        // Project settings
        yeoman: {
            // configurable paths
            app: require('./bower.json').appPath || 'app',
            dist: 'dist',
            publishConnectorDir : 'published-connector',
            wakandaApp : wakandaApp
        },
        // Watches files for changes and runs tasks based on the changed files
        watch: {
            js: {
                files: ['<%= yeoman.app %>/scripts/{,*/}*.js'],
                tasks: ['newer:jshint:all'],
                options: {
                    livereload: true
                }
            },
            "angular-wakanda-service-reload": {
                files: [
                  '<%= yeoman.app %>/scripts/services/angular-wakanda/src/angular-wakanda.debug.min.js',
                  '<%= yeoman.app %>/scripts/services/angular-wakanda/src/angular-wakanda.debug.min.js.map',
                  '<%= yeoman.app %>/scripts/services/angular-wakanda/src/angular-wakanda.js',
                  '<%= yeoman.app %>/scripts/services/angular-wakanda/src/WAF/*.js'
                ],
                options: {
                    livereload: true
                }
            },
            "angular-wakanda-service-build": {
                files: [
                  '<%= yeoman.app %>/scripts/services/angular-wakanda/src/angular-wakanda.js',
                  '<%= yeoman.app %>/scripts/services/angular-wakanda/src/WAF/*.js'
                ],
                tasks: ['wakConnector-build-debug']
            },
//            jsTest: {
//                files: ['test/spec/{,*/}*.js'],
//                tasks: ['newer:jshint:test', 'karma']
//            },
            styles: {
                files: ['<%= yeoman.app %>/styles/{,*/}*.css'],
                tasks: ['newer:copy:styles', 'autoprefixer']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= yeoman.app %>/{,*/}*.html',
                    '.tmp/styles/{,*/}*.css',
                    '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },
        // The actual grunt server settings
        connect: {
            proxies : [
                {
                    context: '/rest',
                    host: '<%= yeoman.wakandaApp.host %>',
                    port: '<%= yeoman.wakandaApp.port %>',
                    https: false,
                    changeOrigin: false,
                    xforward: false
                },
                {
                    context: '/unit-tests',
                    host: '<%= yeoman.wakandaApp.host %>',
                    port: '<%= yeoman.wakandaApp.port %>',
                    https: false,
                    changeOrigin: false,
                    xforward: false
                }
            ],
            options: {
                port: 9000,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: 'localhost',
                livereload: 35729
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        '.tmp',
                        '<%= yeoman.app %>'
                    ],
                    middleware: proxyMiddleware
                }
            },
            test: {
                options: {
                    port: 9001,
                    base: [
                        '.tmp',
                        'test',
                        '<%= yeoman.app %>'
                    ],
                    middleware: proxyMiddleware
                }
            },
            dist: {
                options: {
                    base: '<%= yeoman.dist %>',
                    middleware: proxyMiddleware
                }
            }
        },
        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%= yeoman.app %>/scripts/{,*/}*.js'
            ],
            test: {
                options: {
                    jshintrc: 'test/.jshintrc'
                },
                src: ['test/spec/{,*/}*.js']
            }
        },
        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                        dot: true,
                        src: [
                            '.tmp',
                            '<%= yeoman.dist %>/*',
                            '!<%= yeoman.dist %>/.git*'
                        ]
                    }]
            },
            wakWebFolder: {
                files: [{
                        dot: true,
                        src: [
                            '<%= yeoman.wakandaApp.wakWebFolder %>/*',
                            '!<%= yeoman.wakandaApp.wakWebFolder %>/.git*'
                        ]
                    }]
            },
            server: '.tmp',
            publishConnector : '<%= yeoman.publishConnectorDir %>/*',
            publishConnectorReadMe: '<%= yeoman.publishConnectorDir %>/README.publish.md'
        },
        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [{
                        expand: true,
                        cwd: '.tmp/styles/',
                        src: '{,*/}*.css',
                        dest: '.tmp/styles/'
                    }]
            }
        },
        // Automatically inject Bower components into the app
        'bower-install': {
            app: {
                html: '<%= yeoman.app %>/index.html',
                ignorePath: '<%= yeoman.app %>/'
            }
        },
        // Renames files for browser caching purposes
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= yeoman.dist %>/scripts/{,*/}*.js',
                        '<%= yeoman.dist %>/styles/{,*/}*.css',
                        '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                        '<%= yeoman.dist %>/styles/fonts/*'
                    ]
                }
            }
        },
        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            html: '<%= yeoman.app %>/index.html',
            options: {
                dest: '<%= yeoman.dist %>'
            }
        },
        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
            options: {
                assetsDirs: ['<%= yeoman.dist %>']
            }
        },
        // The following *-min tasks produce minified files in the dist folder
        imagemin: {
            dist: {
                files: [{
                        expand: true,
                        cwd: '<%= yeoman.app %>/images',
                        src: '{,*/}*.{png,jpg,jpeg,gif}',
                        dest: '<%= yeoman.dist %>/images'
                    }]
            }
        },
        svgmin: {
            dist: {
                files: [{
                        expand: true,
                        cwd: '<%= yeoman.app %>/images',
                        src: '{,*/}*.svg',
                        dest: '<%= yeoman.dist %>/images'
                    }]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [{
                        expand: true,
                        cwd: '<%= yeoman.dist %>',
                        src: ['*.html', 'views/{,*/}*.html'],
                        dest: '<%= yeoman.dist %>'
                    }]
            }
        },
        // Allow the use of non-minsafe AngularJS files. Automatically makes it
        // minsafe compatible so Uglify does not destroy the ng references
        ngmin: {
            dist: {
                files: [{
                        expand: true,
                        cwd: '.tmp/concat/scripts',
                        src: '*.js',
                        dest: '.tmp/concat/scripts'
                    }]
            }
        },
        // Replace Google CDN references
        cdnify: {
            dist: {
                html: ['<%= yeoman.dist %>/*.html']
            }
        },
        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                        expand: true,
                        dot: true,
                        cwd: '<%= yeoman.app %>',
                        dest: '<%= yeoman.dist %>',
                        src: [
                            '*.{ico,png,txt}',
                            '.htaccess',
                            '*.html',
                            'views/{,*/}*.html',
                            'bower_components/**/*',
                            'images/{,*/}*.{webp}',
                            'fonts/*'
                        ]
                    }, {
                        expand: true,
                        cwd: '.tmp/images',
                        dest: '<%= yeoman.dist %>/images',
                        src: ['generated/*']
                    }]
            },
            wakInit:{
                src: '<%= yeoman.wakandaApp.wakWebFolder %>/../Import/index.original.html',
                dest : '<%= yeoman.wakandaApp.wakWebFolder %>/index.html'
            },
            wakWebFolder: {
                files: [{
                        expand: true,
                        dot: true,
                        cwd: '<%= yeoman.app %>',
                        dest: '<%= yeoman.wakandaApp.wakWebFolder %>',
                        src: [
                            '*.{ico,png,txt}',
                            '.htaccess',
                            '*.html',
                            'views/*.html',
                            'views/**/*.html',
                            'scripts/*.js',
                            'scripts/**/*.js',
                            'scripts/**/*.{md,map}',
                            '!scripts/**/node_modules/**',
                            'styles/*.css',
                            'styles/**/*.css',
                            'bower_components/**/*',
                            'images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                            'fonts/*'
                        ]
                    }]
            },
            wakWebFolderBuild: {
                files: [{
                        expand: true,
                        dot: true,
                        cwd: '<%= yeoman.dist %>',
                        dest: '<%= yeoman.wakandaApp.wakWebFolder %>',
                        src: [
                            '*.{ico,png,txt}',
                            '.htaccess',
                            '*.html',
                            'views/{,*/}*.html',
                            'scripts/{,*/}*.js',
                            'styles/{,*/}*.css',
                            'bower_components/**/*',
                            'images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                            'fonts/*'
                        ]
                    }]
            },
            wakandaConfig: {
                src: 'wakandaApp.default.json',
                dest : 'wakandaApp.json'
            },
            styles: {
                expand: true,
                cwd: '<%= yeoman.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            },
            publishConnector: {
                files: [{
                        expand: true,
                        dot: true,
                        cwd: '<%= yeoman.app %>/scripts/services/angular-wakanda',
                        dest: '<%= yeoman.publishConnectorDir %>',
                        src: [
                            '*',
                            '**/*',
                            '!node_modules/**',
                        ]
                    }]
            },
            publishConnectorReadMe: {
                src: '<%= yeoman.publishConnectorDir %>/README.publish.md',
                dest : '<%= yeoman.publishConnectorDir %>/README.md'
            },
        },
        // Run some tasks in parallel to speed up the build process
        concurrent: {
            server: [
                'copy:styles'
            ],
            test: [
                'copy:styles'
            ],
            dist: [
                'copy:styles',
                'imagemin',
                'svgmin'
            ]
        },
        // By default, your `index.html`'s <!-- Usemin block --> will take care of
        // minification. These next options are pre-configured if you do not wish
        // to use the Usemin blocks.
        // cssmin: {
        //   dist: {
        //     files: {
        //       '<%= yeoman.dist %>/styles/main.css': [
        //         '.tmp/styles/{,*/}*.css',
        //         '<%= yeoman.app %>/styles/{,*/}*.css'
        //       ]
        //     }
        //   }
        // },
        // uglify: {
        //   dist: {
        //     files: {
        //       '<%= yeoman.dist %>/scripts/scripts.js': [
        //         '<%= yeoman.dist %>/scripts/scripts.js'
        //       ]
        //     }
        //   }
        // },
        // concat: {
        //   dist: {}
        // },

        // Test settings
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        }
    });


    grunt.registerTask('serve', function(target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'configureProxies:dist', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'bower-install',
            'wakConnector-build-debug',
            'concurrent:server',
            'autoprefixer',
            'configureProxies:livereload',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('server', function() {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve']);
    });

    grunt.registerTask('test', [
        'clean:server',
        'concurrent:test',
        'autoprefixer',
        'configureProxies:test',
        'connect:test',
        'karma'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'bower-install',
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'concat',
        'ngmin',
        'copy:dist',
        'cdnify',
        'cssmin',
        'uglify',
        'rev',
        'usemin',
        'htmlmin'
    ]);
    
    grunt.registerTask('wakCopy',[
        'clean:wakWebFolder',
        'copy:wakWebFolder'
    ]);
    
    grunt.registerTask('wakCopyBuild',[
        'clean:wakWebFolder',
        'copy:wakWebFolderBuild'
    ]);
    
    grunt.registerTask('wakInit',[
        'clean:wakWebFolder',
        'copy:wakInit'
    ]);
    
    grunt.registerTask('initConfig',[
        'copy:wakandaConfig'
    ]);
    
    /**
     * wakanda connector grunt registry action
     * @param {String} task name
     * @param {String} wakanda connector task name
     * @return {undefined}
     */
    function _register() {
      var args = Array.prototype.slice.call(arguments);
      grunt.registerTask(args.shift(), function() {
        var done = this.async();
        grunt.util.spawn({
          grunt: true,
          args: args,
          opts: {
              cwd: 'app/scripts/services/angular-wakanda'
          }
        }, function(err, result, code) {
          if(err) {
            grunt.log.error('An error occured building angular-wakanda.min.js',err.message);
          }
          done();
        });
      });
    }
    _register('wakConnector-build-debug', 'build-debug');
    _register('wakConnector-build', 'build');
    _register('wakConnector-post-import-waf', 'post-import-waf');

    grunt.registerTask('build-connector',['wakConnector-build','wakConnector-build-debug']);

    grunt.registerTask('publish-connector-help',function(){
      grunt.log.writeln('1) If it\'s the first time, you need to :');
      grunt.log.writeln('* git init');
      grunt.log.writeln('* git checkout url of the connector repo');
      grunt.log.writeln('2) Then launch : grunt publish-connector');
      grunt.log.writeln('3) Finally :');
      grunt.log.writeln('* git commit');
      grunt.log.writeln('* git tag');
      grunt.log.writeln('* git push');
    });

    //this task publish-connector is only to use when you're asked to share only the connector's part of the project (but also with all the building routines), it will simply make a copy/paste of the files without the node_modules
    //when you publish to bower please use the other way - in app/scripts/services/angular-wakanda just run grunt publish versionNumber
    grunt.registerTask('publish-connector-init',function(){
      grunt.file.mkdir(grunt.config('yeoman.publishConnectorDir'));
      grunt.log.write(grunt.config('yeoman.publishConnectorDir')+' folder created, before publishing the connector into, you need to :');
      grunt.task.run(['publish-connector-help']);
    });
    
    grunt.registerTask('publish-connector',function(){
      if(grunt.file.exists(grunt.config('yeoman.publishConnectorDir')) === false){
        grunt.fail.warn('Folder "'+grunt.config('yeoman.publishConnectorDir')+'" doesn\'t exist, please run grunt publish-connector-init before.');
      }
      grunt.log.warn('Don\'t forget to build the connector (grunt build-connector) and change its version in the package.json before publishing it.');
      var connectorPackage = require('./app/scripts/services/angular-wakanda/package.json');
      grunt.config('publishedConnectorPkg',connectorPackage);
      grunt.log.write('Publishing version '+connectorPackage.version+' of the connector in folder : '+grunt.config('yeoman.publishConnectorDir'));
      grunt.task.run(['clean:publishConnector','copy:publishConnector','copy:publishConnectorReadMe','clean:publishConnectorReadMe']);
    });

    grunt.registerTask('default', [
        'newer:jshint',
        'test',
        'build'
    ]);
};
