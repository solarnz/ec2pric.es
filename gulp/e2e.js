'use strict';

var gulp = require('gulp');

var protractor = require('gulp-protractor');

module.exports = function(options) {
  /* jshint ignore:start */
  gulp.task('e2e:webdriver_update', protractor.webdriver_update);
  /* jshint ignore:end */

  gulp.task('e2e:protractor', ['e2e:webdriver_update'], function() {
    return gulp.src(options.e2eSpecFiles)
               .pipe(protractor.protractor({
                 configFile: 'e2e/conf.js',
                 args: ['--baseUrl', 'http://127.0.0.1:3000']
               }));
  });

  gulp.task('e2e', ['e2e:protractor']);
};
