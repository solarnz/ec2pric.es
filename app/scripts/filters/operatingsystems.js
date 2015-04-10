'use strict';

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
