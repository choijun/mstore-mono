'use strict';

export default class ToCurrency {
  constructor() {
    return amount => ('$ ' + (amount / 100).toFixed(2));
  }
}