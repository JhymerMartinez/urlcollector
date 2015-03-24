/*
'use strict';



angular.module('login',[
  'ngRoute'
  ])
.config(['$routeProvider',function($routeProvider){
  $routeProvider
    .when('/signin', {
      templateUrl: 'login/views/signin.html',
      controller: 'LoginController'
    })
    .when('/signup', {
      templateUrl: 'login/views/signup.html',
      controller: 'LoginController',
    }) 
    .when('/me', {
        templateUrl: 'me/views/me.html',
        controller: 'LoginController'
    })
    /*.when('/logout', {
      templateUrl: null,
      controller: 'LogoutController',
    })  
    .when('/private', {
      templateUrl: 'login/views/admin.html',
      controller: 'PrivateController',
    });*/

//}]);
