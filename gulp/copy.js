'use strict';

var gulp = require('gulp');

module.exports = function(options) {
  gulp.task('copy', function() {
    return gulp.src(['instances.json'], {cwd: 'app/'})
               .pipe(gulp.dest(options.buildDir));
  });
};
