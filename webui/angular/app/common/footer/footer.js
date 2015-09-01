(function () {
  'use strict';

  function Footer() {
    return {
      replace: true,
      templateUrl: 'app/common/footer/footer.html'
    };
  }
  
  angular.module('mstore.common').directive('footer', Footer);
})();
