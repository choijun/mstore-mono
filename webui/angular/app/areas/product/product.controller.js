(function () {
  'use strict';

  /* @ngInject */
  function ProductController($routeParams, ProductService, CartService) {
    this.productService = ProductService;
    this.cartService = CartService;
    if (angular.equals({}, $routeParams)) {
      this.getProducts();
    } else {
      this.getProductById($routeParams.id);
    }
  }

  ProductController.prototype.getProducts = function() {
    this.productService.getProducts()
    .then(function(response) {
      this.products = response;
    }.bind(this));
  };

  ProductController.prototype.getProductById = function(id) {
    this.productService.getProductById(id)
    .then(function(response) {
      angular.extend(this, {
        product: response,
        activeItem: response.items[0],
        quantity: 1
      });
    }.bind(this));
  };

  ProductController.prototype.addToCart = function() {
    this.cartService.addCartItem(this.activeItem.id, this.quantity);
  };

  angular.module('mstore').controller('ProductController', ProductController);
})();
