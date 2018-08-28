import pkg from './../package.json';

export default {
  output: {
    path: 'client/dist',
  },
  entry: {
    css: `client/src/bs/app.scss`,
    js: `client/src/ng/main.js`,
  },
  resolve: {
    extensions: ['.js'],
  },
  plugins: {
    copy: [
      { from: 'node_modules/bootstrap/dist/css/bootstrap.min.css', to: 'css' },
      { from: 'node_modules/bootstrap/dist/css/bootstrap.min.css.map', to: 'css' },
      { from: 'node_modules/font-awesome/css/font-awesome.min.css', to: 'css' },
      { from: 'node_modules/font-awesome/fonts/**/*', to: 'fonts' },
      { from: 'client/src/ng/index.html', to: '' },
    ],
    optimize: {
      vendor: Object.keys(pkg.dependencies),
    },
  },
  watchOptions: {
    css: [`client/src/bs/**/*.scss`],
    js: [`client/src/ng/**/*.js`,`client/src/ng/**/*.html`],
  },
}