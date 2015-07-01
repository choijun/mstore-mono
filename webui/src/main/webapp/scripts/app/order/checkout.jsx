var Checkout = React.createClass({
    render: function() {
        var result = <ContainerFluid>
            <Breadcrumb list={ [{text: 'Home', path: '#home'}, {text: 'Checkout'}] } />
            <h1>Your cart is empty, <Link path="#products" text="click here to start shopping" /></h1>
        </ContainerFluid>;

        if (this.state.order.details.length > 0) {
            result = <ContainerFluid>
                <Breadcrumb list={ [{text: 'Home', path: '#home'}, {text: 'Checkout'}] } />
                <Row>
                    <Column colSpan="3">
                        <label className="text-primary">Shipping Address</label>
                        <Address data={this.state.order.shippingAddress} />
                    </Column>
                    <Column colSpan="3">
                        <label className="text-primary">Billing Address</label>
                        <Address data={this.state.order.billingAddress} />
                    </Column>
                    <Column colSpan="6">
                        <Table cls="cart-table">
                            <thead>
                                <tr>
                                    <th className="text-center">&nbsp;</th>
                                    <th className="text-right">Price</th>
                                    <th className="text-right">Quantity</th>
                                    <th className="text-right">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.order.details.map(function(item, index) {
                                    return <tr key={index}>
                                        <td>{item.itemId}</td>
                                        <td className="text-right">{MSTORE.String.toCurrency(item.unitPrice)}</td>
                                        <td className="text-right">{item.quantity}</td>
                                        <td className="text-right">{MSTORE.String.toCurrency(item.unitPrice * item.quantity)}</td>
                                    </tr>;
                                }, this)}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th colSpan="3" className="text-right">Sub-total</th>
                                    <td className="text-right">{MSTORE.String.toCurrency(this.state.order.subTotal)}</td>
                                </tr>
                                <tr>
                                    <th colSpan="3" className="text-right">Tax ({Math.round(this.state.order.taxRate * 100)}%)</th>
                                    <td className="text-right">{MSTORE.String.toCurrency(this.state.order.taxFee)}</td>
                                </tr>
                                <tr>
                                    <th colSpan="3" className="text-right">Shipping</th>
                                    <td className="text-right">{MSTORE.String.toCurrency(this.state.order.shippingFee)}</td>
                                </tr>
                                <tr>
                                    <th colSpan="3" className="text-right">Total</th>
                                    <td className="text-right">{MSTORE.String.toCurrency(this.state.order.total)}</td>
                                </tr>
                            </tfoot>
                        </Table>
                        <Button type="primary" cls="pull-right" text="Order" icon="ok" onClick={this.placeOrder} />
                    </Column>
                </Row>
                <DialogPopup id="order-result-message">
                    <PopupHeader title="Place Order Success" />
                    <div className="modal-body">
                        Your order <span className="text-primary">{this.state.order.id}</span> has been processed. <br />
                        You can view your order history by going to the <Link text="My Orders" path="#order" />
                    </div>
                    <div className="modal-footer row">
                        <Column colSpan="12">
                            <button type="button" className="btn btn-sm btn-default" data-dismiss="modal">OK</button>
                        </Column>
                    </div>
                </DialogPopup>
            </ContainerFluid>;
        }

        return result;
    },
    getInitialState: function() {
        return { order: { shippingAddress: {}, billingAddress: {}, details: [] }, headers: ['Item', 'Price', 'Quantity', 'Sub Total'] };
    },
    componentWillMount: function() {
        $.ajax({
            url: '/api/orders/orders/preview-order'
        }).done(function (data) {
            this.setState({ order: data });
        }.bind(this))
        .fail(function(response) {
            console.log(JSON.parse(response.responseText).message);
        });
    },
    placeOrder: function() {
        $.ajax({
            url: MSTORE.String.format('/api/orders/orders?shippingAddressId={0}&billingAddressId={1}', this.state.order.shippingAddressId, this.state.order.billingAddressId),
            type: 'put',
            contentType: "application/json; charset=utf-8",
        }).done(function (data) {
            var order = this.state.order;
            order.id = data;
            this.setState({ order: order });
            $('#order-result-message').modal('show');
            $('#order-result-message').on('hidden.bs.modal', function (e) {
                MSTORE.loadView('products');
            })
            MSTORE.Cache.remove('cartId');
            MSTORE.PubSub.publish('updateCart');
        }.bind(this));
    }
});
