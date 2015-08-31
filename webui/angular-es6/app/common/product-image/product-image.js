'use strict';

export default class ProductImage {
  constructor() {
    return {
      controller: () => { },
      controllerAs: 'productImage',
      bindToController: {
        productId: '='
      },
      scope: true,
      replace: true,
      templateUrl: 'app/common/product-image/product-image.html'
    };
  }
}