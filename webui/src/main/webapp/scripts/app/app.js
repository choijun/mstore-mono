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
})
