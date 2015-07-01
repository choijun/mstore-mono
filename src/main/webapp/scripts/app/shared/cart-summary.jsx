var CartSummary = React.createClass({
    render: function() {
        return <Link cls="my-cart" icon="shopping-cart" path="#cart">
            {this.state.quantity > 0 ? <span className="quantity">{this.state.quantity}</span> : ''}
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
            $.ajax({
                url: '/api/carts/total-items?cartId=' + KMS.Cache.get('cartId')
            }).done(function (data) {
                this.setState({ quantity: data });
            }.bind(this))
            .fail(function(response) {
                console.log(JSON.parse(response.responseText).message);
                KMS.Cache.remove('cartId');
            });
        } else {
            this.setState({ quantity: 0, totalPrice: 0 });
        }
    }
});
