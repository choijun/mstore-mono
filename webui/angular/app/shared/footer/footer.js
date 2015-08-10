(function () {
  'use strict';

  angular.module('mstore').directive('footer', Footer);

  function Footer() {
    return {
      replace: true,
      templateUrl: 'app/shared/footer/footer.tpl.html'
    };
  }
})();
