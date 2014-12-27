'use strict'

angular.module('ec2pricesApp')
  .filter('instanceStorageSize', () ->
    return (input) ->
      if not input.storage
        return '0 GB (EBS only)'

      driveSize = input.storage.size + ' GB'
      deviceCount = input.storage.devices
      deviceCount = if deviceCount > 1 then ' x ' + deviceCount else ''
      return driveSize + deviceCount
  )
  .filter('instanceTotalStorageSize', () ->
    return (input) ->
      if not input.storage
        return '0 GB'

      return input.storage.size * input.storage.devices + ' GB'
  )
  .filter('instancePrice', () ->
    return (input, region, os) ->
      if input.pricing[region] and input.pricing[region][os]
        return input.pricing[region][os]
      else
        return ''
  )
  .filter('validInstances', () ->
    return (input, region, os) ->
      # If the input is not 'truthy', just return it.
      if not input
        return input

      return (i for i in input when i.pricing[region] and
        i.pricing[region][os] and
        i.pricing[region][os] != 'N/A'
      )
  )
  .filter('orderInstances', ($filter) ->
    return (input, region, os) ->
      return $filter('orderBy')(input, (item) ->
        return item.pricing[region][os]
      )
  )
  .filter('memory', () ->
    return (input) ->
      if input < 1
        return (input * 1000) + ' MB'
      else
        return input + ' GB'
  )
