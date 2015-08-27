(function () {
  'use strict';
  
  angular.module('mstore.core', ['ngRoute', 'ui.bootstrap.dropdown', 'mstore.common'])
  .config(/* @ngInject */function($routeProvider) {
    $routeProvider
    .when('/', {
      templateUrl: 'app/core/home.tpl.html'
    })
    .otherwise({
      redirectTo: '/'
    });
  });
})();