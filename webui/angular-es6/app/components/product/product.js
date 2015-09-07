'use strict';
/* global angular */

export default class ProductController {
  /* @ngInject */
  constructor($routeParams, ProductService, $rootScope, toCurrency) {
    this.productService = ProductService;
    this.$rootScope = $rootScope;
    this.toCurrency = toCurrency;
    
    this.getProductById($routeParams.id);
  }

  getProductById(id) {
    this.productService.getProductById(id).then(
      response => angular.extend(this, {
        data: response.data,
        activeItem: response.data.items[0],
        quantity: 1
      })
    );
  }

  addToCart() {
    this.productService.addCartItem(this.activeItem.id, this.quantity).then(() => {
      this.$rootScope.$broadcast('updateCart');
    });
  }
}