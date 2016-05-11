var gulp        = require('gulp');
var concat      = require('gulp-concat');
var connect     = require('gulp-connect');
var proxy       = require('http-proxy-middleware');
var uglify      = require('gulp-uglify');
var rename      = require('gulp-rename');
var header      = require('gulp-header');
var replace     = require('gulp-replace');
var sourcemaps  = require('gulp-sourcemaps');
var git         = require('gulp-git');
var del         = require('del');
var runSequence = require('run-sequence');

var packageInfo = require('./package.json');

var wakandaApp = {
  host: 'localhost',
  port: 8081
};

var date    = new Date();
var month   = date.getMonth() + 1;
var dateStr = date.getFullYear() + '-' + (month < 10 ? '0' : '') + month + '-' + date.getDate();

var destDir       = 'dist';
var productName   = 'angular-wakanda';
var libSrc        = 'bower_components/wakanda-client/dist/wakanda-client.js';
var jsSrc         = './src/**/*.js';
var publishDir    = 'publish/';
var publishTplDir = 'publish-templates/'

gulp.task('bundle-js', function () {
  return gulp.src([libSrc, jsSrc])
    .pipe(concat(productName + '.js'))
    .pipe(header('//angular-wakanda.js - v' + packageInfo.version + ' - ' + dateStr + '\n'))
    .pipe(gulp.dest(destDir));
});

gulp.task('uglify', ['bundle-js'], function () {
  return gulp.src(destDir + '/' + productName + '.js')
    .pipe(sourcemaps.init())
    .pipe(rename(productName + '.min.js'))
    .pipe(uglify())
    .pipe(header('//angular-wakanda.min.js - v' + packageInfo.version + ' - ' + dateStr + '\n'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(destDir));
})

gulp.task('watch', function () {
  gulp.watch([libSrc, jsSrc], ['build']);
})

gulp.task('webserver', function() {
  connect.server({
    root: ['app/', '.'],
    livereload: false,
    // Change this to '0.0.0.0' to access the server from outside.
    port: 9092,
    middleware: function (connect, opt) {
      return [
        proxy('/rest', {
          target: 'http://' + wakandaApp.host + ':' + wakandaApp.port,
          ws: true
        })
      ];
    }
  });
});

gulp.task('copy:bower', function () {
  gulp.src(publishTplDir + 'bower.publish.json')
    .pipe(replace('<%=version%>', packageInfo.version))
    .pipe(rename('bower.json'))
    .pipe(gulp.dest(publishDir));
});

gulp.task('copy:package', function () {
  gulp.src(publishTplDir + 'package.publish.json')
    .pipe(replace('<%=version%>', packageInfo.version))
    .pipe(rename('package.json'))
    .pipe(gulp.dest(publishDir));
});

gulp.task('copy:readme', function () {
  gulp.src(publishTplDir + 'README.publish.md')
    .pipe(replace('<%=version%>', packageInfo.version))
    .pipe(rename('README.md'))
    .pipe(gulp.dest(publishDir));
})

gulp.task('copy:dist', function () {
  gulp.src(destDir + '/*.*')
    .pipe(gulp.dest(publishDir));
});

gulp.task('copy:releasesnotes', function () {
  gulp.src('RELEASESNOTES.md')
    .pipe(gulp.dest(publishDir));
});

gulp.task('clone', ['rm-publish'], function (cb) {
  git.clone('https://github.com/Wakanda/angular-wakanda.git', {args: 'publish'}, function (e) {
    if (e) {
      console.error(e);
    }
    cb();
  });
});

gulp.task('rm-publish', function () {
  return del(publishDir);
});

gulp.task('empty-publish', function () {
  return del([
    publishDir + '/*',
    publishDir + '/.*',
    '!' + publishDir + '/.git'
  ]);
});

gulp.task('build', ['uglify']);
gulp.task('serve', ['build', 'watch', 'webserver']);
gulp.task('copy', ['copy:bower', 'copy:package', 'copy:readme', 'copy:releasesnotes', 'copy:dist']);
gulp.task('publish', function (cb) {
  runSequence(['clone', 'build'], 'empty-publish', 'copy', cb);
})
