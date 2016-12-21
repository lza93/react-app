import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginForm from '../components/LoginForm';
import { loginUser } from '../actionCreators/userAuth';
import errorConstants from '../errorConstants';

class LoginFormContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errors: [],
      canSubmit: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.displayEmailError = this.displayEmailError.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.loginUser(this.state)
      .then(() => {
        this.props.router.push('/');
      })
      .catch(() => {
        errorConstants.addError(this, errorConstants.LOGIN_ERROR);
      });
  }

  handleChange(field, e) {
    this.setState(
      {
        [field]: e.target.value,
      }, this.enableSubmit);
  }

  displayEmailError() {
    const isValidEmail = this.validateEmail();
    if (!isValidEmail) {
      errorConstants.addError(this, errorConstants.EMAIL_SYNTAX);
    } else {
      errorConstants.removeError(this, errorConstants.EMAIL_SYNTAX);
    }
  }

  enableSubmit() {
    if (this.validateEmail() && this.state.password.length >= 6) {
      this.setState({ canSubmit: true });
    } else {
      this.setState({ canSubmit: false });
    }
  }

  validateEmail() {
    // simple HTML5 regex to catch simple errors
    const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return EMAIL_REGEX.test(this.state.email);
  }

  render() {
    return (
      <LoginForm
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        displayEmailError={this.displayEmailError}
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
    loginUser(userData) {
      return dispatch(loginUser(userData));
    },
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(LoginFormContainer);
