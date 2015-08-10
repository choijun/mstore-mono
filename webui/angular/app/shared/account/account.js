(function () {
  'use strict';

  angular.module('mstore').directive('account', Account);

  function Account() {
    return {
      controller: AccountController,
      controllerAs: 'ctrl',
      scope: true,
      replace: true,
      templateUrl: 'app/shared/account/account.tpl.html'
    };
  }

  /* ngInject */
  function AccountController(AccountService, Cache, PubSub, $location) {
    this.accountService = AccountService;
    this.cache = Cache;
    this.pubsub = PubSub;
    this.location = $location;
    this.loginUser = {};
    this.authen();
    PubSub.subscribe('login', this.login.bind(this));
  }

  AccountController.prototype.authen = function() {
    this.accountService.authen()
    .then(function(response) {
      if (response.loginUser) {
        this.cache.set('loginUser', response.loginUser);
        this.loginUser = angular.fromJson(response.loginUser);
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
      this.pubsub.publish('updateCart');
      if (cb && typeof cb === 'function') { cb(); }
    }.bind(this));
  };

  AccountController.prototype.logout = function() {
    this.accountService.logout()
    .then(function() {
      this.cache.remove('loginUser');
      this.loginUser = {};
      this.cache.remove('cartId');
      this.pubsub.publish('updateCart');
      this.location.path('/');
    }.bind(this));
  };
})();
