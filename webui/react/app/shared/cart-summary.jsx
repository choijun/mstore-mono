'use strict';

import PubSub from '../bootstrap/pubsub';
import Cache from '../bootstrap/cache';
import Storage from '../bootstrap/storage';

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

  componentWillMount() {
    PubSub.subscribe('updateCart', this.updateCartSummary.bind(this));
    this.updateCartSummary();
  }

  componentWillUnmount() {
    PubSub.unsubscribe('updateCart', this.updateCartSummary);
  }

  updateCartSummary() {
    if (Cache.get('cartId')) {
      Storage.getCartTotalItems(Cache.get('cartId'))
      .done(data => this.setState({ quantity: data }))
      .error((xhr, status, err) => this.createNewCart());
    } else {
      this.createNewCart();
    }
  }

  createNewCart() {
    this.generateCartId();
    this.setState({ quantity: 0 });
  }

  generateCartId() {
    Storage.getCartId().done(data => Cache.set('cartId', data));
  }
}
