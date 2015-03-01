'use strict';



angular.module('login',['ngRoute'])
.config(['$routeProvider',function($routeProvider,$scope){
  $routeProvider
    .when('/login', {
      templateUrl: 'login/views/login.html',
      controller: 'LoginController'
    })
    .when('/signup', {
      templateUrl: 'login/views/signup.html',
      controller: 'LoginController',
    }) 
    /*.when('/logout', {
      templateUrl: null,
      controller: 'LogoutController',
    })  */
    .when('/private', {
      templateUrl: 'login/views/admin.html',
      controller: 'PrivateController',
    });

}]);