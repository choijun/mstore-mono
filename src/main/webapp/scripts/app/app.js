'use strict';

angular.module('mstoreApp', ['ngResource', 'ui.router', 'ngCookies', 'ui.bootstrap'])
    .run(function($rootScope, $location, $window, $http, $state, ENV, VERSION) {
        $rootScope.ENV = ENV;
        $rootScope.VERSION = VERSION;
        $rootScope.back = function() {
            // If previous state is 'activate' or do not exist go to 'home'
            if ($rootScope.previousStateName === 'activate' || $state.get($rootScope.previousStateName) === null) {
                $state.go('home');
            } else {
                $state.go($rootScope.previousStateName, $rootScope.previousStateParams);
            }
        };
    })

    .config(function($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {

        $urlRouterProvider.otherwise('/');
        $stateProvider.state('site', {
            'abstract': true,
            views: {
                'navbar@': {
                    templateUrl: 'scripts/components/navbar/navbar.html',
                    controller: 'NavbarController'
                }
            }
        });

    }).factory('authHttpResponseInterceptor',['$q','$location',function($q,$location){
        return {
            responseError: function(rejection) {
                if (rejection.status === 404) {
                    console.log("Response Error 404",rejection);
                    $location.path('/not_found');
                }
                if (rejection.status === 500) {
                    console.log("Response Error 500",rejection);
                    $location.path('/error');
                }
                if (rejection.status === 403) {
                    console.log("Response Error 403",rejection);
                    $location.path('/access_denied');
                }
                if (rejection.status === 401) {
                    console.log("Response Error 401",rejection);
                    $location.path('/login');
                }
                return $q.reject(rejection);
            }
        }
    }]).config(['$httpProvider',function($httpProvider) {
        $httpProvider.interceptors.push('authHttpResponseInterceptor');
    }]);
