import React, { Component } from 'react';

class SignupForm extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <div className="container">
        <div className="col-md-4" />
        <div className="col-md-4">
          <h1>This is the signup form </h1>
          <form>
            <label htmlFor="username">Username</label>
            <input name="username" />
            <label htmlFor="email">Email</label>
            <input name="email" />
            <label htmlFor="password">Password</label>
            <input name="password" />
            <label htmlFor="password-confirmation">Confirm Password</label>
            <input name="password-confirmation" />
          </form>
        </div>
      </div>
    );
  }
}

export default SignupForm;
