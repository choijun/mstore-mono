(function () {
  'use strict';

  angular.module('mstore', [
    'ngNewRouter',
    'mstore.services',
    'mstore.common'
  ])
  .controller('AppController', /* @ngInject */function ($router) {
    $router.config([
      { path: '/home', component: 'home' },
      { path: '/products', component: 'products' },
      { path: '/products/:id', component: 'product' },
      { path: '/cart', component: 'cart' },
      { path: '/checkout', component: 'checkout' },
      { path: '/orders', component: 'orders' },
      { path: '/', redirectTo: '/home' }
    ]);
  })
  .config(/* @ngInject */function($compileProvider, $componentLoaderProvider) {
    // disable debug info
    $compileProvider.debugInfoEnabled(false);
    // set templates path
    $componentLoaderProvider.setTemplateMapping(function(name) {
      return '/app/components/' + name + '/' + name + '.html';
    });
  });
})();
