'use strict';

exports.config = {
  seleniumServerJar: '../node_modules/gulp-protractor/node_modules/protractor/selenium/selenium-server-standalone-2.45.0.jar',
  capabilities: {
    'browserName': 'firefox',
  },
  framework: 'jasmine2',
  onPrepare: function() {
    var SpecReporter = require('jasmine-spec-reporter');
    jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: true}));
  },
  jasmineNodeOpts: {
    print: function() {}
  }
};
