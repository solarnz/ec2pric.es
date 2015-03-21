'use strict';

var gulp = require('gulp');

var concat = require('gulp-concat');
var filter = require('gulp-filter');
var mainBowerFiles = require('main-bower-files');
var rev = require('gulp-rev');
var sourcemaps = require('gulp-sourcemaps');

module.exports = function(options) {
  gulp.task('css:dependencies', function() {
    var pipeline =  gulp.src(mainBowerFiles({}, {base: 'bower_components'}))
                        .pipe(filter(['*.css']))
                        .pipe(sourcemaps.init())
                        .pipe(concat('vendor.css'));

    if (options.version) {
      pipeline = pipeline.pipe(rev());
    }

    pipeline = pipeline.pipe(sourcemaps.write('./'))
                       .pipe(gulp.dest(options.buildDir));

    if (options.version) {
      pipeline = pipeline.pipe(rev.manifest({
        base: options.buildDir,
        merge: true // merge with the existing manifest (if one exists)
      }));
    }

    pipeline = pipeline.pipe(gulp.dest(options.buildDir));

    return pipeline;
  });

  gulp.task('css:src', function() {
    var pipeline = gulp.src(['app/styles/**/*.css'])
      .pipe(sourcemaps.init())
      .pipe(concat(options.name + '.css'));
    if (options.version) {
      pipeline = pipeline.pipe(rev());
    }

    pipeline = pipeline.pipe(sourcemaps.write('./'))
                       .pipe(gulp.dest(options.buildDir));

    if (options.version) {
      pipeline = pipeline.pipe(rev.manifest({
        base: options.buildDir,
        merge: true // merge with the existing manifest (if one exists)
      }));
    }

    pipeline = pipeline.pipe(gulp.dest(options.buildDir));

    return pipeline;
  });

  gulp.task('css', ['css:dependencies', 'css:src']);
};
