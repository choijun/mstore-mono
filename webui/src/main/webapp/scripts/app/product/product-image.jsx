class ProductImage extends React.Component {
    render() {
        return <img src={this.props.data.id ? 'assets/products/' + this.props.data.id + '.jpg' : ''} alt={this.props.data.name} style={{width: '100%'}} />;
    }
}