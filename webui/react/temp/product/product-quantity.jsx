class ProductQuantity extends React.Component {
    render() {
    	if (this.props.quantityInStock > 0) {
    		return <input   type="number" id="quantity" className="form-control text-right"
                    		min="1" max={this.props.quantityInStock} step="1" defaultValue={this.props.quantity} 
                    		onChange={this.props.onChange} />
    	} else {
    		return <input type="text" className="form-control text-right" value="0" disabled />;
    	}
    }
}