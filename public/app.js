'use strict';

var applicationName = 'urlcollector';

angular.module(applicationName, [
  'ngRoute',
  'presentation',
  'login',
  'sign_in',
  'main'
])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/'});
}]);

