'use strict';

angular.module('mstoreApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('home', {
                parent: 'site',
                url: '/',
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/home/home.html',
                        controller: 'HomeController'
                    }
                }
            });
    });
