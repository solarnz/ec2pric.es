'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

module.exports = function(options) {
  gulp.task('serve', ['js', 'html', 'css'], function() {
    browserSync({
      open: false,
      server: {
        baseDir: 'build'
      }
    });

    gulp.watch(['app/**/*!(spec|mock).{js,es6}', 'app/scripts/**/*.htm{,l}'],
               ['js:webpack', reload]);
    gulp.watch(['app/styles/**/*.css'], ['css:src', reload]);
    gulp.watch(['./bower.json'], ['js', 'css', reload]);
    gulp.watch(options.views.src, ['html', reload]);
  });
};
