/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
*/

/*========== REQUIRED LIBS ==========*/
import gulp from 'gulp';

gulp.task('vendor', () => {
  gulp.src('./node_modules/bootstrap/dist/css/bootstrap.min.css')
      .pipe(gulp.dest('dist/libs/css'));
  gulp.src('./node_modules/font-awesome/css/font-awesome.min.css')
      .pipe(gulp.dest('dist/libs/css'));
  gulp.src('./node_modules/font-awesome/fonts/**/*')
      .pipe(gulp.dest('dist/libs/fonts'));
});