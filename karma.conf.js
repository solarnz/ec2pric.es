'use strict';
module.exports = function(config) {
  config.set({
    basePath: './',
    frameworks: ['jasmine'],
    browsers: ['PhantomJS'],
    preprocessors: {
      'app/**/*.js': ['babel'],
      'app/**/!(*.spec|*.mock).js': ['coverage'],
      '**/*.htm{,l}': ['html2js']
    },
    'babelPreprocessor': {
      options: {
        experimental: true,
        sourceMap: 'inline',
      }
    },
    coverageReporter: {
      type : 'html',
      dir : 'coverage/',
    },

    ngHtml2JsPreprocessor: {
      // strip this from the file path
      stripPrefix: 'app/scripts',

      // setting this option will create only a single module that contains templates
      // from all the files, so you can load them all with module('foo')
      moduleName: 'ec2pricesApp'
    }
  });
};
