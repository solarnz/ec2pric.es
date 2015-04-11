'use strict';

var gulp = require('gulp');

var concat = require('gulp-concat');
var filter = require('gulp-filter');
var mainBowerFiles = require('main-bower-files');
var rev = require('gulp-rev');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var webpack = require('gulp-webpack-build');

module.exports = function(options) {
  gulp.task('js:dependencies', function() {
    var files = [].concat(
      mainBowerFiles({}, {base: 'bower_components'}),
      options.dependantFiles
    );
    var pipeline =  gulp.src(files)
                        .pipe(filter(['*.js']))
                        .pipe(sourcemaps.init())
                        .pipe(concat('vendor.js'))
                        .pipe(uglify());

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

  gulp.task('js:webpack', function() {
    var pipe = gulp.src('webpack.config.js');
    pipe = pipe.pipe(webpack.configure({
                 useMemoryFs: true,
                 progress: true
               }));

    if (options.version) {
      pipe = pipe.pipe(webpack.overrides({
        devtool: '#source-maps'
      }));
    } else {
       pipe = pipe.pipe(webpack.overrides({
        devtool: '#eval'
      }));
   }
   pipe = pipe.pipe(webpack.compile())
              .pipe(webpack.format({
                 version: true,
                 timings: true
               }))
               .pipe(webpack.failAfter({
                 errors: true,
                 warnings: true
               }));

    if (options.version) {
      pipe = pipe.pipe(rev());
    }

    pipe = pipe.pipe(gulp.dest(options.buildDir));

    if (options.version) {
      pipe = pipe.pipe(rev.manifest({
        base: options.buildDir,
        merge: true // merge with the existing manifest (if one exists)
      }));
    }

    pipe = pipe.pipe(gulp.dest(options.buildDir));

    return pipe;

  });

  gulp.task('js', ['js:dependencies', 'js:webpack']);
};
