'use strict';

angular.module('mstoreApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('error', {
                parent: 'site',
                url: '/error',
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/error/server_error.html'
                    }
                }
            })
            .state('access_denied', {
                parent: 'site',
                url: '/access_denied',
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/error/access_denied.html'
                    }
                }
            })
        .state('not_found', {
            parent: 'site',
            url: '/not_found',
            views: {
                'content@': {
                    templateUrl: 'scripts/app/error/not_found.html'
                }
            }
        });
    });
