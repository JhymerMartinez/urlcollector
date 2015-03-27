
'use strict';



angular.module('login',[
  'ngRoute'
  ])
.config(['$routeProvider',function($routeProvider){
  $routeProvider
    .when('/login', {
      templateUrl: 'login/views/login.html',
      controller: 'LoginController'
    })
    .when('/signup', {
      templateUrl: 'login/views/signup.html',
      controller: 'LoginController',
    }) 
    .when('/logout', {
      templateUrl: null,
      controller: 'LoginController',
    }) 
    .when('/private', {
        templateUrl: 'login/views/private.html',
        controller: 'LoginController'
    })

}]);
