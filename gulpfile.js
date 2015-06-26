var gulp = require('gulp');
var clean = require('gulp-clean');
var react = require('gulp-react');
var uglify = require('gulp-uglify');
var usemin = require('gulp-usemin');
var minifycss = require('gulp-minify-css');
var jshint = require('gulp-jshint');

var srcdir = 'src/main/webapp/scripts/';
var distdir = 'src/main/webapp/dist/';

gulp.task('clean', function() {
    return gulp.src([distdir + '*'], {read: false})
        .pipe(clean());
});

gulp.task('scripts', function() {
    return gulp.src([srcdir + '**/*.jsx', srcdir + '**/*.js'])
        .pipe(react())
        .pipe(gulp.dest(distdir + 'scripts/'));
});

gulp.task('usemin', function () {
    return gulp.src('src/main/webapp/index.html')
        .pipe(usemin({
            css: [minifycss()],
            js: [uglify()]
        }))
        .pipe(gulp.dest(distdir));
});

gulp.task('lint', function() {
    return gulp.src(distdir + 'scripts/**/*.js')
        .pipe(jshint());
});

gulp.task('watch', ['clean'], function() {
    var watching = false;
    gulp.start('scripts', 'lint', function() {
        if (!watching) {
            watching = true;
            gulp.watch(srcdir + '**/*.jsx', ['scripts', 'lint']);
        }
    });
});

gulp.task('default', ['clean'], function() {
    return gulp.start('scripts', 'lint');
});