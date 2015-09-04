/// <reference path="../../typings/angularjs/angular.d.ts" />

module mstore {
  'use strict';
  
  angular.module('mstore.services', []);
  
  export const service = clazz => angular.module('mstore.services').service(clazz.name, clazz);
}