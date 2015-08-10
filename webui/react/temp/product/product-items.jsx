class ProductItems extends React.Component {
    constructor(props) {
        super(props);
        this.state = { product: { id: '', items: [], reviews: [], avgRating: 0 }, activeItem: { price: 0, quantity: 10 }, quantity: 1 };
    }

    render() {
        var product = this.state.product;

        return <div className="container-fluid">
            <ol className="breadcrumb">
                <li><a href="#home">Home</a></li>
                <li><a href="#products">Products</a></li>
                <li className="active">{product.name}</li>
            </ol>
            <div className="row">
                <div className="col-sm-6">
                    <div className="panel panel-default product-item text-center">
                        <div className="panel panel-body">
                            <ProductImage data={product} />
                        </div>
                        <div className="panel panel-footer">
                            <div className="btn-group" role="group">
                                {product.items.map((item, index) => {
                                    var type = item.id === this.state.activeItem.id ? 'primary' : 'default';
                                    return <button type="button" className={'btn btn-sm btn-' + type} key={index} onClick={this.setActiveItem.bind(this, item)}>
                                        {item.name}
                                    </button>;
                                }, this)}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="row">
                        <div className="col-sm-12"><h3>{product.name}</h3></div>
                        <div className="col-sm-12"><p>{product.description}</p></div>
                        <div className="col-sm-12"><h3>{MSTORE.String.toCurrency(this.state.activeItem.price)}</h3></div>
                        <div className="col-sm-12">
                            <input  type="hidden"
                                    id="avgRating"
                                    className="rating"
                                    data-filled="fa fa-star fa-3x"
                                    data-empty="fa fa-star-o fa-3x"
                                    data-readonly />
                            <span> ({product.reviews.length})</span>
                        </div>
                        <div className="col-sm-3">
                            <ProductQuantity 
                                quantityInStock={this.state.activeItem.quantity} 
                                quantity={this.state.quantity} 
                                onChange={this.setQuantity.bind(this)} />
                        </div>
                        <div className="col-sm-3">
                            <AddToCartButton quantity={this.state.activeItem.quantity} onClick={this.addToCart.bind(this)} />
                        </div>
                    </div>
                </div>
                <div className="col-sm-12">
                    <h2>
                        REVIEWS
                        <a  role="button" className="pull-right"
                            data-toggle="collapse" 
                            href="#collapseReview" aria-expanded="false" aria-controls="collapseExample">
                            Write a review &raquo;
                        </a>
                    </h2>
                    <div className="collapse" id="collapseReview">
                        <div className="well">
                            <form>
                                <div className="form-group">
                                    <label forHtml="rating">Overall Rating: </label>
                                    <input  type="hidden"
                                            id="rating"
                                            className="rating"
                                            data-filled="fa fa-star fa-1x"
                                            data-empty="fa fa-star-o fa-1x" />
                                </div>
                                <div className="form-group">
                                    <label forHtml="headline">Review Sumary: </label>
                                    <input type="text" className="form-control" id="headline" />
                                </div>
                                <div className="form-group">
                                    <label forHtml="content">My Review: </label>
                                    <textarea className="form-control" rows="3" id="content"></textarea>
                                </div>
                                <div className="checkbox">
                                    <label><input type="checkbox" id="recommended" /> Recommend this product</label>
                                </div>
                                <button type="button" className="btn btn-sm btn-primary" onClick={this.createReview.bind(this)}>Send</button>
                            </form>
                        </div>
                    </div>
                    {product.reviews.map(function(review, index) {
                        return <div key={index} className="well">
                            <h3>
                                <input  type="hidden"
                                    id={review.id}
                                    className="rating"
                                    data-filled="fa fa-star fa-1x"
                                    data-empty="fa fa-star-o fa-1x"
                                    data-readonly />
                                <strong>{review.headline}</strong>
                            </h3>
                            <p className="text-muted"><strong>{review.author}</strong></p>
                            <p>{review.content}</p>
                        </div>;
                    }, this)}
                </div>
            </div>
        </div>;
    }

    componentWillMount() {
        var productId = this.props.params[0];
        var itemId = '';
        if (this.props.params.length > 1) {
            itemId = this.props.params[1];
        }
        $.ajax({
            url: MSTORE.String.format(MSTORE.Resource.get('product'), productId),
            success: (data) => {
                this.setState({ product: data });
                if (itemId) {
                    $.each(data.items, (index, item) => {
                        if (itemId === item.id) {
                            this.setState({ activeItem: item });
                            return;
                        }
                    })
                } else {
                    this.setState({ activeItem: data.items[0] });
                }
                $('#rating').rating('rate', 0);
                $('#avgRating').rating('rate', data.avgRating);
                $.each(data.reviews, (index, review) => {
                    $('#' + review.id).rating('rate', review.rating);
                })
            }
        });
    }

    setActiveItem(item) {
        this.setState({ activeItem: item });
    }

    setQuantity(event) {
        this.setState({ quantity: event.target.value });
    }

    addToCart() {
        var cartItem = { 
            cartId: MSTORE.Cache.get('cartId'), 
            itemId: this.state.activeItem.id, 
            quantity: this.state.quantity 
        };
        $.ajax({
            url: MSTORE.String.format(MSTORE.Resource.get('add-cart-item'), MSTORE.Cache.get('cartId')),
            type: 'post',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(cartItem),
            success: (data) => {
                MSTORE.PubSub.publish('updateCart');
            }
        });
    }

    createReview() {
        var loginUser = MSTORE.Cache.get('loginUser') ? JSON.parse(MSTORE.Cache.get('loginUser')) : null;
        var review = {
            author: loginUser ? loginUser.username : 'Anonymous',
            productId: this.state.product.id,
            rating: $('#rating').val(),
            recommended: $('#recommended').is(':checked'),
            headline: $('#headline').val(),
            content: $('#content').val()
        }
        $.ajax({
            url: MSTORE.String.format(MSTORE.Resource.get('create-review'), this.state.product.id),
            type: 'put',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(review),
            success: (data) => {
                $('#collapseReview').collapse('hide');
                var product = this.state.product;
                product.reviews.unshift(data);
                this.setState({ product: product });
                $('#' + data.id).rating('rate', data.rating);
            }
        });
    }
}