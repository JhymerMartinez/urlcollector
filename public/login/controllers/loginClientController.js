'use strict';

angular
	.module('login')
        .controller("LoginController", LoginController)
        .controller("PrivateController", PrivateController);

function LoginController($scope,$auth, $location) {  
    
    $scope.signup = function() {
        console.log("esta aqui");
        $auth.signup({
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            username:this.username,
            password: this.password

        })
        .then(function() {
            // Si se ha registrado correctamente,
            // Podemos redirigirle a otra parte
            $location.path("/private");
        })
        .catch(function(response) {
            console.log(response)
        });
    }


    $scope.login = function(){
        $auth.login({
            email: this.email,
            password: this.password
        })
        .then(function(){
            // Si se ha logueado correctamente, lo tratamos aquí.
            // Podemos también redirigirle a una ruta
            $location.path("/private")
        })
        .catch(function(response){
            // Si ha habido errores llegamos a esta parte
        });
    }







}


function LogoutController($auth, $location) {  
    $auth.logout()
        .then(function() {
            // Desconectamos al usuario y lo redirijimos
            $location.path("/")
        });
}


function PrivateController(){
	
}
