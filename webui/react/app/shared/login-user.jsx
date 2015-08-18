'use strict';

import PubSub from '../bootstrap/pubsub';
import Cache from '../bootstrap/cache';
import Storage from '../bootstrap/storage';

export default class LoginUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loginUser: {} };
  }

  render() {
      if (!this.state.loginUser.username) {
        return <li>
          <a href="javascript:void(0)" onClick={this.login.bind(this)}>
            <span className='glyphicon glyphicon-log-in' aria-hidden="true"></span>
          </a>
        </li>;
      } else {
        return <li className="dropdown">
          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
            <span className='glyphicon glyphicon-user' aria-hidden="true"></span>
          </a>
          <ul className="dropdown-menu">
            <li>
              <a href="#orders">My Orders</a>
            </li>
            <li role="separator" className="divider"></li>
            <li>
              <a href="javascript:void(0)" onClick={this.logout.bind(this)}>Logout</a>
            </li>
          </ul>
        </li>;
      }
  }

  componentWillMount() {
      this.authen();
      PubSub.subscribe('login', this.login.bind(this));
  }

  componentWillUnmount() {
      PubSub.unsubscribe('login', this.login);
  }

  authen() {
    Storage.authen().done(data => {
      if (data) {
        Cache.set('loginUser', JSON.stringify(data));
        this.setState({ loginUser: data });
      } else {
        Cache.remove('loginUser');
        this.setState({ loginUser: {} });
      }
    });
  }

  login(cb) {
    Storage.login().done(data => {
      this.authen();
      PubSub.publish('updateCart');
      if (cb && typeof cb === 'function') { cb(); }
    })
  }

  logout() {
    Storage.logout().done(() => {
      Cache.remove('loginUser');
      this.setState({ loginUser: {} });
      Cache.remove('cartId');
      PubSub.publish('updateCart');
      window.location.hash = 'home';
    });
  }
}
