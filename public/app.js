'use strict';

var applicationName = 'urlcollector';

var mainModule = angular.module(applicationName, [
  'satellizer',
  'ngRoute',
  'ui.router',
  'presentation',
  'login',
  'sign_in',
  'main'
]).config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/'});
}]);

mainModule.config(function($authProvider) {
        // Parametros de configuración
        $authProvider.loginUrl = "http://localhost:9000/auth/login";
        $authProvider.signupUrl = "http://localhost:9000/auth/signup";
        $authProvider.tokenName = "token";
        $authProvider.tokenPrefix = "urlcollector";
    });

mainModule.config(['$locationProvider',function($locationProvider){
	$locationProvider.hashPrefix('!');
}]);

