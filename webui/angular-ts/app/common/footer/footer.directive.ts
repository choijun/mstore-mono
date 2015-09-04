/// <reference path="../../../typings/angularjs/angular.d.ts" />

module mstore {
  'use strict';
  
  @mstore.directive
  export class Footer {
    constructor() {
      return {
        replace: true,
        templateUrl: 'app/common/footer/footer.html'
      };
    }
  }
}