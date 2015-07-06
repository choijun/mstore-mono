MSTORE.View.LoginUser = React.createClass({
	render: function() {
		if (!this.state.loginUser.username) {
			return <li>
                <a href="javascript:void(0)" onClick={this.login}>
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
                        <a href="javascript:void(0)" onClick={this.logout}>Logout</a>
                    </li>
                </ul>
            </li>;
		}
	},
	getInitialState: function() {
        return { loginUser: {} };
    },
    componentWillMount: function() {
        this.authen();
        MSTORE.PubSub.subscribe('login', this.login);
    },
    componentWillUnmount: function() {
        MSTORE.PubSub.unsubscribe('login', this.login);
    },
    authen: function() {
        $.ajax({
            url: MSTORE.Resource.get('authen')
        })
        .done(function(data) {
            if (data) {
                MSTORE.Cache.set('loginUser', JSON.stringify(data));
                this.setState({ loginUser: data });
            } else {
                MSTORE.Cache.remove('loginUser');
                this.setState({ loginUser: {} });
            }
        }.bind(this));
    },
    login: function(cb) {
        $.ajax({
            url: MSTORE.Resource.get('login')
        })
        .done(function (data) {
            this.authen();
            MSTORE.PubSub.publish('updateCart');
            if (cb && typeof cb === 'function') { cb(); }
        }.bind(this));
    },
    logout: function() {
        $.ajax({
            url: MSTORE.Resource.get('logout'),
            type: 'post'
        })
        .done(function (data) {
            this.authen();
            MSTORE.Cache.remove('cartId');
            MSTORE.PubSub.publish('updateCart');
            MSTORE.loadView(MSTORE.Route._default);
        }.bind(this));
    }
});