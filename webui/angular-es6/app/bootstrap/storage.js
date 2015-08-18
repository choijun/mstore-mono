'use strict';

export default class Storage {
  /* @ngInject */
  constructor($resource) {
    return {
      Products: $resource('api/products/:id', {}, {
        query: { method: 'GET', isArray: true },
        get: { method: 'GET' }
      }),
      Carts: $resource('', {}, {
        query: {
          method: 'GET',
          url: 'api/carts/detail?cartId=:cartId',
          params: {
            cartId: '@cartId'
          }
        },
        getCartId: {
          method: 'GET',
          url: 'api/carts/cart-id',
          transformResponse: response => ({ cartId: response })
        },
        getTotalItems: {
          method: 'GET',
          url: 'api/carts/total-items?cartId=:cartId',
          params: {
            cartId: '@cartId'
          },
          transformResponse: response => ({ totalItems: response })
        },
        post: {
          method: 'POST',
          url: 'api/carts/items?cartId=:cartId',
          params: {
            cartId: '@cartId',
            itemId: '@itemId',
            quantity: '@quantity'
          }
        }
      }),
      Orders: $resource('', {}, {
        query: {
          method: 'GET',
          url: 'api/orders',
          isArray: true
        },
        get: {
          method: 'GET',
          url: 'api/orders/preview-order?cartId=:cartId',
          params: {
            cartId: '@cartId'
          }
        },
        put: {
          method: 'PUT',
          url: 'api/orders?shippingAddressId=:shippingAddressId&billingAddressId=:billingAddressId',
          params: {
            shippingAddressId: '@shippingAddressId',
            billingAddressId: '@billingAddressId'
          },
          transformResponse: response => ({ orderId: response })
        }
      }),
      Accounts: $resource('', {}, {
        authen: {
          method: 'GET',
          url: 'api/auth/user',
          transformResponse: response => ({ loginUser: response })
        },
        login: {
          method: 'GET',
          url: 'api/login'
        },
        logout: {
          method: 'POST',
          url: 'api/logout'
        }
      })
    };
  }
}
