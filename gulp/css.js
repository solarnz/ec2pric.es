'use strict';

var path = require('path');

var gulp = require('gulp');

var concat = require('gulp-concat');
var filter = require('gulp-filter');
var mainBowerFiles = require('main-bower-files');
var sourcemaps = require('gulp-sourcemaps');

module.exports = function(options) {
  gulp.task('css:dependencies', function() {
    return gulp.src(mainBowerFiles({}, {base: 'bower_components'}))
               .pipe(filter(['*.css']))
               .pipe(sourcemaps.init())
               .pipe(concat('vendor.css'))
               .pipe(sourcemaps.write('./'))
               .pipe(gulp.dest(path.join(options.buildDir, options.assetDir)));
  });

  gulp.task('css:src', function() {
    return gulp.src(['app/styles/**/*.css'])
               .pipe(sourcemaps.init())
               .pipe(concat(options.name + '.css'))
               .pipe(sourcemaps.write('./'))
               .pipe(gulp.dest(path.join(options.buildDir, options.assetDir)));

  });

  gulp.task('css', ['css:dependencies', 'css:src']);
};
