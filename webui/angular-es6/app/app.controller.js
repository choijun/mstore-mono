'use strict';

export default class AppController {
  /* @ngInject */
  constructor($router) {
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