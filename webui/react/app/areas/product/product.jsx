'use strict';

import Storage from '../../bootstrap/storage';
import ProductImage from './product-image';
import Utils from '../../bootstrap/utils';
import ProductQuantity from './product-quantity';
import AddToCartButton from './add-to-cart-button';
import PubSub from '../../bootstrap/pubsub';
import Cache from '../../bootstrap/cache';

class Product extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      id: context.router.getCurrentParams().id,
      product: { id: '', items: [], reviews: [], avgRating: 0 },
      activeItem: { price: 0, quantity: 10 },
      quantity: 1
    };
  }

  render() {
    const product = this.state.product;

    return <div className="container-fluid">
      <ol className="breadcrumb">
        <li><a href="#home">Home</a></li>
        <li><a href="#products">Products</a></li>
        <li className="active">{product.name}</li>
      </ol>
      <div className="row">
        <div className="col-sm-6">
          <div className="panel panel-default product-item text-center">
            <div className="panel panel-body">
                <ProductImage data={product} />
            </div>
            <div className="panel panel-footer">
                <div className="btn-group" role="group">
                  {product.items.map((item, index) => {
                    const type = item.id === this.state.activeItem.id ? 'primary' : 'default';
                    return <button type="button" className={'btn btn-sm btn-' + type} key={index} onClick={this.setActiveItem.bind(this, item)}>
                        {item.name}
                    </button>;
                  }, this)}
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="row">
              <div className="col-sm-12"><h3>{product.name}</h3></div>
              <div className="col-sm-12"><p>{product.description}</p></div>
              <div className="col-sm-12"><h3>{Utils.toCurrency(this.state.activeItem.price)}</h3></div>
              <div className="col-sm-12">
                <div className="col-sm-3">
                    <ProductQuantity quantityInStock={this.state.activeItem.quantity} quantity={this.state.quantity} onChange={this.setQuantity.bind(this)} />
                </div>
                <div className="col-sm-3">
                  <AddToCartButton quantity={this.state.activeItem.quantity} onClick={this.addToCart.bind(this)} />
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>;
  }

  componentWillMount() {
    Storage.getProduct(this.state.id).done(data => {
      this.setState({ product: data });
      this.setState({ activeItem: data.items[0] });
    });
  }

  setActiveItem(item) {
    this.setState({ activeItem: item });
  }

  setQuantity(event) {
    this.setState({ quantity: event.target.value });
  }

  addToCart() {
    const cartItem = {
      cartId: Cache.get('cartId'),
      itemId: this.state.activeItem.id,
      quantity: this.state.quantity
    };
    Storage.addCartItem(cartItem).done(() => PubSub.publish('updateCart'));
  }
}

Product.contextTypes = { router: React.PropTypes.func.isRequired };

export default Product;
