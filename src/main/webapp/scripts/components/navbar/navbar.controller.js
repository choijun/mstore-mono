'use strict';

angular.module('mstoreApp')
    .controller('NavbarController', function($scope, $location, $state,$http) {
        $scope.$state = $state;
        function init(){
            $scope.getUsername();
        }
        $scope.username='';
        $scope.getUsername = function(){
            $http.get("api/login-user").success(function(user){
               $scope.username = user.username;
            });
        }
        init();
    });
