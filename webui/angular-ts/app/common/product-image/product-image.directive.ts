/// <reference path="../../../typings/angularjs/angular.d.ts" />

module mstore {
  'use strict';
  
  @mstore.directive
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
}