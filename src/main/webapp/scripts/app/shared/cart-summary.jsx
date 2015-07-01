var CartSummary = React.createClass({
    render: function() {
        return <Link cls="my-cart" icon="shopping-cart" path="#cart">
            {this.state.quantity > 0 ? <span className="quantity">{this.state.quantity}</span> : ''}
        </Link>;
    },
    getInitialState: function() {
        return { quantity: 0 };
    },
    componentWillMount: function() {
        if (MSTORE.Cache.get('cartId')) {
            this.updateCart();
        }
        MSTORE.PubSub.subscribe('updateCart', this.updateCart);
    },
    componentWillUnmount: function() {
        MSTORE.PubSub.unsubscribe('updateCart', this.updateCart);
    },
    updateCart: function() {
        if (MSTORE.Cache.get('cartId')) {
            $.ajax({
                url: '/api/carts/total-items?cartId=' + MSTORE.Cache.get('cartId')
            }).done(function (data) {
                this.setState({ quantity: data });
            }.bind(this))
            .fail(function(response) {
                console.log(JSON.parse(response.responseText).message);
                MSTORE.Cache.remove('cartId');
            });
        } else {
            this.setState({ quantity: 0 });
        }
    }
});
