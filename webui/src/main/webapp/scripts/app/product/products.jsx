var Products = React.createClass({
    render: function() {
        return <ContainerFluid>
            <Breadcrumb list={ [{text: 'Home', path: '#home'}, {text: 'Products'}] } />
            <Row>
                {this.state.products.map(function(prod, index) {
                    return <Column key={index} colSpan="3">
                        <ProductItem data={prod} />
                    </Column>;
                }, this)}
            </Row>
        </ContainerFluid>;
    },
    getInitialState: function() {
        return { products: [] };
    },
    componentDidMount: function() {
        $.get('/api/catalog/products', function(data) {
            this.setState({ products: data });
        }.bind(this));
    }
});
