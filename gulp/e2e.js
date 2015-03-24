'use strict';

var gulp = require('gulp');

var protractor = require('gulp-protractor').protractor;

module.exports = function(options) {
  gulp.task('e2e:protractor', function() {
    return gulp.src(options.e2eSpecFiles)
               .pipe(protractor({
                 configFile: 'e2e/conf.js',
                 args: ['--baseUrl', 'http://127.0.0.1:3000']
               }));
  });

  gulp.task('e2e', ['e2e:protractor']);
};
