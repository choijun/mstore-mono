/// <reference path="../../../typings/angularjs/angular.d.ts" />

module mstore {
  'use strict';

  export class ProductImage {
    constructor() {
      return {
        replace: true,
        templateUrl: 'app/common/product-image/product-image.html',
        scope: true,
        controller: () => { },
        controllerAs: 'productImage',
        bindToController: {
          productId: '='
        }
      };
    }
  }
  
  angular.module('mstore.common').directive('productImage', () => new ProductImage());
}