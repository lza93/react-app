import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from '../components/Navbar';
import { logoutUser } from '../actionCreators/userAuth';

class NavbarContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: props.user.loggedIn,
    };
    this.logout = this.logout.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log("THIS IS nextProps", nextProps)
    if (this.state.loggedIn !== nextProps.user.loggedIn) {
      this.setState({ loggedIn: nextProps.user.loggedIn });
    }
  }

  logout(e) {
    e.preventDefault();
    this.props.logoutUser()
      .then(() => {
        this.props.router.push('/');
        return;
      })
      .catch((err) => {
        console.log('unhandled error logging out', err);
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

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser() {
      return dispatch(logoutUser());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavbarContainer);
