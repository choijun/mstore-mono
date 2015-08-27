'use strict';

export default class Account {
  /* @ngInject */
  constructor() {
    return {
      controller: 'AccountController as ctrl',
      scope: true,
      replace: true,
      templateUrl: 'app/core/account/account.tpl.html'
    };
  }
}
