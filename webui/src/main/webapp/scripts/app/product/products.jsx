MSTORE.View.Products = React.createClass({
    render: function() {
        return <div className="container-fluid">
            <ol className="breadcrumb">
                <li><a href="#home">Home</a></li>
                <li className="active">Products</li>
            </ol>
            <div className="row">
                {this.state.products.map(function(product, index) {
                    return <div className="col-sm-3" key={index}>
                        <div className="panel panel-default product-item text-center">
                            <div className="panel panel-body">
                                <a href={'#products/' + product.id}>
                                    <MSTORE.View.ProductImage data={product} />
                                </a>
                            </div>
                            <div className="panel panel-footer">
                                <h4>
                                    <a href={'#products/' + product.id}>{product.name}</a>
                                </h4>
                                <h5>
                                    <input  type="hidden"
                                    id={product.id + '-rating'}
                                    className="rating"
                                    data-filled="fa fa-star fa-1x"
                                    data-empty="fa fa-star-o fa-1x"
                                    data-readonly /> ({product.totalReviews} review{product.totalReviews > 1 ? 's' : ''})
                                </h5>
                            </div>
                        </div>
                    </div>;
                }, this)}
            </div>
        </div>;
    },
    getInitialState: function() {
        return { products: [] };
    },
    componentDidMount: function() {
        $.ajax({
            url: MSTORE.Resource.get('products')
        })
        .done(function(data) {
            this.setState({ products: data });
            $.each(data, function(index, product) {
                $('#' + product.id + '-rating').rating('rate', product.avgRating);
            })
        }.bind(this));
    }
});
