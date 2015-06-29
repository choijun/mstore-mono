var Home = React.createClass({
    render: function() {
        return <ContainerFluid>
            <Container cls="jumbotron api-frame">
                <Container cls="container">
                    <Container cls="embed-responsive embed-responsive-16by9">
                        <iframe className="embed-responsive-item" src="api.html">Loading...</iframe>
                    </Container>
                </Container>
            </Container>
        </ContainerFluid>;
    }
});