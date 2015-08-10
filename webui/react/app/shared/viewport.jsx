import Header from './header'
import Footer from './footer';

export default class Viewport extends React.Component {
  render() {
    return <div>
      <Header />
      <div className="main-container" />
      <Footer />
    </div>;
  }
}
