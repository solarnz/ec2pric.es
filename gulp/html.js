'use strict';

var gulp = require('gulp');
var replace = require('gulp-replace');
var cachebust = require('gulp-cache-bust');

module.exports = function(options) {
  gulp.task('html', function() {
    return gulp.src(options.views.src, {base: options.views.base})
               .pipe(replace(/BUILD_TIME/g, options.buildTime))
               .pipe(replace(/NODE_VERSION/g, options.nodeVersion))
               .pipe(replace(/GIT_REV/g, options.gitRevision))
               .pipe(cachebust({type: 'timestamp'}))
               .pipe(gulp.dest(options.buildDir));
  });
};
