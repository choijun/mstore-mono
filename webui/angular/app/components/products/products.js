(function () {
  'use strict';

  /* @ngInject */
  function ProductsController(ProductService) {
    ProductService.getProducts()
    .then(function(response) { this.data = response.data; }.bind(this));
  }
  
  angular.module('mstore').controller('ProductsController', ProductsController);
})();
