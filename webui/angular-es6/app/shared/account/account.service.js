'use strict';

export default class AccountService {
  /* ngInject */
  constructor(Storage) {
    this.repository = Storage.Accounts;
  }

  authen() {
    return this.repository.authen().$promise;
  }

  login() {
    return this.repository.login().$promise;
  }

  logout() {
    return this.repository.logout().$promise;
  }
}
