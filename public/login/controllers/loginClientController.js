'use strict';

/* Controllers */

angular.module('login')
    .controller("LoginController",['$scope','$auth', '$location','MenuService',LoginController])
    .controller("PrivateController",['$scope','$http',PrivateController]);




function LoginController($scope, $auth, $location,MenuService) {




    MenuService.checkInitial();


    $scope.signup = function() {
        $auth.signup({
            firstName:$scope.firstName,
            lastName:$scope.lastName,
            email: $scope.email,
            username:$scope.username,
            password: $scope.password

        })
        .then(function(apiData) {
            MenuService.checkGlobal(function(){
                $location.path("/private");
            });
        })
        .catch(function(response) {
            console.log("errores en signup");
        });
    };

    $scope.login = function(){
        $auth.login({
            email: $scope.email,
            password: $scope.password
        })
        .then(function(apiData){
            MenuService.checkGlobal(function(){
                $location.path("/private");
            });
        })
        .catch(function(response){
            console.log("errores en login");
        });
    };


    $scope.logout= function(){
        $auth.logout()
        .then(function() {
            MenuService.checkGlobal(function(){
                $location.path("/");
            });
        });
    };
}





function PrivateController($scope,$http){
   

        $http({url: '/private', method: 'GET'})
            .success(function (data) {

                $scope.firstName= data.firstName;
                $scope.lastName = data.lastName;
             
            })
}

