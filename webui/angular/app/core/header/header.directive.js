(function () {
  'use strict';

  function Header() {
    return {
      replace: true,
      templateUrl: 'app/core/header/header.tpl.html'
    };
  }
  
  angular.module('mstore.core').directive('header', Header);
})();
