'use strict';

var browserSync = require('browser-sync');
var del = require('del');
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var minifycss = require('gulp-minify-css');
var ngAnnotate = require('gulp-ng-annotate');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var usemin = require('gulp-usemin');
var proxy = require('proxy-middleware');
var url = require('url');
var ngHtml2js = require('gulp-ng-html2js');

var PATH = {
  src: 'app/',
  assets: 'assets/',
  tmp: '.tmp/',
  dist: 'dist/'
};

function initBrowserSync(env) {
  var proxyOptions = url.parse('http://localhost:8000');
  proxyOptions.route = '/api';
  browserSync({
    server: {
      baseDir: env === 'PROD' ? './dist' : './'
    },
    logConnections: true,
    browser: 'default',
    port: 8888,
    middleware: [proxy(proxyOptions)]
  });
}

gulp.task('clean', function (cb) {
  del([PATH.tmp + '*', PATH.dist + '*'], cb);
});

gulp.task('copy', ['clean'], function() {
  gulp.src(PATH.assets + 'images/**.*')
    .pipe(gulp.dest(PATH.tmp + 'assets/images/'))
    .pipe(gulp.dest(PATH.dist + 'assets/images/'));
  gulp.src(['bower_components/bootstrap/fonts/**.*', 'bower_components/font-awesome/fonts/**.*'])
    .pipe(gulp.dest(PATH.tmp + 'assets/fonts/'))
    .pipe(gulp.dest(PATH.dist + 'assets/fonts/'));
});

gulp.task('styles', ['clean'], function() {
  return gulp.src(PATH.assets + '**/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(gulp.dest(PATH.tmp + 'assets/'));
});

gulp.task('templates', ['clean'], function() {
  return gulp.src(PATH.src + '**/*.html')
    .pipe(ngHtml2js({ moduleName: 'mstore', prefix: PATH.src }))
    .pipe(gulp.dest(PATH.tmp + 'templates/'));
});

gulp.task('lint', function() {
  return gulp.src([PATH.src + '**/*.js'])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'));
});

gulp.task('build', ['copy', 'styles', 'templates', 'lint']);

gulp.task('usemin', ['copy', 'styles', 'templates'], function() {
  return gulp.src('index.html')
    .pipe(usemin({
      css1: [minifycss()],
      css2: [minifycss()],
      js1: [uglify()],
      js2: [ngAnnotate(), uglify()],
      js3: [uglify()]
    }))
    .pipe(gulp.dest(PATH.dist));
});

gulp.task('dist', ['usemin'], function() {
  initBrowserSync('PROD');
});

gulp.task('reload', ['build'], browserSync.reload);

// Start browsersync task and then watch files for changes
gulp.task('default', ['build'], function() {
  initBrowserSync('DEV');
  gulp.watch(['*.html', 'assets/**/*.scss', 'app/**/*.js', 'app/**/*.html'], ['reload']);
});
