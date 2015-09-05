'use strict';

import AccountController from './account.controller';

export default class Account {
  /* @ngInject */
  constructor() {
    return {
      replace: true,
      scope: true,
      controller: AccountController,
      controllerAs: 'account',
      templateUrl: 'app/common/account/account.html'
    };
  }
}