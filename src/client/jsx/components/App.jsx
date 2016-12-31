import React, { Component, PropTypes } from 'react';
import { routerShape } from 'react-router';
import NavbarContainer from '../containers/NavbarContainer';
import AppLoading from './AppLoading';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appLoading: props.appLoading,
    };
  }

  componentWillMount() {
    return this.props.loginActiveSession();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.appLoading !== nextProps.appLoading) {
      this.setState({ appLoading: nextProps.appLoading });
    }
  }

  render() {
    return this.state.appLoading ?
      <AppLoading /> :
      (
        <div id="app-root">
          <NavbarContainer router={this.props.router} />
          <div>
            { this.props.children ? this.props.children : null }
          </div>
        </div>
      );
  }
}

export default App;


App.propTypes = {
  appLoading: PropTypes.bool,
  children: React.PropTypes.element,
  loginActiveSession: PropTypes.func,
  router: routerShape,
};
