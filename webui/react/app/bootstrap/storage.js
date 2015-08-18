'use strict';

class Storage {
  constructor() { }

  authen() {
    return $.ajax({ url: 'api/auth/user' });
  }

  login() {
    return $.ajax({ url: 'api/login' });
  }

  logout() {
    return $.ajax({ url: 'api/logout', type: 'post' });
  }

  getProducts() {
    return $.ajax({ url: 'api/products' });
  }

  getProduct(id) {
    return $.ajax({ url: 'api/products/' + id });
  }

  getCartTotalItems(cartId) {
    return $.ajax({ url: 'api/carts/total-items?cartId=' + cartId });
  }

  getCartId() {
    return $.ajax({ url: 'api/carts/cart-id' });
  }

  getCartDetails(cartId) {
    return $.ajax({ url: 'api/carts/detail?cartId=' + cartId });
  }

  addCartItem(item) {
    return $.ajax({
      url: 'api/carts/items?cartId=' + item.cartId,
      type: 'post',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(item)
    });
  }

  removeCartItem(itemId) {
    $.ajax({ url: '/api/carts/items/' + itemId, type: 'delete' });
  }

  previewOrder(cartId) {
    return $.ajax({ url: '/api/orders/preview-order?cartId=' + cartId });
  }

  placeOrder(shippingAddressId, billingAddressId) {
    return $.ajax({
      url: '/api/orders?shippingAddressId='+ shippingAddressId + '&billingAddressId=' + billingAddressId,
      type: 'put',
      contentType: 'application/json; charset=utf-8'
    });
  }

  getOrders() {
    return $.ajax({ url: 'api/orders' });
  }
}

export default new Storage();
