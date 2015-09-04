/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-route.d.ts" />

module mstore {
  'use strict';
  
  export interface IProductsApiResponse extends mstore.IApiResponse {
    data: { items: Array<any> };
  }
  
  export interface IProductRouteParams extends ng.route.IRouteParamsService {
    id: string;
  }

  export class ProductController {
    $routeParams: ng.route.IRouteParamsService;
    productService: mstore.ProductService;
    $rootScope: ng.IRootScopeService;
    data: any;
    activeItem: any;
    quantity: number;
    
    /* @ngInject */
    constructor($routeParams: mstore.IProductRouteParams, 
                ProductService: mstore.ProductService, 
                $rootScope: ng.IRootScopeService) {
      this.productService = ProductService;
      this.$rootScope = $rootScope;
      
      this.getProductById($routeParams.id);
    }
  
    getProductById(id: string) {
      this.productService.getProductById(id).then(
        (response: mstore.IProductsApiResponse) => angular.extend(this, {
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
  
  angular.module('mstore').controller('ProductController', ProductController);
}