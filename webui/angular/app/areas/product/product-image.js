(function () {
  'use strict';

  angular.module('mstore').directive('productImage', ProductImage);

  function ProductImage() {
    return {
      controller: ProductImageController,
      controllerAs: 'dctrl',
      bindToController: {
        productId: '='
      },
      scope: true,
      replace: true,
      templateUrl: 'app/areas/product/product-image.tpl.html'
    };
  }

  function ProductImageController() { }
})();
