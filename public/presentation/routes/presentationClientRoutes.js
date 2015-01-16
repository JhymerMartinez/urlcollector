'use strict';

angular.module('presentation', ['ngRoute'])
	.config(['$routeProvider', function($routeProvider) {
	  $routeProvider.when('/', {
	    templateUrl: 'presentation/views/presentation.html',
	    controller: 'presentationController'
	  });
	}])