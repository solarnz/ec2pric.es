(function() {
  'use strict';

  var directive = function(angular) {
    angular.module('ec2pricesApp')
      .directive('instance', () => {
        return {
          restrict: 'A',
          scope: {
            instance: '=',
            displayConfig: '=',
          },
          template: require('./instance.html'),
        };
      });
  };

  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = directive;
  } else {
    directive(angular);
  }
}());
