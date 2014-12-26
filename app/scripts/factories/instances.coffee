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

    getRegions = () ->
      return getInstances().then((instances) ->
        regions = {}

        for instance in instances
          for region, pricing of instance.pricing
            regions[region] = null

        return (r for r, _ of regions)
      )

    getOperatingSystems = () ->
      return getInstances().then((instances) ->
        operatingSystems = {}

        for instance in instances
          for region, pricing of instance.pricing
            for operatingSystem of pricing
              operatingSystems[operatingSystem] = null

        return (os for os, _ of operatingSystems)
      )

    return {
      getInstances: getInstances,
      getRegions: getRegions,
      getOperatingSystems: getOperatingSystems,
    }
  )
