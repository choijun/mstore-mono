/// <reference path="../../typings/angularjs/angular.d.ts" />

module mstore {
  angular.module('mstore.common', [
    'ui.bootstrap.tpls',
    'ui.bootstrap.modal',
    'ui.bootstrap.dropdown'
  ]);
  
  toLowerCaseFirstCharacter = (name) => { return name.charAt(0).toLowerCase() + name.slice(1); }
  
  export const directive = clazz => {
    angular.module('mstore.common').directive(toLowerCaseFirstCharacter(clazz.name), () => new clazz());
  };
  
  export const filter = clazz => {
    angular.module('mstore.common').filter(toLowerCaseFirstCharacter(clazz.name), () => new clazz());
  };
}