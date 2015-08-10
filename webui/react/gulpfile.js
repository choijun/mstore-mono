var gulp = require('gulp');
var del = require('del');
var browserSync = require('browser-sync');
var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');

var assets = 'assets/';
var tmpDir = '.tmp/';
var distDir = 'dist/';

gulp.task('clean', function () {
  del([tmpDir + '*']); // FIXME: how to clean distDir
});

gulp.task('copy', ['clean'], function() {
  gulp.src(assets + 'images/**.*').pipe(gulp.dest(distDir + 'assets/images/'));
});

gulp.task('styles', ['clean'], function() {
  gulp.src(assets + '**/*.scss')
      .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
      .pipe(gulp.dest(distDir + 'assets/'));
});

gulp.task('script', ['clean'], function() {
  browserify({
    entries: './app/app.jsx',
    extensions: ['.jsx','.js'],
    debug: true
  })
  .transform(babelify)
  .bundle()
  .pipe(source('app.js'))
  .pipe(gulp.dest(tmpDir))
  .pipe(streamify(uglify()))
  .pipe(gulp.dest(distDir));
});

gulp.task('build', ['copy', 'styles', 'script']);

gulp.task('build-watch', ['build'], browserSync.reload);

// Start browsersync task and then watch files for changes
gulp.task('default', ['build'], function() {
  browserSync({
    startPath: '/',
    server: {
      baseDir: './'
    },
    logConnections: true,
    browser: 'default',
    port: 8888
  });
  gulp.watch(['*.html', 'assets/**/*.scss', 'app/**/*.jsx'], ['build-watch']);
});
