var Header = React.createClass({
    render: function() {
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
                    <li className="dropdown">
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><Icon type="user" /></a>
                        <ul className="dropdown-menu">
                            <li><Link text="My Addresses" /></li>
                            <li><Link text="My Orders" /></li>
                            <li role="separator" className="divider"></li>
                            <li><Link text="Logout" /></li>
                        </ul>
                    </li>
                </ul>
            </ContainerFluid>
        </nav>;
    }
});
