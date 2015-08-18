'use strict';

import Viewport from './shared/viewport';
import Home from './areas/home/home';
import Products from './areas/product/products';
import Product from './areas/product/product';
import Cart from './areas/cart/cart';
import Checkout from './areas/order/checkout';
import Orders from './areas/order/orders';

const Route = ReactRouter.Route;
const DefaultRoute = ReactRouter.DefaultRoute;

const routes = <Route name="app" path="/" handler={Viewport}>
<Route name="home" path="home" handler={Home} />
  <Route name="products" path="products" handler={Products} />
  <Route name="product" path="products/:id" handler={Product} />
  <Route name="cart" path="cart" handler={Cart} />
  <Route name="checkout" path="checkout" handler={Checkout} />
  <Route name="orders" path="orders" handler={Orders} />
  <DefaultRoute handler={Home} />
</Route>;

ReactRouter.run(routes, function (Handler) {
  React.render(<Handler/>, $('.ui-view').get(0));
});
