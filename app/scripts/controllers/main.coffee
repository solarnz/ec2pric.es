'use strict'

###*
 # @ngdoc function
 # @name ec2pricesApp.controller:MainCtrl
 # @description
 # # MainCtrl
 # Controller of the ec2pricesApp
###
angular.module('ec2pricesApp')
  .controller('MainController', ($scope, instancesFactory) ->

    instancesFactory.getInstances().then((instances) ->
      $scope.instances = instances
    )

    instancesFactory.getRegions().then((regions) ->
      $scope.regions = regions
    )

    instancesFactory.getOperatingSystems().then((operatingSystems) ->
      $scope.operatingSystems = operatingSystems
    )

    $scope.displayConfig = {
      instanceName: true,
      storageSize: true,
      storageTotalSize: true,
      price: true,
      region: 'us-east-1',
      os: 'linux',
    }
  )
