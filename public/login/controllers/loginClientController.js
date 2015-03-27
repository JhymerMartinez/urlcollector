'use strict';

/* Controllers */

angular.module('login')
    .controller("LoginController",['$scope','$auth', '$location','$http', LoginController])
    .controller("PrivateController",['$scope','$http',PrivateController])
    .controller("NavBarController",['$scope','$auth', '$location','satellizer.config',NavBarController]);;


function LoginController($scope, $auth, $location,$http) {  
    
    
    
    $scope.signup = function() {
        $auth.signup({
            email: $scope.email,
            password: $scope.password
        })
        .then(function(apiData) {
            $scope.token = true;
            $location.path("/private");
        })
        .catch(function(response) {
            console.log("errores en signup");
        });
    }

    $scope.login = function(){
        $auth.login({
            email: $scope.email,
            password: $scope.password
        })
        .then(function(apiData){
            
            $scope.token = true;
             $location.path("/private")
            
            
        })
        .catch(function(response){
            console.log("errores en login");
        });
    }



}


function PrivateController($scope,$http){
   

    $http({url: '/private', method: 'GET'})
            .success(function (data) {
              $scope.nombre = data.nombre;
              $scope.apellido = data.apellido;
              console.log(data.nombre + " "+data.apellido);
             
            })
}

function NavBarController($scope,$auth, $location,config){
    var tokenName = config.tokenPrefix ? config.tokenPrefix + '_' + config.tokenName : config.tokenName;
    var tokenLocal = localStorage.getItem(tokenName);

    if(tokenLocal){
        $scope.token = true;
        console.log("esta en el true")
    }else{
        $scope.token = false;
        console.log("esta en el false")
    }


    $scope.logout= function(){
        $auth.logout()
        .then(function() {
            $scope.token = false;
            $location.path("/")
        });
    }
}

