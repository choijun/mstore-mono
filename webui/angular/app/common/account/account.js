(function () {
  'use strict';

  /* @ngInject */
  function AccountController(AccountService, CacheService, $location, $rootScope) {
    this.accountService = AccountService;
    this.cacheService = CacheService;
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
        this.cacheService.set('loginUser', response.data);
        this.loginUser = angular.fromJson(response.data);
      } else {
        this.cacheService.remove('loginUser');
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
      this.cacheService.remove('loginUser');
      this.loginUser = {};
      this.cacheService.remove('cartId');
      this.$rootScope.$broadcast('updateCart');
      this.$location.path('/');
    }.bind(this));
  };
  
  function Account() {
    return {
      controller: AccountController,
      controllerAs: 'account',
      scope: true,
      replace: true,
      templateUrl: 'app/common/account/account.html'
    };
  }
  
  angular.module('mstore.common').directive('account', Account);
})();
