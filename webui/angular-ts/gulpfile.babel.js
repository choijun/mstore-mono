'use strict';

import browserSync from 'browser-sync';
import del from 'del';
import proxy from 'proxy-middleware';
import url from 'url';
import gulp from 'gulp';
import sass from 'gulp-sass';
import source from 'vinyl-source-stream';
import ngHtml2js from 'gulp-ng-html2js';
import typescript from 'gulp-typescript';
import ngAnnotate from 'gulp-ng-annotate';
import minifycss from 'gulp-minify-css';
import uglify from 'gulp-uglify';
import usemin from 'gulp-usemin';

const PATH = {
  src: 'app/',
  assets: 'assets/',
  tmp: '.tmp/',
  dist: 'dist/'
};

const initBrowserSync = (env) => {
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
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(gulp.dest(PATH.tmp + 'assets/'));
});

gulp.task('scripts', ['clean'], () => {
  return gulp.src(PATH.src + '**/*.ts')
    .pipe(typescript({
      target: 'ES5',
      declarationFiles: false,
      experimentalDecorators: true
    }))
    .js
    .pipe(ngAnnotate())
    .pipe(gulp.dest(PATH.tmp));
});

gulp.task('templates', ['clean'], () => {
  return gulp.src(PATH.src + '**/*.html')
    .pipe(ngHtml2js({ moduleName: 'mstore', prefix: PATH.src }))
    .pipe(gulp.dest(PATH.tmp + 'templates/'));
});

gulp.task('build', ['copy', 'styles', 'scripts', 'templates']);

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
  gulp.watch(['*.html', 'assets/**/*.scss', 'app/**/*.ts', 'app/**/*.html'], ['reload']);
});