'use strict';

angular.module('presentation', [
  'ngRoute',
  'ui.bootstrap'
  ])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'views/presentation.html',
    controller: 'presentationCtrl'
  });
}])

.controller('presentationCtrl', function($scope) {
/*	 
   $scope.load = function() {

      $('#login').toggle();
      $('#triangle').toggle();

      $('#toggle-login').click(function(){
          $('#login').toggle();
          $('#triangle').toggle();
       });  

    }

       //don't forget to call the load function
   $scope.load();*/

    var baseURL ='http://lorempixel.com/960/450/';
    $scope.setInterval=5000; 

    $scope.slides =[
      {
        title: 'Aprende a mantenerte en forma',
        image:baseURL+'sports',
        text:'¡Practica algun deporte!'
      },
      {
        title: 'Buena alimentacion',
        image:baseURL+'food',
        text:'¡Come frutas y verduras!'
      },
      {
        title: 'En contacto con la naturaleza',
        image:baseURL+'nature',
        text:'¡Mantente en armonia con la naturaleza!'
      }
    ];


    var baseURL2 ='http://lorempixel.com/200/200/';

    $scope.contenido =[
      {
        img:baseURL2+'people',
        title:'Sobre Nosotros',
        summary:'Somos empresa comprometida con la vida sana'
      },
      {
        img:baseURL2+'business',
        title:'Nuestros servicios',
        summary:'Ofrecemos asesoria...'
      },
      {
        img:baseURL2+'transport',
        title:'Contactanos',
        summary:'Buena vida online....'
      }
    ];


});