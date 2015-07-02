MSTORE.init({
    routes: {
        'home': Home,
        'products': Products,
        'products/{id}': Product,
        'cart': Cart,
        'checkout': Checkout,
        'orders': Orders
    },
    defaultView: 'home',
    ready: function() {
        React.render(React.createElement(Viewport), $('.ui-view').get(0));
        MSTORE.loadViewFromHash();
    }
});

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
            window.location = "/login";
        }
    }
});
