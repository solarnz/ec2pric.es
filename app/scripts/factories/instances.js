(function() {
  'use strict';

  var factory = function(angular) {
    angular.module('ec2pricesApp')
    .factory('instancesFactory', ($http, $q) => {
      let cachedData = null;

      let getInstances = () => {
        if (cachedData) {
          return $q.when(cachedData);
        }

        return $http.get('/instances.json').then((data) => {
          cachedData = data.data;
          return data.data;
        });
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
