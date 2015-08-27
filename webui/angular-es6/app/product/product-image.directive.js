'use strict';

export default class ProductImage {
  constructor() {
    return {
      controller: function () { },
      controllerAs: 'dctrl',
      bindToController: {
        productId: '='
      },
      scope: true,
      replace: true,
      templateUrl: 'app/product/product-image.tpl.html'
    };
  }
}