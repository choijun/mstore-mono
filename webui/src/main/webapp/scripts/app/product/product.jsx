var Product = React.createClass({
    render: function() {
        var prod = this.state.product;
        return <ContainerFluid>
            <Row>
                <Column colSpan="6">
                    <Panel cls="product-item text-center">
                        <PanelBody>
                            <img src={prod.id ? 'assets/products/' + prod.id + '.jpg' : ''} alt={prod.name} />
                        </PanelBody>
                        <PanelFooter>
                            <div className="btn-group" role="group">
                                {prod.items.map(function(item, index) {
                                    var type = item.id === this.state.selectedItem.id ? 'primary' : 'default';
                                    return <Button key={index} text={item.name} type={type} onClick={this.selectItem.bind(this, item)} />
                                }, this)}
                            </div>
                        </PanelFooter>
                    </Panel>
                </Column>
                <Column colSpan="6">
                    <Row>
                        <Column colSpan="12"><h2>{prod.name}</h2></Column>
                        <Column colSpan="12"><h4>{prod.description}</h4></Column>
                        <Column colSpan="12"><h2>{KMS.String.toCurrency(this.state.selectedItem.price)}</h2></Column>
                        <Column colSpan="3">
                            <input type="number" id="quantity" min="1" max={this.state.selectedItem.quantity} step="1" defaultValue="1" className="form-control text-right" />
                        </Column>
                        <Column colSpan="3">
                            <Button type="primary" icon="shopping-cart" text="Add to Cart" onClick={this.addToCart} />
                        </Column>
                    </Row>
                </Column>
                <Column colSpan="12">
                    <h2>REVIEWS</h2>
                    <p>
                        <input  type="hidden" 
                                id="ratingScore" 
                                className="rating"
                                data-filled="fa fa-star fa-3x" 
                                data-empty="fa fa-star-o fa-3x" 
                                data-readonly />
                    </p>
                    {prod.reviews.map(function(review, index) {
                        return <Container key={index} cls="well">
                            <h3><strong>{review.headline}</strong></h3>
                            <p className="text-muted"><strong>{review.author}</strong></p>
                            <p>{review.content}</p>
                            <p>Rating: <strong className="text-primary">{review.rating}</strong></p>
                        </Container>;
                    }, this)}
                </Column>
            </Row>
        </ContainerFluid>;
    },
    getInitialState: function() {
        return { product: { id: '', items: [], reviews: [], ratingScore: 0 }, selectedItem: { price: 0, quantity: 10 } };
    },
    componentDidMount: function() {
        var productId = this.props.params[0];
        $.get('/api/products/' + productId, function(data) {
            this.setState({ product: data });
            if (this.state.product.items.length > 0) {
                this.setState({ selectedItem: this.state.product.items[0] });
            }
            $('#ratingScore').rating('rate', this.state.product.ratingScore);
        }.bind(this));
    },
    selectItem: function(item) {
        this.setState({ selectedItem: item });
    },
    addToCart: function() {
        var itemId = this.state.selectedItem.id,
            quantity = $('#quantity').val();
        if (KMS.Cache.get('cartId')) {
            this.updateCart(KMS.Cache.get('cartId'), itemId, quantity);
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