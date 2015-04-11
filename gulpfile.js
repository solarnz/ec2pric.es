'use strict';

var gulp = require('gulp');
var gitRev = require('git-rev');

var options = {
  name: 'ec2prices',
  dependantFiles: ['node_modules/babel/browser-polyfill.js'],
  mainFiles: [],
  templateFiles: [],
  e2eSpecFiles: ['e2e/**.spec.js'],
  specFiles: ['app/scripts/**/*.{spec,mock}.js'],

  views: {
    src: ['app/views/{,*/}*.htm{,l}'],
    base: 'app/views/'
  },
  normalFiles: ['app/instances.json'],
  buildDir: 'build',
  version: false,
  buildTime: new Date().toString(),
  nodeVersion: process.version
};

gitRev.short(function(str) {
  options.gitRevision = str;
});

require('./gulp/css.js')(options);
require('./gulp/deploy.js')(options);
require('./gulp/e2e.js')(options);
require('./gulp/html.js')(options);
require('./gulp/js.js')(options);
require('./gulp/lint.js')(options);
require('./gulp/serve.js')(options);
require('./gulp/tests.js')(options);

gulp.task('default', ['lint', 'test', 'js', 'html', 'css']);
