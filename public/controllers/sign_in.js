'use strict';

angular.module('sign_in', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/sign_in', {
    templateUrl: 'views/sign_in.html',
    controller: 'signInCtrl'
  });
}])

.controller('signInCtrl', [function() {

}]);