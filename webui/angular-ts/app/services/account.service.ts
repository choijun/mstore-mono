/// <reference path="../../typings/angularjs/angular.d.ts" />

module mstore {
  'use strict';

  export class AccountService {
    $http: ng.IHttpService;
    
    /* @ngInject */
    constructor($http) {
      this.$http = $http;
    }
  
    authen() {
      return this.$http.get('api/auth/user');
    }
  
    login() {
      return this.$http.get('api/login');
    }
  
    logout() {
      return this.$http.post('api/logout', {});
    }
  }
  
  angular.module('mstore.services').service('AccountService', AccountService);
}