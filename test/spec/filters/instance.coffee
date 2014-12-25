'use strict'

describe('Filter instanceStorageSize', ->
  $filter = undefined

  beforeEach(module('ec2pricesApp'))

  beforeEach(inject((_$filter_) ->
    $filter = _$filter_
  ))

  describe('when there is no storage', () ->
    it('returns "0 GB (EBS only)"', ->
      instance = {}
      output = $filter('instanceStorageSize')(instance)
      expect(output).toEqual('0 GB (EBS only)')
    )
  )
)
