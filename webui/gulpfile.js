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
    return gulp.src([tmpdir + '*', distdir + '*'], {read: false})
        .pipe(clean());
});

gulp.task('copy', ['clean'], function() {
    gulp.src([basedir + 'bower_components/bootstrap/dist/fonts/**.*'])
        .pipe(gulp.dest(distdir + 'assets/fonts/'));
    gulp.src([basedir + 'bower_components/components-font-awesome/fonts/**.*'])
            .pipe(gulp.dest(distdir + 'assets/fonts/'));
    gulp.src([basedir + 'assets/fonts/**.*'])
            .pipe(gulp.dest(distdir + 'assets/fonts/'));
    gulp.src([basedir + 'assets/images/**.*'])
                .pipe(gulp.dest(distdir + 'assets/images/'));
    gulp.src([basedir + 'assets/products/**.*'])
            .pipe(gulp.dest(distdir + 'assets/products/'));
});

gulp.task('scripts', ['clean'], function() {
    return gulp.src([srcdir + '**/*.jsx', srcdir + '**/*.js'])
        .pipe(react())
        .pipe(gulp.dest(tmpdir + 'scripts/'));
});

gulp.task('usemin', ['scripts'], function () {
    return gulp.src('src/main/webapp/index.html')
        .pipe(usemin({
            css1: [minifycss()],
            css2: [minifycss()],
            js1: [uglify()],
            js2: [uglify()]
        }))
        .pipe(gulp.dest(distdir));
});

gulp.task('lint', ['scripts'], function() {
    return gulp.src(tmpdir + 'scripts/**/*.js')
        .pipe(jshint());
});

gulp.task('watch', ['scripts'], function() {
    gulp.watch([srcdir + '**/*.jsx', srcdir + '**/*.js'], ['scripts', 'lint']);
});

gulp.task('default', ['clean', 'scripts', 'lint', 'watch']);

gulp.task('dist', ['clean', 'copy', 'scripts', 'lint', 'usemin']);
