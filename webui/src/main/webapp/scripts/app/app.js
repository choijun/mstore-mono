MSTORE.init({
    routes: {
        'home': Home,
        'products': Products,
        'products/{id}': ProductItems,
        'cart': Cart,
        'checkout': Checkout,
        'orders': Orders
    },
    defaultView: 'home',
    resources: {
        'cart-id': '/api/carts/carts/cart-id',
        'cart-summary': '/api/carts/carts/total-items?cartId={0}',
        'authen': '/api/auth/user',
        'login': '/login',
        'logout': '/logout',
        'products': '/api/catalog/products',
        'product': '/api/catalog/products/{0}',
        'add-cart-item': '/api/carts/carts/items?cartId={0}',
        'cart-details': '/api/carts/carts/detail?cartId={0}',
        'remove-cart-item': '/api/carts/carts/items/{0}',
        'preview-order': '/api/orders/orders/preview-order?cartId={0}',
        'place-order': '/api/orders/orders?shippingAddressId={0}&billingAddressId={1}',
        'orders': '/api/orders/orders',
        'create-review': '/api/reviews/reviews/{0}'
    },
    ready: function() {
        $.ajaxSetup({
            beforeSend: function(xhr, settings) {
                var method = settings.type.toLowerCase();
                if (method === 'post' || settings.type === 'put' || settings.type === 'delete') {
                    // Only send the token to relative URLs i.e. locally.
                    var xsrfToken = MSTORE.Cookie.get('XSRF-TOKEN');
                    if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
                        xhr.setRequestHeader("X-XSRF-TOKEN", xsrfToken);
                    }
                }
            },
            statusCode: {
                401: function() {
                    //window.location = "/login";
                }
            }
        });

        React.render(React.createElement(Viewport), $('.ui-view').get(0));
        MSTORE.loadViewFromHash();
    }
});