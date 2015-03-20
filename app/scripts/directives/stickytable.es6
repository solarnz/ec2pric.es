'use strict';

angular.module('ec2pricesApp')
  .directive('stickyTable', () => {
    return {
      restrict: 'A',
      link: function(scope, element) {
        element.stickyTableHeaders();
      }
    };
  });
