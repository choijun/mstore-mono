(function () {
  'use strict';

  function ProductImage() {
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
  
  angular.module('mstore.product').directive('productImage', ProductImage);
})();
