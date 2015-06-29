var CartSummary = React.createClass({
    render: function() {
        return <Link cls="my-cart" icon="shopping-cart" path="#cart">
            {this.state.quantity > 0 ? <span className="badge quantity">{this.state.quantity}</span> : ''}
            {this.state.totalPrice > 0 ? <span className="total-price">{'$' + (this.state.totalPrice / 100)}</span> : ''}
        </Link>;
    },
    getInitialState: function() {
        return { quantity: 0, totalPrice: 0 };
    },
    componentWillMount: function() {
        if (KMS.Cache.get('cartId')) {
            this.updateCart();
        }
        KMS.PubSub.subscribe('updateCart', this.updateCart);
    },
    componentWillUnmount: function() {
        KMS.PubSub.unsubscribe('updateCart', this.updateCart);
    },
    updateCart: function() {
        if (KMS.Cache.get('cartId')) {
            $.get('/api/carts/' + KMS.Cache.get('cartId'), function(data) {
                var quantity = 0;
                $.each(data.details, function(index, item) {
                    quantity += item.quantity;
                });
                this.setState({ quantity: quantity, totalPrice: data.totalPrice });
            }.bind(this));
        } else {
            this.setState({ quantity: 0, totalPrice: 0 });
        }
    }
});