'use strict';

import Header from './header'
import Footer from './footer';

const RouteHandler = ReactRouter.RouteHandler;

export default class Viewport extends React.Component {
  render() {
    return <div>
      <Header />
      <div className="main-container">
        <RouteHandler/>
      </div>
      <Footer />
    </div>;
  }
}
