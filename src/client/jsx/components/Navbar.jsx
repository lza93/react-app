import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const renderSignupLink = () => (
  <li>
    <Link to="/signup">Signup</Link>
  </li>
);

const renderLoginLink = () => (
  <li>
    <Link to="/login">Login</Link>
  </li>
);

const renderLogoutButton = logout => (
  <form className="navbar-form navbar-left">
    <button className="btn btn-default" onClick={(e) => { logout(e); }}>
      logout
    </button>
  </form>
);

const Navbar = ({ logout, loggedIn }) => (
  <nav id="main-navbar" className="navbar navbar-default">
    <div className="container-fluid">
      <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul className="nav navbar-nav navbar-right">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          { loggedIn ? null : renderSignupLink() }
          { loggedIn ? null : renderLoginLink() }
          { loggedIn ? renderLogoutButton(logout) : null }
        </ul>
      </div>
    </div>
  </nav>
);


export default Navbar;

Navbar.propTypes = {
  logout: PropTypes.func,
  loggedIn: PropTypes.bool,
};
