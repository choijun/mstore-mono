'use strict';

export default class ProductImage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <img src={this.props.data.id ? 'assets/products/' + this.props.data.id + '.jpg' : ''} alt={this.props.data.name} />;
  }
}
