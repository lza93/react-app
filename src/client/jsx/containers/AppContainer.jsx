import { connect } from 'react-redux';

import React, { Component, PropTypes } from 'react';
import { routerShape } from 'react-router';
import ConnectedNavbarContainer from '../containers/NavbarContainer';
import AppLoading from '../components/AppLoading';
import { loginActiveSession } from '../redux/actionCreators/userAuth';

export class AppContainer extends Component {
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
          <ConnectedNavbarContainer router={this.props.router} />
          <div>
            { this.props.children ? this.props.children : null }
          </div>
        </div>
      );
  }
}

AppContainer.propTypes = {
  appLoading: PropTypes.bool,
  children: React.PropTypes.oneOfType([
    PropTypes.arrayOf(React.PropTypes.node),
    PropTypes.node,
  ]),
  loginActiveSession: PropTypes.func,
  router: routerShape,
};

const mapStateToProps = (state, ownProps) => ({
  appLoading: state.loading.appLoading,
  ...ownProps,
});

const mapDispatchToProps = dispatch => ({
  loginActiveSession() {
    dispatch(loginActiveSession());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
