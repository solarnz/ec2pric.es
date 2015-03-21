'use strict';

var gutil = require('gulp-util');

var AWS = require('aws-sdk');
var through = require('through2');

module.exports = function(invalidationBatch, options) {
  function bufferContents(file, enc, cb) {
    cb();
  }

  function endStream(cb) {
    AWS.config.update({
      region: options.region,
      accessKeyId: (process.env.AWS_ACCESS_KEY_ID ||
                    options.credentials.accessKeyId),
      secretAccessKey: (process.env.AWS_SECRET_ACCESS_KEY ||
                        options.credentials.secretAccessKey)
    });

    var cloudfront = new AWS.CloudFront();
    cloudfront.createInvalidation({
      DistributionId: options.distributionId,
      InvalidationBatch: invalidationBatch
    }, function(err, data) {
      if (err) {
        gutil.error('Could not invalidate cloudfront: ' + err);
        cb(false);
      }

      gutil.log('Invalidation succeeded');
      gutil.log(data);

      cb();
    });
  }

  return through.obj(bufferContents, endStream);
};
