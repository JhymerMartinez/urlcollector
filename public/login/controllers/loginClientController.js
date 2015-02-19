'use strict';

angular.module('login')
.controller('loginController', function($scope, $rootScope, $http, $location) {
	 $scope.user = {};
  	
  	
	$http.get('/api/data').success(function(data) {
    	$scope.a= data.a;
    	$scope.b= data.b;
  	});



  	$scope.login = function(){
  		

	    $http.post('/login', {
	      username: $scope.user.username,
	      password: $scope.user.password,
	    })
	    .success(function(user){
	      // No error: authentication OK
	      $rootScope.message = 'Authentication successful!';
	      $location.url('/admin');
	    })
	    .error(function(){
	      // Error: authentication failed
	      $rootScope.message = 'Authentication failed.';
	      $location.url('/login');
	    });
  	};
});

