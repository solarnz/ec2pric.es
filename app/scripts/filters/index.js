'use strict';

module.exports = function(angular) {
  require('./instance')(angular);
  require('./operatingsystems')(angular);
  require('./regions')(angular);
};
