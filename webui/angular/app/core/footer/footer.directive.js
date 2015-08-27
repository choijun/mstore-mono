(function () {
  'use strict';

  function Footer() {
    return {
      replace: true,
      templateUrl: 'app/core/footer/footer.tpl.html'
    };
  }
  
  angular.module('mstore.core').directive('footer', Footer);
})();
