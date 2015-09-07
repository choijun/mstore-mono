'use strict';

export default class ProductImage {
  constructor() {
    return {
      replace: true,
      scope: true,
      bindToController: {
        productId: '='
      },
      controller: () => { },
      controllerAs: 'productImage',
      templateUrl: 'app/common/product-image/product-image.html'
    };
  }
}