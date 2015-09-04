/// <reference path="../typings/angularjs/angular.d.ts" />

module mstore {
  'use strict';
  
  angular.module('mstore', [
    'ngNewRouter',
    'mstore.services',
    'mstore.common'
  ])
  .config(/* @ngInject */($compileProvider: ng.ICompileProvider, $componentLoaderProvider: any) => {
    // disable debug info
    $compileProvider.debugInfoEnabled(false);
    // set templates path
    $componentLoaderProvider.setTemplateMapping(name => `app/components/${name}/${name}.html`);
  });
  
  export interface IApiResponse {
    data: any;
  }
}