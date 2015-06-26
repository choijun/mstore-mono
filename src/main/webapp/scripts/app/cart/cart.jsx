var Cart = React.createClass({
    render: function() {
        var result = <ContainerFluid>
            <h1>Your cart is empty, <Link path="#products" text="click here to start shopping" /></h1>
        </ContainerFluid>;
        if (this.state.cart.details.length > 0) {
            result = <ContainerFluid>
                <h1>Owner: {this.state.cart.owner}</h1>
                <Table headers={this.state.headers} cls="cart-table">
                    {this.state.cart.details.map(function(item, index) {
                        return <tr key={index}>
                            <td className="text-right index">{index}</td>
                            <td>{item.itemId}</td>
                            <td className="text-right price">{KMS.String.toCurrency(item.price)}</td>
                            <td className="text-right quantity">{item.quantity}</td>
                            <td className="text-right subtotal">{KMS.String.toCurrency(item.price * item.quantity)}</td>
                            <td className="text-right action">
                                <Button icon="remove" cls="btn-danger btn-action" text="Remove" onClick={this.removeItem.bind(this, item.itemId)} />
                            </td>
                        </tr>;
                    }, this)}
                    <tfoot>
                        <tr>
                            <th colSpan="5" className="text-right subtotal">{KMS.String.toCurrency(this.state.cart.totalPrice)}</th>
                            <th className="text-right action">
                                <Link icon="ok" cls="btn btn-sm btn-primary btn-action" text="Checkout" onClick={this.checkoutCart} />
                                <Button icon="remove" cls="btn-danger btn-action" text="Clear" onClick={this.removeCart} />
                            </th>
                        </tr>
                    </tfoot>
                </Table>
                <DialogPopup id="confirmAccountPopup" cls="clearfix">
                    <PopupHeader title="Confirm Account" />
                    <div className="modal-body row">
                        <Column colSpan="3"><strong>Owner:</strong></Column>
                        <Column colSpan="9">{this.state.account.id}</Column>
                        <Column colSpan="3"><strong>Email</strong></Column>
                        <Column colSpan="9">{this.state.account.email}</Column>
                        <Column colSpan="3"><strong>First Name</strong></Column>
                        <Column colSpan="3">{this.state.account.firstName}</Column>
                        <Column colSpan="3"><strong>Last Name</strong></Column>
                        <Column colSpan="3">{this.state.account.lastName}</Column>
                        <Column colSpan="3"><strong>Shipping Add. ID</strong></Column>
                        <Column colSpan="9"><input type="text" className="form-control" id="shippingAddressId" value={this.state.account.addressId} /></Column>
                        <Column colSpan="3"><strong>Billing Add. ID</strong></Column>
                        <Column colSpan="9"><input type="text" className="form-control" id="billingAddressId" value={this.state.account.addressId} /></Column>
                    </div>
                    <div className="modal-footer row">
                        <Column colSpan="6"><Button type="info" text="Close" onClick={this.closeConfirmPopup} /></Column>
                        <Column colSpan="6"><Button text="Order" onClick={this.orderCart} /></Column>
                    </div>
                </DialogPopup>
            </ContainerFluid>;
        }
        return result;
    },
    getInitialState: function() {
        return { cart: { details: [] }, headers: ["Item", "Price", "Quantity", "Sub Total", "Action"], account: { } };
    },
    componentDidMount: function() {
        if (KMS.Cache.get('cartId')) {
            $.get('/api/carts/' + KMS.Cache.get('cartId'), function(data) {
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
    },
    removeCart: function() {
        $.ajax({
            url: '/api/carts/' + KMS.Cache.get('cartId'),
            type: 'delete'
        }).done(function (data) {
            KMS.Cache.remove('cartId');
            this.setState({ cart: { details: [] } });
            KMS.PubSub.publish('updateCart');
        }.bind(this));
    },
    checkoutCart: function() {
        $.get('/api/login-user/', function(data) {
            this.setState({ account: data });
            $('#confirmAccountPopup').modal('show');
        }.bind(this));
    },
    closeConfirmPopup: function() {
        $('#confirmAccountPopup').modal('hide');
    },
    orderCart: function() {
        $('#confirmAccountPopup').modal('hide');
        $.ajax({
            url: '/api/orders?shippingAddressId=' + $('#shippingAddressId').val() + '&billingAddressId=' + $('#billingAddressId').val(),
            type: 'put'
        }).done(function (data) {
            KMS.loadView('orders');
        }.bind(this))
        .fail(function(response) {
            console.log(JSON.parse(response.responseText).message);
            KMS.loadView('orders');
        });
    }
});