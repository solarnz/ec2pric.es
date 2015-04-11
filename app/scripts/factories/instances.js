(function() {
  'use strict';

  var factory = function(angular) {
    angular.module('ec2pricesApp')
    .factory('instancesFactory', ($http, $q) => {
      let cachedData = require('json!../../instances.json');

      let getInstances = () => {
        return $q.when(cachedData);
      };

      return {
        getInstances: getInstances
      };
    });
  };

  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = factory;
  } else {
    factory(angular);
  }
}());
