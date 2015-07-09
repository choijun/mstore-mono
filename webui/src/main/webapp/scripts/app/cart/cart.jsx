class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = { cart: { details: [] } };
    }

    render() {
        var result = <h1>Your cart is empty, <a href="#products">click here to start shopping</a></h1>;

        if (this.state.cart.details.length > 0) {
            result = <div>
                <h1>Shipping Cart</h1>
                <table className="table table-striped table-hover cart-table">
                    <thead>
                        <tr>
                            <th className="text-center">&nbsp;</th>
                            <th className="text-center">&nbsp;</th>
                            <th className="text-right">Price</th>
                            <th className="text-right">Quantity</th>
                            <th className="text-right">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.cart.details.map(function(item, index) {
                            return <tr key={index}>
                                <td className="text-center action text-danger">
                                    <span className='glyphicon glyphicon-remove' aria-hidden="true" onClick={this.removeItem.bind(this, item.itemId)}></span>
                                </td>
                                <td>{item.itemId}</td>
                                <td className="text-right price">{MSTORE.String.toCurrency(item.price)}</td>
                                <td className="text-right quantity">{item.quantity}</td>
                                <td className="text-right subtotal">{MSTORE.String.toCurrency(item.price * item.quantity)}</td>

                            </tr>;
                        }, this)}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th colSpan="5" className="text-right subtotal">{MSTORE.String.toCurrency(this.state.cart.subTotal)}</th>
                        </tr>
                    </tfoot>
                </table>
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

    removeItem(itemId) {
        $.ajax({
            url: MSTORE.String.format(MSTORE.Resource.get('remove-cart-item'), itemId),
            type: 'delete',
            success: (data) => {
                this.loadCart();
                MSTORE.PubSub.publish('updateCart');
            }
        });
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