'use strict';

// Declare app level module which depends on views, and components
angular.module('urlcollector', [
  'ngRoute',
  'sign_in',
  'main',
  'login',
  'presentation'

]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .otherwise({redirectTo: '/'});
}]);
