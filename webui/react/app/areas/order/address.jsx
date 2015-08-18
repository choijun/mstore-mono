export default class Address extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <address>
      <strong>{this.props.data.fullName}</strong><br />
      {this.props.data.address1}<br />
      {this.props.data.address2}<br />
      {this.props.data.city}, {this.props.data.state} {this.props.data.zip}<br />
      {this.props.data.country}<br />
      <abbr title="Phone">P:</abbr> {this.props.data.phoneNumber}<br /><br />
      <button type="button" className="btn btn-sm btn-default">Edit Address</button>
    </address>;
  }
}
