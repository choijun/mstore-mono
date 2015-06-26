KMS.loadViewFromHash = function() {
    var params = window.location.hash.substr(1).split('/'),
        route = params.length > 0 ? params.shift() : '',
        view;

    switch(route) {
        case 'products': view = params.length > 0 ? Product : Products; break;
        case 'cart': view = Cart; break;
        case 'orders': view = Orders; break;
        default: view = Home; break;
    }

    React.render(React.createElement(view, { params: params }), $('.main-container').get(0));
}
window.addEventListener('hashchange', KMS.loadViewFromHash);
React.render(React.createElement(Viewport), $('.ui-view').get(0));
KMS.loadViewFromHash();
