(function () {
  'use strict';

  function ProductImage() {
    return {
      controller: function () { },
      controllerAs: 'productImage',
      bindToController: {
        productId: '='
      },
      scope: true,
      replace: true,
      templateUrl: 'app/common/product-image/product-image.html'
    };
  }
  
  angular.module('mstore.common').directive('productImage', ProductImage);
})();
