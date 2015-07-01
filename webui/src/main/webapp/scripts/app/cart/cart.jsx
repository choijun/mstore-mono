var Cart = React.createClass({
    render: function() {
        var result = <ContainerFluid>
            <h1>Your cart is empty, <Link path="#products" text="click here to start shopping" /></h1>
        </ContainerFluid>;
        if (this.state.cart.details.length > 0) {
            result = <ContainerFluid>
                <h1>Shipping Cart</h1>
                <Table cls="cart-table">
                    <thead>
                        <tr>
                            <th className="text-center">&nbsp;</th>
                            <th className="text-center">&nbsp;</th>
                            <th className="text-right">Price</th>
                            <th className="text-right">Quantity</th>
                            <th className="text-right">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.cart.details.map(function(item, index) {
                            return <tr key={index}>
                                <td className="text-center action text-danger">
                                    <Icon type="remove" onClick={this.removeItem.bind(this, item.itemId)} />
                                </td>
                                <td>{item.itemId}</td>
                                <td className="text-right price">{KMS.String.toCurrency(item.price)}</td>
                                <td className="text-right quantity">{item.quantity}</td>
                                <td className="text-right subtotal">{KMS.String.toCurrency(item.price * item.quantity)}</td>

                            </tr>;
                        }, this)}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th colSpan="5" className="text-right subtotal">{KMS.String.toCurrency(this.state.cart.subTotal)}</th>
                        </tr>
                    </tfoot>
                </Table>
                <Link icon="ok" cls="btn btn-sm btn-primary btn-action pull-right" text="Checkout" path="#checkout" />
            </ContainerFluid>;
        }
        return result;
    },
    getInitialState: function() {
        return { cart: { details: [] } };
    },
    componentDidMount: function() {
        if (KMS.Cache.get('cartId')) {
            $.get('/api/carts/detail?cartId=' + KMS.Cache.get('cartId'), function(data) {
                this.setState({ cart: data });
            }.bind(this));
        }
    },
    removeItem: function(itemId) {
        $.ajax({
            url: '/api/carts/' + KMS.Cache.get('cartId') + '/' + itemId,
            type: 'delete'
        }).done(function (data) {
            $.get('/api/carts/' + KMS.Cache.get('cartId'), function(data) {
                this.setState({ cart: data });
                KMS.PubSub.publish('updateCart');
            }.bind(this));
        }.bind(this));
    }
});
