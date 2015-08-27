'use strict';

var browserSync = require('browser-sync');
var del = require('del');
var proxy = require('proxy-middleware');
var url = require('url');
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var ngHtml2js = require('gulp-ng-html2js');
var minifycss = require('gulp-minify-css');
var usemin = require('gulp-usemin');


var config = {
  dir: {
    src: 'app/',
    assets: 'assets/',
    tmp: '.tmp/',
    dist: 'dist/'
  }
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
  del([config.dir.tmp + '*', config.dir.dist + '*'], cb);
});

gulp.task('copy', ['clean'], function() {
  gulp.src(config.dir.assets + 'images/**.*')
    .pipe(gulp.dest(config.dir.tmp + 'assets/images/'))
    .pipe(gulp.dest(config.dir.dist + 'assets/images/'));
  gulp.src(['bower_components/bootstrap/fonts/**.*', 'bower_components/font-awesome/fonts/**.*'])
    .pipe(gulp.dest(config.dir.tmp + 'assets/fonts/'))
    .pipe(gulp.dest(config.dir.dist + 'assets/fonts/'));
});

gulp.task('styles', ['clean'], function() {
  return gulp.src(config.dir.assets + '**/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(gulp.dest(config.dir.tmp + 'assets/'));
});

gulp.task('scripts', ['clean'], function() {
  browserify({ entries: config.dir.src + 'index.js', debug: true })
  .transform(babelify)
  .bundle()
  .pipe(source('app.js'))
  .pipe(ngAnnotate())
  .pipe(gulp.dest(config.dir.tmp));
});

gulp.task('html2js', ['clean'], function() {
  return gulp.src(config.dir.src + '**/*.html')
    .pipe(ngHtml2js({ moduleName: 'mstore', prefix: config.dir.src }))
    .pipe(gulp.dest(config.dir.tmp + 'views/'));
});

gulp.task('lint', function() {
  return gulp.src([config.dir.src + '**/*.js'])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'));
});

gulp.task('build', ['copy', 'styles', 'scripts', 'html2js', 'lint']);

gulp.task('usemin', ['copy', 'styles', 'scripts', 'html2js'], function() {
  return gulp.src('index.html')
    .pipe(usemin({
      css1: [minifycss()],
      css2: [minifycss()],
      js1: [uglify()],
      js2: [uglify()],
      js3: [uglify()]
    }))
    .pipe(gulp.dest(config.dir.dist));
});

gulp.task('serve:dist', ['usemin'], function() {
  initBrowserSync('PROD');
});

// Start browsersync task and then watch files for changes
gulp.task('serve', ['build'], function() {
  initBrowserSync('DEV');
  gulp.watch(['*.html', 'assets/**/*.scss', 'app/**/*.js', 'app/**/*.html'], ['reload']);
});

gulp.task('reload', ['build'], browserSync.reload);

gulp.task('default', ['serve']);
