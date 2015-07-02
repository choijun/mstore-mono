var ProductItem = React.createClass({
    render: function() {
    	var prod = this.props.data;
        return <Panel cls="product-item text-center">
            <PanelBody>
                <Link path={'#products/' + prod.id}><img src={'assets/products/' + prod.id + '.jpg'} alt={prod.name} style={{width: '100%'}} /></Link>
            </PanelBody>
            <PanelFooter>
                <h4><Link path={'#products/' + prod.id} text={prod.name} /></h4>
                <h5>Rating: <strong className="text-primary">{prod.avgRating}</strong> from {prod.totalReviews} reviews</h5>
            </PanelFooter>
        </Panel>;
    }
});
