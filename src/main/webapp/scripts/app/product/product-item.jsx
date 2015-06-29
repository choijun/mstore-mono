var ProductItem = React.createClass({
    render: function() {
        return <Row>
            {this.state.items.map(function(item, index) {
                var quantity = <Row>
                    <Column colSpan="12"><Link cls="btn btn-danger btn-sm disabled" text="SOLD OUT" /></Column>
                </Row>;
                if (item.quantity > 0) {
                    quantity = <Row>
                        <Column colSpan="6">
                            <input type="number" id="quantity" min="1" max={item.quantity} step="1" defaultValue="1" className="form-control" />
                        </Column>
                        <Column colSpan="6">
                            <Button type="primary" text="ADD TO CART" onClick={this.addToCart.bind(this, item.id)} />
                        </Column>
                    </Row>;
                }
                return <Column key={index} colSpan="3">
                    <Panel cls="product-item text-center">
                        <PanelBody>
                            <img src={'assets/products/' + item.productId + '.jpg'} alt={item.name} />
                        </PanelBody>
                        <PanelFooter>
                            <h4>{item.name}</h4>
                            <h4>{'$' + (item.price / 100)}</h4>
                            {quantity}
                        </PanelFooter>
                    </Panel>
                </Column>;
            }, this)}
        </Row>;
    },
    getInitialState: function() {
        return { items: [] };
    },
    componentWillReceiveProps: function(nextProps) {
        this.setState({ items: nextProps.items });
    },
    addToCart: function(itemId) {
        if (KMS.Cache.get('cartId')) {
            this.updateCart(KMS.Cache.get('cartId'), itemId, $('#quantity').val());
        } else {
            $.get('/api/carts/cart-id', function(data) {
                KMS.Cache.set('cartId', data);
                this.updateCart(data, itemId, quantity);
            }.bind(this));
        }
        
    },
    updateCart: function(cartId, itemId, quantity) {
        $.ajax({
            url: '/api/carts/' + cartId,
            type: 'post',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ cartId: cartId, itemId: itemId, quantity: quantity })
        }).done(function (data) {
            KMS.PubSub.publish('updateCart');
        });
    }
});