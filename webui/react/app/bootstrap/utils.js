'use strict';

class Utils {
  constructor() { }

  toCurrency(amount) {
    return '$ ' + (amount / 100).toFixed(2);
  }
}

export default new Utils();
