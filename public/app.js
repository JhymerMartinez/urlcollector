'use strict';

var applicationName = 'urlcollector';

var mainModule = angular.module(applicationName, [
  'ngRoute',
  'presentation',
  'login',
  'sign_in',
  'main'
]).config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/'});
}]);

mainModule.config(['$locationProvider',function($locationProvider){
	$locationProvider.hashPrefix('!');
}]);
