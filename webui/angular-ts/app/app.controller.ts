/// <reference path="../typings/angularjs/angular.d.ts" />

module mstore {
  'use strict';
  
  // @mstore.controller()
  export class AppController {
    /* @ngInject */
    constructor($router: any) {
      $router.config([
        { path: '/home', component: 'home' },
        { path: '/products', component: 'products' },
        { path: '/products/:id', component: 'product' },
        { path: '/cart', component: 'cart' },
        { path: '/checkout', component: 'checkout' },
        { path: '/orders', component: 'orders' },
        { path: '/', redirectTo: '/home' }
      ]);
    }
  }
  
  angular.module('mstore').controller('AppController', AppController);
}