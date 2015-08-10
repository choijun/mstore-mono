(function () {
  'use strict';

  angular.module('mstore').directive('header', Header);

  function Header() {
    return {
      replace: true,
      templateUrl: 'app/shared/header/header.tpl.html'
    };
  }
})();
