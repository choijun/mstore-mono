'use strict';
/* global angular */

export default class AccountController {
  /* @ngInject */
  constructor(AccountService, Cache, $location, $rootScope) {
    this.accountService = AccountService;
    this.cache = Cache;
    this.$location = $location;
    this.$rootScope = $rootScope;
    this.loginUser = {};
    this.authen();
    $rootScope.$on('login', (event, cb) => this.login(cb));
  }

  authen() {
    this.accountService.authen()
    .then(response => {
      if (response.data) {
        this.cache.set('loginUser', response.data);
        this.loginUser = angular.fromJson(response.data);
      } else {
        this.cache.remove('loginUser');
        this.loginUser = {};
      }
    });
  }

  login(cb) {
    this.accountService.login()
    .then(() => {
      this.authen();
      this.$rootScope.$broadcast('updateCart');
      if (cb && typeof cb === 'function') { cb(); }
    });
  }

  logout() {
    this.accountService.logout()
    .then(() => {
      this.cache.remove('loginUser');
      this.loginUser = {};
      this.cache.remove('cartId');
      this.$rootScope.$broadcast('updateCart');
      this.$location.path('/');
    });
  }
}