(function () {
  'use strict';

  function Account() {
    return {
      controller: 'AccountController as ctrl',
      scope: true,
      replace: true,
      templateUrl: 'app/core/account/account.tpl.html'
    };
  }
  
  angular.module('mstore.core').directive('account', Account);
})();
