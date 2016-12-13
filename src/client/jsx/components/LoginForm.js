import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import axios from 'axios';

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    axios.post('/api/sessions', this.state)
    .then((user) => {
      // do something if user is successfully logged in
      console.log("logged in", user.data);
      this.props.router.push('/'); // redirect route
    })
    .catch((err) => {
      // do something if user is not successfully logged in
      console.log(err);
    });
  }

  handleChange(field, e) {
    console.dir(this.props);
    this.setState({
      [field]: e.target.value,
    });
  }

  render() {
    return (
      <div className="container">
        <div className="col-md-4 col-md-offset-4 col-sm-12">
          <h1>This is the login form </h1>
          <form onSubmit={(e) => { this.handleSubmit(e); }}>
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
            <button type="submit" className="btn btn-default">Login</button>
          </form>

        </div>
      </div>
    );
  }
}

export default LoginForm;
