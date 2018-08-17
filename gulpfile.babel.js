/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
*/

/*========== REQUIRED LIBS ==========*/
import babelify from 'babelify';
import browserify from 'browserify';
import gulp from 'gulp';
import sass from 'gulp-sass';
import streamify from 'gulp-streamify';
import uglify from 'gulp-uglify';
import stringify from 'stringify';
import source from 'vinyl-source-stream';

gulp.task('default', () => {
  // place code for your default task here
});

gulp.task('build', () => {
  getConfigFromParams(process);
  gulp.start('copy');
  gulp.start('optimize');
  gulp.start('style');
  gulp.start('script');
});

gulp.task('serve', () => {
  getConfigFromParams(process);
  gulp.start('style');
  gulp.start('script');

  const { watchOptions } = config;

  gulp.watch(watchOptions.css, { cwd: './' }, ['style']);
  gulp.watch(watchOptions.js, { cwd: './' }, ['script']);
});

gulp.task('copy', () => {
  const { path } = config.output,
        { copy } = config.plugins;

  if (copy && copy.length) {
    copy.forEach(item => {
      gulp.src(item.from).pipe(gulp.dest(`${path}/${item.to}`));
    });
  }
});

gulp.task('optimize', () => {
  const { path } = config.output,
        { vendor } = config.plugins.optimize;
  if (vendor && vendor.length) {
    process.env.NODE_ENV = 'production';
    const bundler = browserify({ debug: false });
    vendor.forEach(lib => bundler.require(lib));
    return bundler.bundle()
                  .pipe(source('vendor.min.js'))
                  .pipe(streamify(uglify()))
                  .pipe(gulp.dest(`${path}/js`));
  }
});

gulp.task('style', () => {
  const { path } = config.output,
        { css } = config.entry;

  return gulp.src(css)
      .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
      .pipe(gulp.dest(`${path}/css`));
});

gulp.task('script', () => {
  const { path } = config.output,
        { vendor, uglifyJs } = config.plugins.optimize,
        { js } = config.entry,
        { extensions } = config.resolve;

  if (!js) return;

  const bundler = browserify({
          entries: js,
          transform: [[babelify], [stringify, { appliesTo: { includeExtensions: ['.html'] }}]],
          extensions,
          debug: true,
          cache: {},
          packageCache: {}
        });

  vendor.forEach(lib => bundler.external(lib));

  let bundle = bundler.bundle()
      .on('error', function(err) { console.log(err.message); this.emit('end'); })
      .pipe(source('app.min.js'));

  uglifyJs && (bundle = bundle.pipe(streamify(uglify())));

  return bundle.pipe(gulp.dest(`${path}/js`));
});

let config = {
  output: {
    path: '',
  },
  entry: {
    css: '',
    js: '',
  },
  resolve: {
    extensions: ['.js']
  },
  plugins: {
    copy: [],
    optimize: {
      vendor: [],
    },
  },
};

const getConfigFromParams = (process) => {
  let { argv } = process;
  argv = argv.slice(argv.indexOf('build') + 1);
  const configUrl = argv[argv.indexOf('--config') + 1];
  if (!configUrl) {
    console.log('Cannot find configuration file, please specific with --config');
    return;
  }
  config = require(configUrl).default;
};