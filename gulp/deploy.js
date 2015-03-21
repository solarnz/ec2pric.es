'use strict';

var gulp = require('gulp');

var cloudfront = require('./cloudfront.js');
var rimraf = require('rimraf');
var awspublish = require('gulp-awspublish');

module.exports = function(options) {
  gulp.task('deploy', function() {
    // Modify options so that we output to where we want to.
    options.buildDir = 'prod';
    options.version = true;

    var awsSettings = {
      key: process.env.AWS_ACCESS_KEY_ID,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secret: process.env.AWS_SECRET_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      bucket: process.env.AWS_BUCKET,
      region: process.env.AWS_REGION,
      distributionId: process.env.AWS_DISTRIBUTION_ID,
      patternIndex: /^\/index.html$/gi
    };

    var publisher = awspublish.create(awsSettings);

    rimraf(options.buildDir, function() {
      gulp.start(['default'], function() {
        var sources = [
          options.buildDir + '/**',
          '!' + options.buildDir + '/**/*.map'
        ];

        return gulp.src(sources, {base: ''})
                   .pipe(publisher.publish())
                   .pipe(publisher.cache())
                   .pipe(awspublish.reporter())
                   .pipe(cloudfront({
                     CallerReference: Date.now().toString(),
                     Paths: {
                       Quantity: 2,
                       Items: [ '/index.html', '/instances.json' ]
                     }
                   }, awsSettings));
      });
    });
  });
};
