# mStore - Web UI module
============

The project directory should now have the following structures:

* `app`
 * `common`: code of shared components
 * `components`: code (scripts and views) of every feature should be a sub-directory
 * `services`: code of services
 * `app.controller.ts`: router
 * `index.ts`: main script
* `assets`
 * `styles`
   * `bootstrap.scss`: customized Bootstrap styles
   * `app.scss`: application styles
 * `images`: application images
* `index.html`: application page
* `gulpfile.babel.js`: build scripts
* `bower_components`: Bower components
* `bower.json`: Bower package definition
* `node_modules`: NPM components
* `package.json`: NPM package definition

Based on this seed structure, you're ready to make any change to build your application.

### Build

You can also serve the UI using [Gulp](http://gulpjs.com/). As a prerequisite you need to have [NPM](https://nodejs.org/download/) and [Bower](http://bower.io/#install-bower) installed:

Next, install all dependencies needed:

```
$ npm install
$ bower install
$ gulp
```

What it does:

* Inject Bower dependendices into index.html
* Compile Compass styles to CSS
* Launch a connect server at port 8888
* Watch for changes and automatically refresh browser

The typical development workflow is running `gulp` once, then keep making changes and immediately seeing the results. This is probably the command you use the most.

Other build commands:

* `gulp`: package the application for distribution
 * `clean`: delete `dist` directory
 * `copy`: copy application images to `dist`
 * `styles`: compile Compass to CSS
 * `scripts`: transpile JS code
 * `templates`: compile html to js