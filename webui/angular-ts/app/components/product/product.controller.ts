/// <reference path="../../../typings/angularjs/angular.d.ts" />

module mstore {
  'use strict';
  
  interface IRouteParams extends ng.route.IRouteParamsService {
    id: string;
  }
 
  
  @mstore.controller
  export class ProductController {
    $routeParams: IRouteParams;
    productService: mstore.ProductService;
    $rootScope: ng.IRootScopeService;
    data: any;
    activeItem: any;
    quantity: number;
    
    /* @ngInject */
    constructor($routeParams, ProductService, $rootScope) {
      this.productService = ProductService;
      this.$rootScope = $rootScope;
      
      this.getProductById($routeParams.id);
    }
  
    getProductById(id) {
      this.productService.getProductById(id).then(
        response => angular.extend(this, {
          data: response.data,
          activeItem: response.data.items[0],
          quantity: 1
        })
      );
    }
  
    addToCart() {
      this.productService.addCartItem(this.activeItem.id, this.quantity).then(() => {
        this.$rootScope.$broadcast('updateCart');
      });
    }
  }
}