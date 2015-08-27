(function () {
  'use strict';

  /* @ngInject */
  function AccountService($http) {
    this.$http = $http;
  }

  AccountService.prototype.authen = function() {
    return this.$http.get('api/auth/user');
  };

  AccountService.prototype.login = function() {
    return this.$http.get('api/login');
  };

  AccountService.prototype.logout = function() {
    return this.$http.post('api/logout');
  };

  angular.module('mstore.core').service('AccountService', AccountService);
})();
