'use strict';

var gulp = require('gulp');

var protractor = require('gulp-protractor');

module.exports = function(options) {
  function protractorTask(url) {
    return gulp.src(options.e2eSpecFiles)
               .pipe(protractor.protractor({
                 configFile: 'e2e/conf.js',
                 args: ['--baseUrl', url]
               }));
  }

  /* jshint ignore:start */
  gulp.task('e2e:webdriver_update', protractor.webdriver_update);
  /* jshint ignore:end */

  gulp.task('e2e:protractor:dev', ['e2e:webdriver_update'], function() {
    return protractorTask('http://127.0.0.1:3000');
  });

  gulp.task('e2e:protractor:production', ['e2e:webdriver_update'], function() {
    return protractorTask('http://ec2pric.es');
  });

  gulp.task('e2e', ['e2e:protractor:dev']);
  gulp.task('e2e:dev', ['e2e:protractor:dev'], function() {
    gulp.watch(options.e2eSpecFiles, ['e2e:protractor']);
  });
};
