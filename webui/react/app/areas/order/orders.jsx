'use strict';

import Utils from '../../bootstrap/utils';
import Storage from '../../bootstrap/storage';

export default class Orders extends React.Component {
    constructor() {
      super();
      this.state = { orders: [] };
    }

    render() {
      return <div className="container-fluid">
        <ol className="breadcrumb">
          <li><a href="#home">Home</a></li>
          <li className="active">Orders</li>
        </ol>
        <h1>My Orders</h1>
          <table className="table table-striped table-hover cart-table">
            <thead>
              <tr>
                <th className="text-center">Order Date</th>
                <th className="text-right">Sub-total</th>
                <th className="text-right">Tax</th>
                <th className="text-right">Shipping</th>
                <th className="text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {this.state.orders.map((order, index) => {
                return <tr key={index}>
                  <td className="text-center">{(new Date(order.orderDate)).toLocaleDateString('en-US')}</td>
                  <td className="text-right">{Utils.toCurrency(order.subTotal)}</td>
                  <td className="text-right">{Utils.toCurrency(order.taxFee)} ({Math.round(order.taxRate * 100)}%)</td>
                  <td className="text-right">{Utils.toCurrency(order.shippingFee)}</td>
                  <td className="text-right">{Utils.toCurrency(order.total)}</td>
                </tr>;
              }, this)}
            </tbody>
          </table>
      </div>;
    }

    componentWillMount() {
      Storage.getOrders().done(data => this.setState({ orders: data }));
    }
}
