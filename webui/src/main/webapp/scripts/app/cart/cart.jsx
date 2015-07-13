class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = { cart: { details: [] } };
    }

    render() {
        let result = <CartEmpty />;

        if (this.state.cart.details.length > 0) {
            result = <div>
                <h1>Shopping Cart</h1>
                <CartList data={this.state.cart.details} subtotal={this.state.cart.subTotal} reloadCart={this.loadCart.bind(this)} />
                <a href="#checkout" className="btn btn-sm btn-primary btn-action pull-right">
                    <span className='glyphicon glyphicon-ok' aria-hidden="true"></span>
                    Checkout
                </a>
            </div>;
        }

        return <div className="container-fluid">
            <ol className="breadcrumb">
                <li><a href="#home">Home</a></li>
                <li className="active">Cart</li>
            </ol>
            {result}
        </div>;
    }

    componentWillMount() {
        this.loadCart();
    }

    loadCart() {
        $.ajax({
            url: MSTORE.String.format(MSTORE.Resource.get('cart-details'), MSTORE.Cache.get('cartId')),
            success: (data) => {
                this.setState({ cart: data });
            }
        });
    }
}