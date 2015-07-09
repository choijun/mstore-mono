class Products extends React.Component {
    constructor(props) {
        super(props);
        this.state = { products: [] };
    }

    render() {
        return <div className="container-fluid">
            <ol className="breadcrumb">
                <li><a href="#home">Home</a></li>
                <li className="active">Products</li>
            </ol>
            <div className="row">
                {this.state.products.map((product, index) => {
                    return <div className="col-sm-3" key={index}>
                        <div className="panel panel-default product-item text-center">
                            <div className="panel panel-body">
                                <a href={'#products/' + product.id}>
                                    <ProductImage data={product} />
                                </a>
                                <div className="product-item-rating">
                                    <input  type="hidden"
                                            id={product.id + '-rating'}
                                            className="rating"
                                            data-filled="fa fa-star fa-2x"
                                            data-empty="fa fa-star-o fa-2x"
                                            data-readonly />
                                </div>
                            </div>
                            <div className="panel panel-footer">
                                <h4>
                                    <a href={'#products/' + product.id}>{product.name}</a>
                                </h4>
                            </div>
                        </div>
                    </div>;
                }, this)}
            </div>
        </div>;
    }

    componentDidMount() {
        $.ajax({
            url: MSTORE.Resource.get('products'),
            success: (data) => {
                this.setState({ products: data });
                $.each(data, (index, product) => {
                    $('#' + product.id + '-rating').rating('rate', product.avgRating);
                })
            }
        });
    }
}
