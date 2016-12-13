import React, { Component } from 'react';
import axios from 'axios';

class SignupForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    axios.post('/api/users', this.state)
    .then((user) => {
      // do something if user is successfully created
      console.log("created", user.data);
      this.props.router.push('/'); // redirect route
    })
    .catch((err) => {
      // do something if user is not successfully created
      console.log(err);
    });
  }

  handleChange(field, e) {
    this.setState({
      [field]: e.target.value,
    });
  }

  render() {
    return (
      <div className="container">
        <div className="col-md-4 col-md-offset-4 col-sm-12">
          <h1>This is the signup form </h1>
          <form onSubmit={(e) => { this.handleSubmit(e); }}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Username"
                value={this.state.username}
                onChange={(e) => { this.handleChange('username', e); }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Email"
                value={this.state.email}
                onChange={(e) => { this.handleChange('email', e); }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                value={this.state.password}
                onChange={(e) => { this.handleChange('password', e); }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password-confirmation">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="password-confirmation"
                placeholder="Confirm Password"
                value={this.state.passwordConfirmation}
                onChange={(e) => { this.handleChange('passwordConfirmation', e); }}
              />
            </div>
            <button type="submit" className="btn btn-default">Signup</button>
          </form>

        </div>
      </div>
    );
  }
}

export default SignupForm;
