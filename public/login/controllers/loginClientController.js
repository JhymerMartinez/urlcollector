'use strict';

/* Controllers */

angular.module('login')
    .controller("SignUpController",['$scope','$auth', '$location',SignUpController])
    .controller("LoginController",['$scope','$auth', '$location','$http',LoginController])
    .controller("LogoutController",['$scope','$auth', '$location', LogoutController])
    .controller("PrivateController",['$scope','$http',PrivateController]);


function SignUpController($scope,$auth, $location) {  
    
    $scope.signup = function() {
        $auth.signup({
            email: $scope.email,
            password: $scope.password
        })
        .then(function() {
            // Si se ha registrado correctamente,
            // Podemos redirigirle a otra parte
            $location.path("/private");
        })
        .catch(function(response) {
            console.log("errores en signup");
        });
    }
}



function LoginController($scope, $auth, $location,$http) {  
    
    $scope.login = function(){
        $auth.login({
            email: $scope.email,
            password: $scope.password
        })
        .then(function(){
             $location.path("/private")
            
            
        })
        .catch(function(response){
            console.log("errores en login");
        });
    }
}

function LogoutController($scope,$auth, $location) {  
    $scope.logout= function(){
        $auth.logout()
        .then(function() {
            // Desconectamos al usuario y lo redirijimos
            $location.path("/")
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