'use strict';

export default class ProductsController {
  /* @ngInject */
  constructor(ProductService) {
    ProductService.getProducts().then(response => this.data = response.data);
  }
}