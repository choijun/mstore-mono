(function () {
  'use strict';

  /* @ngInject */
  function AccountController(AccountService, Cache, $location, $rootScope) {
    this.accountService = AccountService;
    this.cache = Cache;
    this.$location = $location;
    this.$rootScope = $rootScope;
    this.loginUser = {};
    this.authen();
    $rootScope.$on('login', function(event, cb) { this.login(cb); }.bind(this));
  }

  AccountController.prototype.authen = function() {
    this.accountService.authen()
    .then(function(response) {
      if (response.data) {
        this.cache.set('loginUser', response.data);
        this.loginUser = angular.fromJson(response.data);
      } else {
        this.cache.remove('loginUser');
        this.loginUser = {};
      }
    }.bind(this));
  };

  AccountController.prototype.login = function(cb) {
    this.accountService.login()
    .then(function() {
      this.authen();
      this.$rootScope.$broadcast('updateCart');
      if (cb && typeof cb === 'function') { cb(); }
    }.bind(this));
  };

  AccountController.prototype.logout = function() {
    this.accountService.logout()
    .then(function() {
      this.cache.remove('loginUser');
      this.loginUser = {};
      this.cache.remove('cartId');
      this.$rootScope.$broadcast('updateCart');
      this.$location.path('/');
    }.bind(this));
  };
  
  angular.module('mstore.core').controller('AccountController', AccountController);
})();
