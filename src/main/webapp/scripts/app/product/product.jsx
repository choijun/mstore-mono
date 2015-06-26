var Product = React.createClass({
    render: function() {
        var prod = this.state.product;
        return <ContainerFluid>
            <h1>{prod.name}</h1>
            <h4>{prod.description}</h4>
            <ProductItem items={prod.items} />
            <h3>REVIEWS</h3>
            <p><strong className="text-primary">{prod.ratingScore}</strong> from {prod.totalReviews + ' review' + (prod > 1 ? 's' : '')}</p>
            <ProductReview reviews={prod.reviews} />
        </ContainerFluid>;
    },
    getInitialState: function() {
        return { product: { items: [], reviews: [] } };
    },
    componentDidMount: function() {
        var productId = this.props.params[0];
        $.get('/api/products/' + productId, function(data) {
            this.setState({ product: data });
        }.bind(this));
    }
});