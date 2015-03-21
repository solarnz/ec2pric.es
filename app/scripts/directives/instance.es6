'use strict';

angular.module('ec2pricesApp')
  .directive('instance', () => {
    return {
      restrict: 'A',
      scope: {
        instance: '=',
        displayConfig: '=',
      },
      templateUrl: 'scripts/directives/instance.html'
    };
  });