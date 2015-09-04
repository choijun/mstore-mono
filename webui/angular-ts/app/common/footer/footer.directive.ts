/// <reference path="../../../typings/angularjs/angular.d.ts" />

module mstore {
  'use strict';

  export class Footer {
    constructor() {
      return {
        replace: true,
        templateUrl: 'app/common/footer/footer.html'
      };
    }
  }
  
  angular.module('mstore.common').directive('footer', () => new Footer());
}