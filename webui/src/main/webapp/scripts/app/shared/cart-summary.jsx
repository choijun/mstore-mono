MSTORE.View.CartSummary = React.createClass({
    render: function() {
        return <li>
            <a href="#cart" className="my-cart" icon="shopping-cart">
                <span className='glyphicon glyphicon-shopping-cart' aria-hidden="true"></span>
                <span className="quantity">{this.state.quantity > 0 ? this.state.quantity : ''}</span>
            </a>
        </li>;
    },
    getInitialState: function() {
        return { quantity: 0 };
    },
    componentWillMount: function() {
        MSTORE.PubSub.subscribe('updateCart', this.updateCartSummary);
        this.updateCartSummary();
    },
    componentWillUnmount: function() {
        MSTORE.PubSub.unsubscribe('updateCart', this.updateCartSummary);
    },
    updateCartSummary: function() {
        if (MSTORE.Cache.get('cartId')) {
            $.ajax({
                url: MSTORE.String.format(MSTORE.Resource.get('cart-summary'), MSTORE.Cache.get('cartId'))
            })
            .done(function (data) {
                this.setState({ quantity: data });
            }.bind(this))
            .fail(function(response) {
                console.log(JSON.parse(response.responseText).message);
                this.createNewCart();
            }.bind(this));
        } else {
            this.createNewCart();
        }
    },
    createNewCart: function() {
        this.generateCartId();
        this.setState({ quantity: 0 });
    },
    generateCartId: function() {
        $.ajax({
            url: MSTORE.Resource.get('cart-id')
        })
        .done(function(data) {
            MSTORE.Cache.set('cartId', data);
        })
    }
});
