(function () {
  'use strict';
  
  angular.module('mstore.product', ['ngRoute', 'mstore.common'])
  .config(/* @ngInject */function($routeProvider) {
    $routeProvider
    .when('/products', {
      templateUrl: 'app/product/products.tpl.html',
      controller: 'ProductController as ctrl'
    })
    .when('/products/:id', {
      templateUrl: 'app/product/product.tpl.html',
      controller: 'ProductController as ctrl'
    });
  });
})();