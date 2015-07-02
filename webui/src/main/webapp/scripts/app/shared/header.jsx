var Header = React.createClass({
    render: function() {
        var MyAccount = <li>
            <Link icon="log-in" onClick={this.login} />
        </li>
        if (this.state.loginUser.username) {
            MyAccount = <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><Icon type="user" /></a>
                <ul className="dropdown-menu">
                    <li><Link text="My Addresses" /></li>
                    <li><Link text="My Orders" /></li>
                    <li role="separator" className="divider"></li>
                    <li><Link text="Logout" onClick={this.logout} /></li>
                </ul>
            </li>;
        }

        return <nav className="navbar navbar-default navbar-fixed-top" role="navigation">
            <ContainerFluid>
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-collapse">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span> <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <a href="http://kms-technology.com" target="_blank">
                        <img className="logo" src="assets/images/logo.png" />
                    </a>
                    <a className="navbar-brand" href="#/">
                        <span>mStore</span> <span className="navbar-version">v1.0.0</span>
                    </a>
                </div>
                <ul className="nav navbar-nav navbar-right">
                    <li><Link icon="phone" path="#products" /></li>
                    <li><CartSummary /></li>
                    {MyAccount}
                </ul>
            </ContainerFluid>
        </nav>;
    },
    getInitialState: function() {
        return { loginUser: {} };
    },
    componentWillMount: function() {
        this.authen();
    },
    authen: function() {
        $.ajax({
            url: '/api/auth/user'
        }).done(function(data) {
            if (data) {
                MSTORE.Cache.set('loginUser', JSON.stringify(data));
                this.setState({ loginUser: data });
            } else {
                MSTORE.Cache.remove('loginUser');
                this.setState({ loginUser: {} });
            }
            
        }.bind(this));
    },
    login: function() {
        $.ajax({
            url: '/login'
        }).done(function (data) {
            this.authen();
        }.bind(this));
    },
    logout: function() {
        $.ajax({
            url: '/logout',
            type: 'post'
        }).done(function (data) {
            this.authen();
        }.bind(this));
    }
});
