(function () {
  'use strict';

  /* @ngInject */
  function ProductController($routeParams, ProductService, $rootScope) {
    this.productService = ProductService;
    this.$rootScope = $rootScope;
    
    this.getProductById($routeParams.id);
  }

  ProductController.prototype.getProductById = function(id) {
    this.productService.getProductById(id)
    .then(function(response) {
      angular.extend(this, {
        data: response.data,
        activeItem: response.data.items[0],
        quantity: 1
      });
    }.bind(this));
  };
  
  ProductController.prototype.addToCart = function() {
    this.productService.addCartItem(this.activeItem.id, this.quantity)
    .then(function() { this.$rootScope.$broadcast('updateCart'); }.bind(this));
  };

  angular.module('mstore').controller('ProductController', ProductController);
})();
