'use strict'

describe('Filter operatingSystemName', () ->
  beforeEach(module('ec2pricesApp'))

  filter = undefined

  beforeEach(inject((_$filter_) ->
    $filter = _$filter_
    filter = $filter('regionName')
  ))

  it('should return the correct value for us-east-1', () ->
    expect(filter('us-east-1')).toEqual('us-east-1 (N. Virginia)')
  )

  it('should just return the api name if nothing matches', () ->
    region = 'moon-southeast-2'
    expect(filter(region)).toEqual(region)
  )
)
