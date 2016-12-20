import React, { Component } from 'react';
import { connect } from 'react-redux';
import SignupForm from '../components/SignupForm';
import { signupUser } from '../actionCreators/userAuth';
import errorConstants from '../errorConstants';

class SignupFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      errors: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.signupUser(this.state)
      .then(() => {
        this.props.router.push('/');
      })
      .catch(() => {
        errorConstants.addError(this, errorConstants.SIGNUP_ERROR);
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

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signupUser(userData) {
      return dispatch(signupUser(userData));
    },
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(SignupFormContainer);
