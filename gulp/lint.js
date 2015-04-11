'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');

module.exports = function(options) {
  gulp.task('lint', ['lint:js']);
  gulp.task('lint:js', function() {
    return gulp.src([].concat(options.mainFiles, options.specFiles))
               .pipe(jshint())
               .pipe(jshint.reporter('jshint-stylish'))
               .pipe(jshint.reporter('fail'));
  });
};
