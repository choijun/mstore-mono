'use strict';

import browserSync from 'browser-sync';
import del from 'del';
import proxy from 'proxy-middleware';
import url from 'url';
import gulp from 'gulp';
import sass from 'gulp-sass';
import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import ngAnnotate from 'gulp-ng-annotate';
import uglify from 'gulp-uglify';
import jshint from 'gulp-jshint';
import ngHtml2js from 'gulp-ng-html2js';
import minifycss from 'gulp-minify-css';
import usemin from 'gulp-usemin';

const PATH = {
  src: 'app/',
  assets: 'assets/',
  tmp: '.tmp/',
  dist: 'dist/'
};

let initBrowserSync = (env) => {
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

gulp.task('clean', (cb) => {
  del([PATH.tmp + '*', PATH.dist + '*'], cb);
});

gulp.task('copy', ['clean'], () => {
  gulp.src(PATH.assets + 'images/**.*')
    .pipe(gulp.dest(PATH.tmp + 'assets/images/'))
    .pipe(gulp.dest(PATH.dist + 'assets/images/'));
  gulp.src(['bower_components/bootstrap/fonts/**.*', 'bower_components/font-awesome/fonts/**.*'])
    .pipe(gulp.dest(PATH.tmp + 'assets/fonts/'))
    .pipe(gulp.dest(PATH.dist + 'assets/fonts/'));
});

gulp.task('styles', ['clean'], () => {
  return gulp.src(PATH.assets + '**/*.scss')
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(gulp.dest(PATH.tmp + 'assets/'));
});

gulp.task('scripts', ['clean'], () => {
  browserify({ entries: PATH.src + 'index.module.js', debug: true })
  .transform(babelify)
  .bundle()
  .pipe(source('app.js'))
  .pipe(ngAnnotate())
  .pipe(gulp.dest(PATH.tmp));
});

gulp.task('templates', ['clean'], () => {
  return gulp.src(PATH.src + '**/*.html')
    .pipe(ngHtml2js({ moduleName: 'mstore', prefix: PATH.src }))
    .pipe(gulp.dest(PATH.tmp + 'templates/'));
});

gulp.task('lint', () => {
  return gulp.src([PATH.src + '**/*.js'])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'));
});

gulp.task('build', ['copy', 'styles', 'scripts', 'templates', 'lint']);

gulp.task('usemin', ['copy', 'styles', 'scripts', 'templates'], () => {
  return gulp.src('index.html')
    .pipe(usemin({
      css1: [minifycss()],
      css2: [minifycss()],
      js1: [uglify()],
      js2: [uglify()],
      js3: [uglify()]
    }))
    .pipe(gulp.dest(PATH.dist));
});

gulp.task('dist', ['usemin'], () => {
  initBrowserSync('PROD');
});

gulp.task('reload', ['build'], browserSync.reload);

// Start browsersync task and then watch files for changes
gulp.task('default', ['build'], () => {
  initBrowserSync('DEV');
  gulp.watch(['*.html', 'assets/**/*.scss', 'app/**/*.js', 'app/**/*.html'], ['reload']);
});