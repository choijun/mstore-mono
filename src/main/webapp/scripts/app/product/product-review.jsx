var ProductReview = React.createClass({
    render: function() {
        return <Container>
            {this.props.reviews.map(function(review, index) {
                return <Container key={index} cls="well">
                    <p>{review.rating}</p>
                    <p>{review.headline}</p>
                    <p>{review.author}</p>
                    <p>{review.reviewAt}</p>
                    <p>{review.content}</p>
                    <p>{review.recommend}</p>
                </Container>;
            }, this)}
        </Container>;
    }
});