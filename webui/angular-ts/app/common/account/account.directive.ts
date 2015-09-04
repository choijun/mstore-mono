/// <reference path="../../../typings/angularjs/angular.d.ts" />

module mstore {
  'use strict';
  
  class AccountController {
    accountService: mstore.AccountService;
    cacheService: mstore.CacheService;
    $location: ng.ILocationService;
    $rootScope: ng.IRootScopeService;
    loginUser: any;
    
    /* @ngInject */
    constructor(AccountService, CacheService, $location, $rootScope) {
      this.accountService = AccountService;
      this.cacheService = CacheService;
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
          this.cacheService.set('loginUser', response.data);
          this.loginUser = angular.fromJson(response.data);
        } else {
          this.cacheService.remove('loginUser');
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
        this.cacheService.remove('loginUser');
        this.loginUser = {};
        this.cacheService.remove('cartId');
        this.$rootScope.$broadcast('updateCart');
        this.$location.path('/');
      });
    }
  }
  
  @mstore.directive
  export class Account {
    constructor() {
      return {
        replace: true,
        templateUrl: 'app/common/account/account.html',
        scope: true,
        controller: AccountController,
        controllerAs: 'account'
      };
    }
  }
}