var gulp = require('gulp');
var clean = require('gulp-clean');
var react = require('gulp-react');
var uglify = require('gulp-uglify');
var usemin = require('gulp-usemin');
var minifycss = require('gulp-minify-css');
var jshint = require('gulp-jshint');

var basedir = 'src/main/webapp/';
var srcdir = basedir + 'scripts/';
var tmpdir = basedir + '.tmp/';
var distdir = basedir + 'dist/';

gulp.task('clean', function() {
    return gulp.src([tmpdir + '**', distdir + '**'], {read: false})
        .pipe(clean());
});

gulp.task('copy', ['clean'], function() {
    gulp.src([basedir + 'bower_components/bootstrap/dist/fonts/**.*'])
        .pipe(gulp.dest(distdir + 'fonts/'));
    gulp.src([basedir + 'bower_components/components-font-awesome/fonts/**.*'])
            .pipe(gulp.dest(distdir + 'fonts/'));
    gulp.src([basedir + 'assets/fonts/**.*'])
            .pipe(gulp.dest(distdir + 'fonts/'));
    gulp.src([basedir + 'assets/images/**.*'])
                .pipe(gulp.dest(distdir + 'images/'));
    gulp.src([basedir + 'assets/products/**.*'])
            .pipe(gulp.dest(distdir + 'products/'));
});

gulp.task('scripts', ['clean'], function() {
    return gulp.src([srcdir + '**/*.jsx', srcdir + '**/*.js'])
        .pipe(react())
        .pipe(gulp.dest(tmpdir + 'scripts/'));
});

gulp.task('usemin', ['lint'], function () {
    return gulp.src('src/main/webapp/index.html')
        .pipe(usemin({
            css: [minifycss()],
            js: [uglify()]
        }))
        .pipe(gulp.dest(distdir));
});

gulp.task('lint', ['scripts'], function() {
    return gulp.src(tmpdir + 'scripts/**/*.js')
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

gulp.task('default', ['clean', 'scripts', 'lint']);

gulp.task('dist', ['clean', 'copy', 'scripts', 'lint', 'usemin']);
