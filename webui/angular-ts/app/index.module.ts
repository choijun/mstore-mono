/// <reference path="../typings/angularjs/angular.d.ts" />

module mstore {
  'use strict';
  
  angular.module('mstore', [
    'ngNewRouter',
    'mstore.services',
    'mstore.common'
  ])
  .config(/* @ngInject */($compileProvider, $componentLoaderProvider) => {
    // disable debug info
    $compileProvider.debugInfoEnabled(false);
    // set templates path
    $componentLoaderProvider.setTemplateMapping(name => `app/components/${name}/${name}.html`);
  });
  
  export const controller = clazz => angular.module('mstore').controller(clazz.name, clazz);
}