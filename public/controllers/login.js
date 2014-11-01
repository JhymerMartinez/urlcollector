'use strict';

angular.module('login',['ngRoute'])
.config(['$routeProvider',function($routeProvider){
  $routeProvider.when('/login', {
    templateUrl: 'views/login.html',
    controller: 'loginCtrl'
  });
}])

.controller('loginCtrl', function($scope) {
	 

});

