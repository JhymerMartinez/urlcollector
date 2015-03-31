'use strict';

angular.module('login')
    .factory('MenuService',['$rootScope','satellizer.config', '$http',function($rootScope,config,$http) {


        function formatName(){
            $http({url: '/private', method: 'GET'})
                .success(function (data) {
                    $rootScope.completeName = data.firstName+ " "+data.lastName;
                    //$scope.firstName= data.firstName;
                    //$scope.lastName = data.lastName;

                })
        }


        function check(){
            var tokenName = config.tokenPrefix ? config.tokenPrefix + '_' + config.tokenName : config.tokenName;
            var tokenLocal = localStorage.getItem(tokenName);

            if(tokenLocal){
                $rootScope.newtoken = true;
                formatName();
            }else{
                $rootScope.newtoken = false;
            }
        }

        return {

            checkInitial:function(){
                check();
            },

            checkGlobal:function(next){
                check();
                next();
            }
        }
}]);