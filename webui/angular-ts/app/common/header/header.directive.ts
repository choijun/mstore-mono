/// <reference path="../../../typings/angularjs/angular.d.ts" />

module mstore {
  'use strict';
  
  @mstore.directive
  export class Header {
    constructor() {
      return {
        replace: true,
        templateUrl: 'app/common/header/header.html'
      };
    }
  }
}