'use strict';

var applicationName = 'urlcollector';

var mainModule = angular.module(applicationName, [
  'ngRoute',
  'satellizer',
  'presentation',
  'login'
])
.config(['$authProvider','$routeProvider','$locationProvider','$httpProvider', 'satellizer.config',
  function($authProvider,$routeProvider,$locationProvider,$httpProvider, config) {
    
     $authProvider.loginUrl = "http://localhost:9000/auth/login";
    $authProvider.signupUrl = "http://localhost:9000/auth/signup";
    $authProvider.tokenName = "token";
    $authProvider.tokenPrefix = "urlcollector",
    
    $routeProvider
    .when('/', {
        templateUrl: 'presentation/views/presentation.html',
        controller: 'presentationController'
      })
    .when('/login', {
      templateUrl: 'login/views/login.html',
      controller: 'LoginController'
    })
    .when('/signup', {
      templateUrl: 'login/views/signup.html',
      controller: 'SignUpController',
    }) 
    .when('/logout', {
      templateUrl: null,
      controller: 'LogoutController',
    }) 
    .when('/private', {
        templateUrl: 'login/views/private.html',
        controller: 'PrivateController'
    })
    .otherwise({redirectTo: '/'});

   $locationProvider.hashPrefix('!');

    $httpProvider.interceptors.push(['$q','$location', function($q,$location) {
        var tokenName = config.tokenPrefix ? config.tokenPrefix + '_' + config.tokenName : config.tokenName;
        console.log("nombre token"+tokenName)
        return {
          'request': function(httpConfig) {
            var token = localStorage.getItem(tokenName);
            if (token && config.httpInterceptor) {
              token = config.authHeader === 'Authorization' ? 'Bearer ' + token : token;
              httpConfig.headers[config.authHeader] = token;
            }
            return httpConfig;
          },
         'responseError': function(response) {
            if(response.status === 401 || response.status === 403) {
                $location.path("/login");
                //console.log("eror en respuesta");
            }
            return $q.reject(response);
          }
        };
      }]);
}]);



/*
mainModule.config(function($authProvider) {
        // Parametros de configuración
        $authProvider.loginUrl = "http://localhost:9000/auth/login";
        $authProvider.signupUrl = "http://localhost:9000/auth/signup";
        $authProvider.tokenName = "token";
        $authProvider.tokenPrefix = "urlcollector";
    });
*/
/*
mainModule.config(['$locationProvider',function($locationProvider){
	$locationProvider.hashPrefix('!');
}]);*/

