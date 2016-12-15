import React, { Component } from 'react';
import axios from 'axios';
import SignupForm from '../components/SignupForm';

class SignupFormContainer extends Component {
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
      <SignupForm
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        {...this.state}
      />
    );
  }

}

export default SignupFormContainer;
