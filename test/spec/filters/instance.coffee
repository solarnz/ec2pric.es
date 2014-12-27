'use strict'

$filter = undefined
filter = undefined

beforeEach(module('ec2pricesApp'))
beforeEach(inject((_$filter_) ->
  $filter = _$filter_
))

describe('Filter instanceStorageSize', () ->
  beforeEach(() ->
    filter = $filter('instanceStorageSize')
  )

  describe('when there is no storage', () ->
    it('returns "0 GB (EBS only)"', ->
      instance = {}
      output = filter(instance)
      expect(output).toEqual('0 GB (EBS only)')
    )
  )
)

describe('Filter validInstances', () ->
  beforeEach(() ->
    filter = $filter('validInstances')
  )

  it('should return undefined given undefined input', () ->
    output = filter(undefined, 'us-east-1', 'linux')
  )

  it('should filter out instances that are not in the given region', () ->
    instances = [instanceMock()]

    output = filter(instances, 'us-west-1', 'linux')
    expect(output).toEqual([])
  )

  it('should filter out instances that are not available given the os', () ->
    instances = [instanceMock()]

    output = filter(instances, 'us-east-1', 'mswin')
    expect(output).toEqual([])
  )

  it('should filter out instances that have a price of N/A', () ->
    instances = [instanceMock()]
    instances[0].pricing['us-east-1'].mswin = 'N/A'

    output = filter(instances, 'us-east-1', 'mswin')
    expect(output).toEqual([])
  )

  it('should return instances that are in the region with the os', () ->
    instances = [instanceMock()]

    output = filter(instances, 'us-east-1', 'linux')
    expect(output).toEqual(instances)
  )
)

describe('Filter orderInstances', () ->
  beforeEach(() ->
    filter = $filter('orderInstances')
  )

  it('should order instances by the price', () ->
    region = 'us-east-1'
    os = 'linux'

    instanceSmall = instanceMock()
    instanceSmall.pricing[region][os] = "1.202"

    instanceLarge = instanceMock()
    instanceLarge.pricing[region][os] = "5.999"

    output = filter([instanceLarge, instanceSmall], region, os)
    expect(output).toEqual([instanceSmall, instanceLarge])
  )
)
