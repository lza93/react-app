import React from 'react';
import { Link } from 'react-router';

const Navbar = (props) => (
  <nav id="main-navbar" className="clearfix">
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/about">About</Link></li>
      <li><Link to="/signup">Signup</Link></li>
      <li><Link to="/login">Login</Link></li>
      <li><button onClick={() => { props.logout(); }}>signout</button></li>
    </ul>
  </nav>
);

export default Navbar;
