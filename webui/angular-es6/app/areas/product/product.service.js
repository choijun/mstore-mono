'use strict';

export default class ProductService {
  /* @ngInject */
  constructor(Storage) {
    this.repository = Storage.Products;
  }

  getProducts() {
    return this.repository.query().$promise;
  }

  getProductById(id) {
    return this.repository.get({ id: id }).$promise;
  }
}
