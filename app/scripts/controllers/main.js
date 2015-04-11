(function() {
  'use strict';

  var controller = function(angular) {
    angular.module('ec2pricesApp')
    .controller('MainController', ($filter, $scope, instancesFactory,
      operatingSystems, regions) => {

      $scope.regions = [
        for (name of regions)
        {name: name, humanName: $filter('regionName')(name)}
      ];

      $scope.operatingSystems = [
        for (name of operatingSystems)
        {name: name, humanName: $filter('operatingSystemName')(name)}
      ];

      instancesFactory.getInstances().then(function(instances) {
        $scope.instances = instances;
      });

      $scope.displayConfig = {
        instanceName: true,
        storageSize: true,
        storageTotalSize: true,
        price: true,
        region: 'us-east-1',
        os: 'linux'
      };
    });
  };


  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = controller;
  } else {
    controller(angular);
  }
}());
