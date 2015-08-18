'use strict';

export default class ProductImageController {
  constructor() { }
}

export default class ProductImage {
  constructor() {
    return {
      controller: 'ProductImageController as dctrl',
      bindToController: {
        productId: '='
      },
      scope: true,
      replace: true,
      templateUrl: 'app/areas/product/product-image.tpl.html'
    };
  }
}
