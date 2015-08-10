export default class CartSummary extends React.Component {
  constructor(props) {
      super(props);
      this.state = { quantity: 0 };
  }

  render() {
    return <li>
      <a href="#cart" className="my-cart" icon="shopping-cart">
        <span className='glyphicon glyphicon-shopping-cart' aria-hidden="true"></span>
        <span className="quantity">{this.state.quantity > 0 ? this.state.quantity : ''}</span>
      </a>
    </li>;
  }

  // componentWillMount() {
  //     MSTORE.PubSub.subscribe('updateCart', this.updateCartSummary.bind(this));
  //     this.updateCartSummary();
  // }
  //
  // componentWillUnmount() {
  //     MSTORE.PubSub.unsubscribe('updateCart', this.updateCartSummary);
  // }
  //
  // updateCartSummary() {
  //     if (MSTORE.Cache.get('cartId')) {
  //         $.ajax({
  //             url: MSTORE.String.format(MSTORE.Resource.get('cart-summary'), MSTORE.Cache.get('cartId')),
  //             success: (data) => {
  //                 this.setState({ quantity: data });
  //             },
  //             error: (xhr, status, err) => {
  //                 console.error(this.props.url, status, err.toString());
  //                 this.createNewCart();
  //             }
  //         });
  //     } else {
  //         this.createNewCart();
  //     }
  // }
  //
  // createNewCart() {
  //     this.generateCartId();
  //     this.setState({ quantity: 0 });
  // }
  //
  // generateCartId() {
  //     $.ajax({
  //         url: MSTORE.Resource.get('cart-id'),
  //         success: (data) => {
  //             MSTORE.Cache.set('cartId', data);
  //         }
  //     });
  // }
}
