var Checkout = React.createClass({
    render: function() {
        return <ContainerFluid>
            <Row>
                <Column colSpan="4">
                    <label className="text-primary">Shipping Address</label>
                    <address>
                        <strong>{this.state.order.shippingAddress.fullName}</strong><br />
                        {this.state.order.shippingAddress.address1}<br />
                        {this.state.order.shippingAddress.address2}<br />
                        {this.state.order.shippingAddress.city}, {this.state.order.shippingAddress.state} {this.state.order.shippingAddress.zip}<br />
                        {this.state.order.shippingAddress.country}<br />
                        <abbr title="Phone">P:</abbr> {this.state.order.shippingAddress.phoneNumber}<br /><br />
                        <Button text="Edit Shipping Address" />
                    </address>
                </Column>
                <Column colSpan="4">
                    <label className="text-primary">Billing Address</label>
                    <address>
                        <strong>{this.state.order.billingAddress.fullName}</strong><br />
                        {this.state.order.billingAddress.address1}<br />
                        {this.state.order.billingAddress.address2}<br />
                        {this.state.order.billingAddress.city}, {this.state.order.billingAddress.state} {this.state.order.billingAddress.zip}<br />
                        {this.state.order.billingAddress.country}<br />
                        <abbr title="Phone">P:</abbr> {this.state.order.billingAddress.phoneNumber}<br /><br />
                        <Button text="Edit Billing Address" />
                    </address>
                </Column>
                <Column colSpan="4">
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
                                    <td className="text-right">{KMS.String.toCurrency(item.unitPrice)}</td>
                                    <td className="text-right">{item.quantity}</td>
                                    <td className="text-right">{KMS.String.toCurrency(item.unitPrice * item.quantity)}</td>
                                </tr>;
                            }, this)}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th colSpan="3" className="text-right">Tax ({this.state.order.taxRate * 100}%)</th>
                                <td className="text-right">{KMS.String.toCurrency(this.state.order.subTotal * this.state.order.taxRate)}</td>
                            </tr>
                            <tr>
                                <th colSpan="3" className="text-right">Shipping</th>
                                <td className="text-right">{KMS.String.toCurrency(this.state.order.shippingFee)}</td>
                            </tr>
                            <tr>
                                <th colSpan="3" className="text-right">Total</th>
                                <td className="text-right">{KMS.String.toCurrency(this.state.order.subTotal * (1 + this.state.order.taxRate) + this.state.order.shippingFee)}</td>
                            </tr>
                        </tfoot>
                    </Table>
                    <Button type="primary" cls="pull-right" text="Order" icon="ok" />
                </Column>
            </Row>
        </ContainerFluid>;
    },
    getInitialState: function() {
        return { order: { shippingAddress: {}, billingAddress: {}, details: [] }, headers: ['Item', 'Price', 'Quantity', 'Sub Total'] };
    },
    componentWillMount: function() {
        $.get('/api/orders/preview-order', function(data) {console.log(data);
            this.setState({ order: data });
        }.bind(this));
    }
});