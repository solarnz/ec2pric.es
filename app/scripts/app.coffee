'use strict'

###*
 # @ngdoc overview
 # @name ec2pricesApp
 # @description
 # # ec2pricesApp
 #
 # Main module of the application.
###
angular
  .module('ec2pricesApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngTouch',
    'ec2pricesApp-templates',
  ])
  .config ($routeProvider) ->
    $routeProvider
      .when '/',
        templateUrl: 'views/main.html'
        controller: 'MainController'
      .otherwise
        redirectTo: '/'

