'use strict';

export default class ProductController {
  /* @ngInject */
  constructor($routeParams, ProductService, CartService) {
    this.productService = ProductService;
    this.cartService = CartService;
    if (angular.equals({}, $routeParams)) {
      this.getProducts();
    } else {
      this.getProductById($routeParams.id);
    }
  }

  getProducts() {
    this.productService.getProducts().then(response => this.products = response);
  }

  getProductById(id) {
    this.productService.getProductById(id).then(
      response => angular.extend(this, {
        product: response,
        activeItem: response.items[0],
        quantity: 1
      })
    );
  }

  addToCart() {
    this.cartService.addCartItem(this.activeItem.id, this.quantity);
  }
}
