(function () {
  'use strict';

  /* @ngInject */
  function ProductService(Storage) {
    this.repository = Storage.Products;
  }

  ProductService.prototype.getProducts = function() {
    return this.repository.query().$promise;
  };

  ProductService.prototype.getProductById = function(id) {
    return this.repository.get({ id: id }).$promise;
  };

  angular.module('mstore').service('ProductService', ProductService);
})();
