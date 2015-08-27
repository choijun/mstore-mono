'use strict';
/* global angular */

export default class ProductController {
  /* @ngInject */
  constructor($routeParams, ProductService, $rootScope) {
    this.productService = ProductService;
    this.$rootScope = $rootScope;
    
    if (angular.equals({}, $routeParams)) {
      this.getProducts();
    } else {
      this.getProductById($routeParams.id);
    }
  }

  getProducts() {
    this.productService.getProducts().then(response => this.products = response.data);
  }

  getProductById(id) {
    this.productService.getProductById(id).then(
      response => angular.extend(this, {
        product: response.data,
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