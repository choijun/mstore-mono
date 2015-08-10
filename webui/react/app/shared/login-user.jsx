export default class LoginUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loginUser: {} };
  }

  render() {
      // if (!this.state.loginUser.username) {
          return <li>
              <a href="javascript:void(0)" onClick={this.login.bind(this)}>
                  <span className='glyphicon glyphicon-log-in' aria-hidden="true"></span>
              </a>
          </li>;
      // } else {
      //     return <li className="dropdown">
      //         <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
      //             <span className='glyphicon glyphicon-user' aria-hidden="true"></span>
      //         </a>
      //         <ul className="dropdown-menu">
      //             <li>
      //                 <a href="#orders">My Orders</a>
      //             </li>
      //             <li role="separator" className="divider"></li>
      //             <li>
      //                 <a href="javascript:void(0)" onClick={this.logout.bind(this)}>Logout</a>
      //             </li>
      //         </ul>
      //     </li>;
      // }
  }

  // componentWillMount() {
  //     this.authen();
  //     MSTORE.PubSub.subscribe('login', this.login.bind(this));
  // }
  //
  // componentWillUnmount() {
  //     MSTORE.PubSub.unsubscribe('login', this.login);
  // }
  //
  // authen() {
  //     $.ajax({
  //         url: MSTORE.Resource.get('authen'),
  //         success: (data) => {
  //             if (data) {
  //                 MSTORE.Cache.set('loginUser', JSON.stringify(data));
  //                 this.setState({ loginUser: data });
  //             } else {
  //                 MSTORE.Cache.remove('loginUser');
  //                 this.setState({ loginUser: {} });
  //             }
  //         }
  //     });
  // }
  //
  login(cb) {
  //     $.ajax({
  //         url: MSTORE.Resource.get('login'),
  //         success: (data) => {
  //             this.authen();
  //             MSTORE.PubSub.publish('updateCart');
  //             if (cb && typeof cb === 'function') { cb(); }
  //         }
  //     });
  }
  //
  // logout() {
  //     $.ajax({
  //         url: MSTORE.Resource.get('logout'),
  //         type: 'post',
  //         complete: (data) => {
  //             MSTORE.Cache.remove('loginUser');
  //             this.setState({ loginUser: {} });
  //             MSTORE.Cache.remove('cartId');
  //             MSTORE.PubSub.publish('updateCart');
  //             MSTORE.loadView(MSTORE.Route._default);
  //         }
  //     });
  // }
}
