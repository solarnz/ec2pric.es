'use strict'

describe('Filter operatingSystemName', () ->
  beforeEach(module('ec2pricesApp'))

  filter = undefined

  beforeEach(inject((_$filter_) ->
    $filter = _$filter_
    filter = $filter('operatingSystemName')
  ))

  it('should return Linux for linux', () ->
    expect(filter('linux')).toEqual('Linux')
  )

  it('should return Windows for mswin', () ->
    expect(filter('mswin')).toEqual('Windows')
  )

  it('should return Windows SQL for mswinSQL', () ->
    expect(filter('mswinSQL')).toEqual('Windows SQL')
  )

  it('should return Windows SQL Web for mswinSQLWeb', () ->
    expect(filter('mswinSQLWeb')).toEqual('Windows SQL Web')
  )

  it('should return the api name for any os it doesn\'t know', () ->
    expect(filter('redhat')).toEqual('redhat')
  )
)
