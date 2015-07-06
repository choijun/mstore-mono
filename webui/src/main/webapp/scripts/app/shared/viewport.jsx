MSTORE.Viewport = React.createClass({
    render: function() {
        return <div>
            <MSTORE.View.Header />
            <div className="main-container" />
            <MSTORE.View.Footer />
        </div>;
    }
});
