import React, { Component } from 'react';
import axios from 'axios';
import LoginForm from '../components/LoginForm';

class LoginFormContainer extends Component {
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
    this.setState(
      {
        [field]: e.target.value,
      });
  }

  render() {
    return (
      <LoginForm 
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        {...this.state}
      />
    );
  }
}

export default LoginFormContainer;
