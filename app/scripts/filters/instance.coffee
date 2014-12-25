'use strict'

angular.module('ec2pricesApp')
  .filter('instanceStorageSize', () ->
    return (input) ->
      if not input.storage
        return 'EBS only'

      driveSize = input.storage.size + 'GB'
      deviceCount = input.storage.devices
      deviceCount = if deviceCount > 1 then ' x ' + deviceCount else ''
      ssd = if input.storage.ssd then ' (SSD)' else ''
      return driveSize + deviceCount + ssd
  )
  .filter('instanceTotalStorageSize', () ->
    return (input) ->
      if not input.storage
        return 'EBS only'

      return input.storage.size * input.storage.devices + 'GB'
  )
  .filter('instancePrice', () ->
    return (input, region, os) ->
      if input.pricing[region] and input.pricing[region][os]
        return input.pricing[region][os]
      else
        return ''
  )
