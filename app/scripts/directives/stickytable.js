(function() {
  'use strict';

  var directive = function(angular) {
    angular.module('ec2pricesApp')
      .directive('stickyTable', () => {
        return {
          restrict: 'A',
          link: function(scope, element) {
            element.stickyTableHeaders();
          }
        };
      });
  };

  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = directive;
  } else {
    directive(angular);
  }
}());
