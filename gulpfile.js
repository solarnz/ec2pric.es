'use strict';

var gulp = require('gulp');

var options = {
  name: 'ec2prices',
  dependantFiles: ['node_modules/babel/browser-polyfill.js'],
  mainFiles: [
    'app/scripts/app.es6',
    'app/scripts/**/!(*.spec|*.mock).{js,es6}'
  ],
  templateFiles: ['app/scripts/**/*.htm{,l}'],
  e2eSpecFiles: ['e2e/**.spec.{es6,js}'],
  specFiles: ['app/scripts/**/*.{spec,mock}.es6'],

  views: {
    src: ['app/views/{,*/}*.htm{,l}'],
    base: 'app/views/'
  },
  normalFiles: ['app/instances.json'],
  buildDir: 'build',
  version: false,
};

require('./gulp/copy.js')(options);
require('./gulp/css.js')(options);
require('./gulp/deploy.js')(options);
require('./gulp/e2e.js')(options);
require('./gulp/html.js')(options);
require('./gulp/js.js')(options);
require('./gulp/lint.js')(options);
require('./gulp/serve.js')(options);
require('./gulp/tests.js')(options);

gulp.task('default', ['lint', 'test', 'js', 'html', 'copy', 'css']);
