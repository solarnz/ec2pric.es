(function() {
  'use strict';

  var filter = function(angular) {
    angular.module('ec2pricesApp')
      .filter('operatingSystemName', () => {
        return (input) => {
          switch (input) {
            case 'linux':
              return 'Linux';
            case 'mswin':
              return 'Windows';
            case 'mswinSQL':
              return 'Windows SQL';
            case 'mswinSQLWeb':
              return 'Windows SQL Web';
            default:
              return input;
          }
        };
      });
  };

  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = filter;
  } else {
    filter(angular);
  }
}());
