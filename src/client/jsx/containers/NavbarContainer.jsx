import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { routerShape } from 'react-router';
import Navbar from '../components/Navbar';
import { logoutUser } from '../redux/actionCreators/userAuth';
import { userShape } from '../redux/reducers/userInitialState';

export class NavbarContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: props.user.loggedIn,
    };
    this.logout = this.logout.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.loggedIn !== nextProps.user.loggedIn) {
      this.setState({ loggedIn: nextProps.user.loggedIn });
    }
  }

  logout(e) {
    e.preventDefault();
    return this.props.logoutUser()
      .then(() => {
        this.props.router.push('/');
        return;
      })
      .catch((err) => {
        if (process.env.NODE_ENV !== 'test') { console.log('unhandled error logging out', err); }
      });
  }

  render() {
    return (
      <Navbar
        logout={this.logout}
        loggedIn={this.state.loggedIn || false}
      />
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  logoutUser() {
    return dispatch(logoutUser());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NavbarContainer);

NavbarContainer.propTypes = {
  logoutUser: PropTypes.func,
  router: routerShape,
  user: PropTypes.shape(userShape),
};
