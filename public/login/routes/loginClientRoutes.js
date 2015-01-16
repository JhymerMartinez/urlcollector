'use strict';

angular.module('login',['ngRoute'])
.config(['$routeProvider',function($routeProvider){
  $routeProvider.when('/login', {
    templateUrl: 'login/views/login.html',
    controller: 'loginController'
  });
}]);