(function () {
  'use strict';

  /* @ngInject */
  function AccountService(Storage) {
    this.repository = Storage.Accounts;
  }

  AccountService.prototype.authen = function() {
    return this.repository.authen().$promise;
  };

  AccountService.prototype.login = function() {
    return this.repository.login().$promise;
  };

  AccountService.prototype.logout = function() {
    return this.repository.logout().$promise;
  };

  angular.module('mstore').service('AccountService', AccountService);
})();
