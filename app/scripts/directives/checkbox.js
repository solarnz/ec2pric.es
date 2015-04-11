(function() {
  'use strict';

  var directive = function(angular) {
    angular.module('ec2pricesApp')
      .directive('checkbox', () => {
        return {
          restrict: 'E',
          scope: {checked: '='},
          template: require('./checkbox.html'),
        };
      });
  };


  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = directive;
  } else {
    directive(angular);
  }
}());
