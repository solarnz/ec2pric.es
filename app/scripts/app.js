(function() {
  'use strict';

  var app = function(angular) {
    angular
    .module('ec2pricesApp', [
      'ngRoute'
    ])
    .config(($provide, $routeProvider) => {
      $provide.value('regions', [
          'us-east-1',
          'us-west-2',
          'us-west-1',
          'eu-west-1',
          'eu-central-1',
          'ap-southeast-1',
          'ap-southeast-2',
          'ap-northeast-1',
          'sa-east-1',
      ]);

      $provide.value('operatingSystems', [
        'linux',
        'mswin',
        'mswinSQL',
        'mswinSQLWeb',
      ]);

      $routeProvider
        .when('/', {
          templateUrl: '/main.html',
          controller: 'MainController'
        })
        .otherwise({
          redirectTo: '/'
        });
    });
  };

  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = function() {
      var angular = require('angular');
      return app(angular);
    };
  } else {
    app(angular);
  }
}());