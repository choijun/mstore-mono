(function () {
  'use strict';

  function Header() {
    return {
      replace: true,
      templateUrl: 'app/common/header/header.html'
    };
  }
  
  angular.module('mstore.common').directive('header', Header);
})();
