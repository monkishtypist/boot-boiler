Bootstrap Gulp 4 Boilerplate
============================

A boilerplate Bootstrap project, featuring Gulp 4, SASS, and NPM package management.

## Quick Start ##

* Requires Gulp 4 and NPM
* Download from GitHub and install by running `npm install`
* Put your static assets in `src/images/` and `src/fonts`
* All styles are handled via SASS in `src/sass/`
  * Add custom styles to `src/sass/_custom.scss`
  * You can edit Bootstrap variables in `src/sass/_variables.scss`
  * Use `src/sass/app.scss` to import new SASS files, fonts, etc.
* Add custom JavaScript to `src/js/custom.js`
* Assets are combined and minified and moved to `dist/` for deployment
* To start development run `gulp watch`
* To move static assets for production run `gulp build`

## License ##

Code released under MIT license. Additional license information can be found at:

* [Font Awesome](http://fontawesome.io/license/)
* [jQuery](https://jquery.org/license/)
* [Bootstrap](http://getbootstrap.com/getting-started/#license-faqs)
 