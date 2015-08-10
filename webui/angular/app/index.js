(function () {
  'use strict';

  angular.module('mstore', ['ngRoute', 'ngResource', 'ui.bootstrap.tpls', 'ui.bootstrap.dropdown', 'ui.bootstrap.modal']);

  angular.element(document).ready(function () {
    angular.bootstrap(document, ['mstore']);
  });
})();
