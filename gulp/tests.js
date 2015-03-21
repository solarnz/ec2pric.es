'use strict';

var gulp = require('gulp');
var mainBowerFiles = require('main-bower-files');
var karma = require('gulp-karma');
var _ = require('lodash');

function runKarma(options, karmaOptions) {
  karmaOptions = _.assign({
    configFile: 'karma.conf.js',
    action: 'run',
    reporters: ['mocha', 'coverage']
  }, karmaOptions);

  var sources = [].concat(
    mainBowerFiles({includeDev: true}),
    options.dependantFiles,
    options.mainFiles,
    options.templateFiles,
    options.specFiles,
    '!**/*.{less,eot,woff,woff2,svg,ttf}'
  );

  return gulp.src(sources)
             .pipe(require('gulp-print')())
             .pipe(karma(karmaOptions))
  ;
}

module.exports = function(options) {
  gulp.task('test', function() {
    return runKarma(options);
  });

  gulp.task('test:dev', function() {
    return runKarma(options, {
      action: 'autowatch',
      reporters: ['mocha'],
      mochaReporter: {
        output: 'autowatch'
      }
    });
  });
};
