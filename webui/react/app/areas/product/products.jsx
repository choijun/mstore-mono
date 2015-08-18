'use strict';

import Storage from '../../bootstrap/storage';
import ProductImage from './product-image';

export default class Products extends React.Component {
  constructor() {
    super();
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
    Storage.getProducts().done(data => this.setState({ products: data }));
  }
}
