'use strict';
module.exports = function(config) {
  config.set({
    basePath: './',
    frameworks: ['jasmine'],
    browsers: ['PhantomJS'],
    preprocessors: {
      'app/**/!(*.spec|*.mock).js': ['webpack', 'coverage'],
      'app/**/*.{spec,mock}.js': ['babel']
    },
    babelPreprocessor: {
      options: {
        experimental: true,
        sourceMap: 'inline',
      }
    },
    webpack: require('./webpack.config.js'),
    coverageReporter: {
      type : 'html',
      dir : 'coverage/',
    }
  });
};
