'use strict'

###*
 # @ngdoc function
 # @name ec2pricesApp.controller:MainCtrl
 # @description
 # # MainCtrl
 # Controller of the ec2pricesApp
###
angular.module('ec2pricesApp')
  .controller('MainController', ($filter, $scope, instancesFactory, \
    operatingSystems, regions) ->

  $scope.regions = (
    {name: name, humanName: $filter('regionName')(name)} \
    for name in regions
  )

  $scope.operatingSystems = (
    {name: name, humanName: $filter('operatingSystemName')(name)} \
    for name in operatingSystems
  )

  instancesFactory.getInstances().then((instances) ->
    $scope.instances = instances
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
