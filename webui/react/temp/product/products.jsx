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
                    return <Product key={index} data={product} />;
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
