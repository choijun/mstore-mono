module mstore {
  'use strict';
  
  @mstore.filter
  export class ToCurrency {
    constructor() {
      return amount => ('$ ' + (amount / 100).toFixed(2));
    }
  }
}