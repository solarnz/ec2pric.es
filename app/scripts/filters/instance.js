(function() {
  'use strict';

  var filters = function(angular) {
    angular.module('ec2pricesApp')
      .filter('instanceStorageSize', () => {
        return (input) => {
          if (!input.storage) {
            return '0 GB (EBS only)';
          }

          let driveSize = input.storage.size + ' GB';
          let deviceCount = input.storage.devices;
          deviceCount = deviceCount > 1 ? ` x ${deviceCount}` : '';
          return driveSize + deviceCount;
        };
      })
      .filter('instanceTotalStorageSize', () => {
        return (input) => {
          if (!input.storage) {
            return '0 GB';
          }

          return input.storage.size * input.storage.devices + ' GB';
        };
      })
      .filter('instancePrice', () => {
        return (input, region, os) => {
          if (input.pricing[region] && input.pricing[region][os]) {
            return input.pricing[region][os];
          } else {
            return '';
          }
        };
      })
      .filter('validInstances', () => {
        return (input, region, os) => {
          // If the input is not 'truthy', just return it.
          if (!input) {
            return input;
          }

          return [
            for (i of input) if (
              i.pricing[region] &&
              i.pricing[region][os] &&
              i.pricing[region][os] !== 'N/A'
            ) i
          ];
        };
      })
      .filter('orderInstances', ($filter) => {
        return (input, region, os) => {
          return $filter('orderBy')(input, (item) => {
            /* jshint camelcase:false */
            return [item.pricing[region][os], item.instance_type];
            /* jshint camelcase:true */
          });
        };
      })
      .filter('memory', () => {
        return (input) => {
          if (input < 1) {
            return (input * 1000) + ' MB';
          } else {
            return input + ' GB';
          }
        };
      });
  };

  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = filters;
  } else {
    filters(angular);
  }
}());
