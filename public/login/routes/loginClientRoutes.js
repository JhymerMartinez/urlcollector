'use strict';



angular.module('login',['ngRoute'])
.config(['$routeProvider',function($routeProvider,$scope){
  $routeProvider.when('/login', {
    templateUrl: 'login/views/login.html',
    controller: 'loginController'
  })
  .when('/admin', {
    templateUrl: 'login/views/admin.html',
    controller: 'loginController',
  });

}]);