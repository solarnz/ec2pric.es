'use strict'

angular.
  module('ec2pricesApp')
  .factory('instancesFactory', ($http, $q) ->
    cachedData = null

    getInstances = () ->
      if cachedData
        return $q.when(cachedData)

      return $http.get('/instances.json').then((data) ->
        cachedData = data.data
        return data.data
      )

    return {
      getInstances: getInstances,
    }
  )
