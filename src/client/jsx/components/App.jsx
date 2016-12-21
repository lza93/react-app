import React, { Component } from 'react';
import NavbarContainer from '../containers/NavbarContainer';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    return this.props.loginActiveSession();
  }

  render() {
    return (
      <div id="app-root">
        <NavbarContainer router={this.props.router} />
        <div>
          { this.props.children ? this.props.children : null }
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.element.isRequired,
};


export default App;
