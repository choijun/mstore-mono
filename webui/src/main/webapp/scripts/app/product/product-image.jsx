MSTORE.View.ProductImage = React.createClass({
    render: function() {
        return <img src={this.props.data.id ? 'assets/products/' + this.props.data.id + '.jpg' : ''} alt={this.props.data.name} style={{width: '100%'}} />;
    }
});