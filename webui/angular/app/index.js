(function () {
  'use strict';
  /* global angular */

  angular.module('mstore', ['mstore.core', 'mstore.product', 'mstore.cart', 'mstore.order'])
  .config(/* @ngInject */function($compileProvider) {
    // disable debug info
    $compileProvider.debugInfoEnabled(false);
  });

  angular.element(document).ready(function () {
    angular.bootstrap(document, ['mstore']);
  });
})();
