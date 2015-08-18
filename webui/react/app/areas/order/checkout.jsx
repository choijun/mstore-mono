'use strict';

import Storage from '../../bootstrap/storage';
import Utils from '../../bootstrap/utils';
import PubSub from '../../bootstrap/pubsub';
import Cache from '../../bootstrap/cache';
import Address from './address';

export default class Checkout extends React.Component {
  constructor() {
    super();
    this.state = { order: { shippingAddress: {}, billingAddress: {}, details: [] } };
  }

    render() {
      let result = <h1>Your cart is empty, <a href="#products">click here to start shopping</a></h1>;

      if (this.state.order.details.length > 0) {
        result = <div>
          <div className="row">
            <div className="col-sm-3">
              <label className="text-primary">Shipping Address</label>
              <Address data={this.state.order.shippingAddress} />
            </div>
            <div className="col-sm-3">
              <label className="text-primary">Billing Address</label>
              <Address data={this.state.order.billingAddress} />
            </div>
            <div className="col-sm-6">
              <table className="table table-striped table-hover cart-table">
                <thead>
                  <tr>
                    <th className="text-center">&nbsp;</th>
                    <th className="text-right">Price</th>
                    <th className="text-right">Quantity</th>
                    <th className="text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.order.details.map((item, index) => {
                    return <tr key={index}>
                      <td>{item.itemId}</td>
                      <td className="text-right">{Utils.toCurrency(item.unitPrice)}</td>
                      <td className="text-right">{item.quantity}</td>
                      <td className="text-right">{Utils.toCurrency(item.unitPrice * item.quantity)}</td>
                    </tr>;
                  }, this)}
                </tbody>
                <tfoot>
                  <tr>
                    <th colSpan="3" className="text-right">Sub-total</th>
                    <td className="text-right">{Utils.toCurrency(this.state.order.subTotal)}</td>
                  </tr>
                  <tr>
                    <th colSpan="3" className="text-right">Tax ({Math.round(this.state.order.taxRate * 100)}%)</th>
                    <td className="text-right">{Utils.toCurrency(this.state.order.taxFee)}</td>
                  </tr>
                  <tr>
                    <th colSpan="3" className="text-right">Shipping</th>
                    <td className="text-right">{Utils.toCurrency(this.state.order.shippingFee)}</td>
                  </tr>
                  <tr>
                    <th colSpan="3" className="text-right">Total</th>
                    <td className="text-right">{Utils.toCurrency(this.state.order.total)}</td>
                  </tr>
                </tfoot>
              </table>
              <button type="button" className="btn btn-sm btn-primary pull-right" onClick={this.placeOrder.bind(this)}>
                <span className='glyphicon glyphicon-ok' aria-hidden="true"></span>
                Order
              </button>
            </div>
          </div>
          <div className="modal fade" id="order-result-message" tabIndex="-1" role="dialog" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  <h4 className="modal-title">Place Order Success</h4>
                </div>
                <div className="modal-body">
                  Your order <span className="text-primary">{this.state.order.id}</span> has been processed. <br />
                  You can view your order history by going to the <a href="javascript:void(0)">My Orders</a>
                </div>
                <div className="modal-footer row">
                  <div className="col-sm-12">
                    <button type="button" className="btn btn-sm btn-default" data-dismiss="modal">OK</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>;
      }

      return <div className="container-fluid">
        <ol className="breadcrumb">
          <li><a href="#home">Home</a></li>
          <li><a href="#orders">Orders</a></li>
          <li className="active">Checkout</li>
        </ol>
        {result}
      </div>;
    }

    componentWillMount() {
        if (Cache.get('loginUser')) {
            this.previewOrder();
        } else {
            PubSub.publish('login', this.previewOrder);
        }
    }

    previewOrder() {
      Storage.previewOrder(Cache.get('cartId'))
      .done(data => this.setState({ order: data }))
      .error(() => {
        Cache.remove('cartId');
        PubSub.publish('updateCart');
      });
    }

    placeOrder() {
      Storage.placeOrder(this.state.order.shippingAddressId, this.state.order.billingAddressId)
      .done(data => {
        const order = this.state.order;
        order.id = data;
        this.setState({ order: order });
        $('#order-result-message').modal('show');
        $('#order-result-message').on('hidden.bs.modal', (e) => {
          window.location.hash = 'products';
        })
        Cache.remove('cartId');
        PubSub.publish('updateCart');
      });
    }
}
