'use strict';

/* global instanceMock */
describe('instance filters', () => {
  let $filter, filter;

  beforeEach(module('ec2pricesApp'));
  beforeEach(inject((_$filter_) => {
    $filter = _$filter_;
  }));

  describe('Filter instanceStorageSize', () => {
    beforeEach(() => {
      filter = $filter('instanceStorageSize');
    });

    describe('when there is no storage', () => {
      it('returns "0 GB (EBS only)"', () => {
        let instance = {};
        const output = filter(instance);
        expect(output).toEqual('0 GB (EBS only)');
      });
    });
  });

  describe('Filter validInstances', () => {
    beforeEach(() => {
      filter = $filter('validInstances');
    });

    it('should return undefined given undefined input', () => {
      const output = filter(undefined, 'us-east-1', 'linux');
      expect(output).toBeUndefined();
    });

    it('should filter out instances that are not in the given region', () => {
      const instances = [instanceMock()];

      const output = filter(instances, 'us-west-1', 'linux');
      expect(output).toEqual([]);
    });

    it('should filter out instances that are not available given the os', () => {
      const instances = [instanceMock()];

      const output = filter(instances, 'us-east-1', 'mswin');
      expect(output).toEqual([]);
    });

    it('should filter out instances that have a price of N/A', () => {
      let instances = [instanceMock()];
      instances[0].pricing['us-east-1'].mswin = 'N/A';

      const output = filter(instances, 'us-east-1', 'mswin');
      expect(output).toEqual([]);
    });

    it('should return instances that are in the region with the os', () => {
      const instances = [instanceMock()];

      const output = filter(instances, 'us-east-1', 'linux');
      expect(output).toEqual(instances);
    });
  });

  describe('Filter orderInstances', () => {
    beforeEach(() => {
      filter = $filter('orderInstances');
    });

    it('should order instances by the price', () => {
      const region = 'us-east-1';
      const os = 'linux';

      let instanceSmall = instanceMock();
      instanceSmall.pricing[region][os] = '1.202';

      let instanceLarge = instanceMock();
      instanceLarge.pricing[region][os] = '5.999';

      const output = filter([instanceLarge, instanceSmall], region, os);
      expect(output).toEqual([instanceSmall, instanceLarge]);
    });

    describe('two instances with the same price', function() {
      it('should order by the instance name', function() {
      const region = 'us-east-1';
      const os = 'linux';
      const price = '1.000';

      let instanceSmall = instanceMock();
      instanceSmall.pricing[region][os] = price;

      let instanceLarge = instanceMock();
      instanceLarge.pricing[region][os] = price;

      /* jshint camelcase:false */
      instanceSmall.instance_type = 'm1.small';
      instanceLarge.instance_type = 'r3.large';
      /* jshint camelcase:true */

      const output = filter([instanceLarge, instanceSmall], region, os);
      expect(output).toEqual([instanceSmall, instanceLarge]);
      });
    });
  });

  describe('Filter memory', () => {
    beforeEach(() => {
      filter = $filter('memory');
    });

    it('should show in MB if less than 1 GB', () => {
      let output = filter(0.6);
      expect(output).toEqual('600 MB');
    });

    it('should show in GB if equal 1 GB', () => {
      const output = filter(1);
      expect(output).toEqual('1 GB');
    });

    it('should show in GB if more than 1 GB', () => {
      const output = filter(1.5);
      expect(output).toEqual('1.5 GB');
    });
  });
});
