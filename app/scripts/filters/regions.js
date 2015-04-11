(function() {
  'use strict';

  var filter = function(angular) {
    angular.module('ec2pricesApp')
      .filter('regionName', () => {
        // Fetched from
        // http://docs.aws.amazon.com/general/latest/gr/rande.html#ec2_region
        return (input) => {
          let humanName;

          switch (input) {
            case 'us-east-1':
              humanName = 'N. Virginia';
              break;
            case 'us-west-2':
              humanName = 'Oregon';
              break;
            case 'us-west-1':
              humanName = 'N. California';
              break;
            case 'eu-west-1':
              humanName = 'Ireland';
              break;
            case 'eu-central-1':
              humanName = 'Frankfurt';
              break;
            case 'ap-southeast-1':
              humanName = 'Singapore';
              break;
            case 'ap-southeast-2':
              humanName = 'Sydney';
              break;
            case 'ap-northeast-1':
              humanName = 'Tokyo';
              break;
            case 'sa-east-1':
              humanName = 'Sao Paulo';
              break;
          }

          if (humanName) {
            humanName = `${input} (${humanName})`;
          } else {
            humanName = input;
          }

          return humanName;
        };
      });
  };

  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = filter;
  } else {
    filter(angular);
  }
}());
