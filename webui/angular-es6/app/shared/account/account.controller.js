'use strict';

export default class AccountController {
  /* ngInject */
  constructor(AccountService, Cache, PubSub, $location) {
    this.accountService = AccountService;
    this.cache = Cache;
    this.pubsub = PubSub;
    this.location = $location;
    this.loginUser = {};
    this.authen();
    PubSub.subscribe('login', this.login.bind(this));
  }

  authen() {
    this.accountService.authen()
    .then(response => {
      if (response.loginUser) {
        this.cache.set('loginUser', response.loginUser);
        this.loginUser = angular.fromJson(response.loginUser);
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
      this.pubsub.publish('updateCart');
      if (cb && typeof cb === 'function') { cb(); }
    });
  }

  logout() {
    this.accountService.logout()
    .then(() => {
      this.cache.remove('loginUser');
      this.loginUser = {};
      this.cache.remove('cartId');
      this.pubsub.publish('updateCart');
      this.location.path('/');
    });
  }
}
