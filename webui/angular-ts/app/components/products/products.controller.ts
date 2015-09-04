/// <reference path="../../../typings/angularjs/angular.d.ts" />

module mstore {
  'use strict';
  
  @mstore.controller
  export class ProductsController {
    data : Object;
    
    /* @ngInject */
    constructor(ProductService) {
      ProductService.getProducts().then(response => this.data = response.data);
    }
  }
}