/// <reference path="../../../typings/angularjs/angular.d.ts" />

module mstore {
  'use strict';

  export class Header {
    constructor() {
      return {
        replace: true,
        templateUrl: 'app/common/header/header.html'
      };
    }
  }
  
  angular.module('mstore.common').directive('header', () => new Header());
}