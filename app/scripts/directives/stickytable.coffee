angular.module('ec2pricesApp')
  .directive('stickyTable', () ->
    return {
      restrict: 'A',
      link: (scope, element) ->
        element.stickyTableHeaders()
    }
  )
