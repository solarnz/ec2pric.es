'use strict';

angular.module('ec2pricesApp')
  .directive('checkbox', () => {
    return {
      restrict: 'E',
      scope: {checked: '='},
      templateUrl: '/directives/checkbox.html',
    };
  });
