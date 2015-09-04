module mstore {
  'use strict';

  export class ToCurrency {
    constructor() {
      return (amount: number) => ('$ ' + (amount / 100).toFixed(2));
    }
  }
  
  angular.module('mstore.common').filter('toCurrency', () => new ToCurrency());
}