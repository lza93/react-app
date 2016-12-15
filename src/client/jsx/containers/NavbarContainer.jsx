import React, { Component } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

class NavbarContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userStatus: {
        loggedIn: false,
        userRoles: [],
      },
    };
    this.logout = this.logout.bind(this);
  }

  logout() {
    axios.delete('/api/sessions')
      .then((res) => {
        console.log('res', res, '\nres.data', res.data);
      })
  }

  render() {
    return (
      <Navbar logout={this.logout} {...this.state} />
    );
  }
}

export default NavbarContainer;
