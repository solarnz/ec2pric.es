'use strict';

var gulp = require('gulp');

var babel = require('gulp-babel');
var concat = require('gulp-concat');
var filter = require('gulp-filter');
var mainBowerFiles = require('main-bower-files');
var minifyHtml = require('gulp-minify-html');
var ngHtml2Js = require('gulp-ng-html2js');
var rev = require('gulp-rev');
var sourcemaps = require('gulp-sourcemaps');
var streamqueue = require('streamqueue');
var uglify = require('gulp-uglify');

module.exports = function(options) {
  gulp.task('js:dependencies', function() {
    var files = mainBowerFiles({}, {base: 'bower_components'});
    files.concat(options.dependantFiles);
    var pipeline =  gulp.src(files)
                        .pipe(filter(['*.js']))
                        .pipe(sourcemaps.init())
                        .pipe(concat('vendor.js'));

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

  gulp.task('js:src', function() {
    var html = gulp.src(options.templateFiles)
                   .pipe(minifyHtml({
                     empty: true,
                     spare: true,
                     quotes: true
                   }))
                   .pipe(ngHtml2Js({
                     moduleName: 'ec2pricesApp',
                     prefix: '/'
                   }))
                   .pipe(concat('partials.min.js'));

    var js = gulp.src(options.mainFiles);

    var pipeline = streamqueue({objectMode: true}, js, html)
      .pipe(sourcemaps.init())
      .pipe(babel({experimental: true}))
      .pipe(concat(options.name + '.js'));
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

  gulp.task('js', ['js:dependencies', 'js:src']);
};
