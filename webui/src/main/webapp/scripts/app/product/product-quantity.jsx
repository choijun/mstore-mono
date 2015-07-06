MSTORE.View.ProductQuantity = React.createClass({
    render: function() {
        return this.props.quantity > 0
        ? <input    type="number" id="quantity" className="form-control text-right"
                    min="1" max={this.props.quantityInStock} step="1" defaultValue={this.props.quantity} onChange={this.props.onChange} />
        : <input type="text" className="form-control" value="0" disabled />;
    }
});