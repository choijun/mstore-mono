class AddToCartButton extends React.Component {
    render() {
        var disabled = !(this.props.quantity > 0),
            type = disabled ? 'danger' : 'primary';

        return <button 
            type="button" 
            className={'btn btn-sm btn-' + type} 
            disabled={disabled}
            onClick={this.props.onClick}>
                {disabled ? '' : <span className='glyphicon glyphicon-shopping-cart' aria-hidden="true"></span>}
                {disabled ? 'Sold out' : 'Add to Cart'}
        </button>;
    }
}