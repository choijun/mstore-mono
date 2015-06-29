var Products = React.createClass({
    render: function() {
        return <ContainerFluid>
            <Row>
                {this.state.products.map(function(prod, index) {
                    return <Column key={index} colSpan="3">
                        <Panel cls="product-item text-center">
                            <PanelBody>
                                <Link path={'#products/' + prod.id}><img src={'assets/products/' + prod.id + '.jpg'} alt={prod.name} /></Link>
                            </PanelBody>
                            <PanelFooter>
                                <h4><Link path={'#products/' + prod.id} text={prod.name} /></h4>
                                <h5>Rating: <strong className="text-primary">{prod.ratingScore}</strong> from {prod.totalReviews} reviews</h5>
                            </PanelFooter>
                        </Panel>
                    </Column>;
                }, this)}
            </Row>
        </ContainerFluid>;
    },
    getInitialState: function() {
        return { products: [] };
    },
    componentDidMount: function() {
        $.get('/api/products', function(data) {
            this.setState({ products: data });
        }.bind(this));
    }
});