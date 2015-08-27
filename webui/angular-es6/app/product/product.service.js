'use strict';

export default class ProductService {
  /* @ngInject */
  constructor($http, Cache) {
    this.$http = $http;
    this.cache = Cache;
  }

  getProducts() {
    return this.$http.get('api/products');
  }

  getProductById(id) {
    return this.$http.get(`api/products/${id}`);
  }
  
  addCartItem(itemId, quantity) {
    var cartItem = {
      cartId: this.cache.get('cartId'),
      itemId: itemId,
      quantity: quantity
    };
    return this.$http.post(`api/carts/items?cartId=${cartItem.cartId}`, cartItem);
  }
}