var Header = React.createClass({
    render: function() {
        return <Container cls="navbar navbar-default navbar-fixed-top">
            <ContainerFluid>
                <Container cls="navbar-header">
                    <Link cls="navbar-brand" text="KMS" path="#" />
                </Container>
                <ul className="nav navbar-nav navbar-right">
                    <li><Link icon="phone" path="#products" /></li>
                    <li><CartSummary /></li>
                </ul>
            </ContainerFluid>
        </Container>;
    }
});