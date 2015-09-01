(function () {
  'use strict';

  function format() {
    return function (input) {
      var args = arguments;
      return input.replace(/\{(\d+)\}/g, function (match, capture) {
        return args[1 * capture + 1];
      });
    };
  }

  angular.module('mstore.common').filter('format', format);
})();