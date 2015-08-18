'use strict';

import CartSummary from './cart-summary';
import LoginUser from './login-user';

export default class Header extends React.Component {
  render() {
    return <nav className="navbar navbar-default navbar-fixed-top" role="navigation">
      <div className="container-fluid">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-collapse">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span> <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a href="http://kms-technology.com" target="_blank">
            <img className="logo" src="assets/images/logo.png" />
          </a>
          <a className="navbar-brand" href="javascript:void(0)">
            <span>mStore</span> <span className="navbar-version">v1.0.0</span>
          </a>
        </div>
        <ul className="nav navbar-nav">
          <li>
            <a href="#products">
              <span className='glyphicon glyphicon-phone' aria-hidden="true"></span>
            </a>
          </li>
        </ul>
        <ul className="nav navbar-nav navbar-right">
          <CartSummary />
          <LoginUser />
        </ul>
      </div>
    </nav>;
  }
}
