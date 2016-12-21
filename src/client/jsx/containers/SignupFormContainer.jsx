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
      canSubmit: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.displayEmailError = this.displayEmailError.bind(this);
    this.displayUsernameError = this.displayUsernameError.bind(this);
    this.displayPasswordError = this.displayPasswordError.bind(this);
    this.displayPasswordConfirmationError = this.displayPasswordConfirmationError.bind(this);
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

  displayUsernameError() {
    const isValidUsername = this.validateUsername();
    if (!isValidUsername) {
      errorConstants.addError(this, errorConstants.USERNAME_SYNTAX);
    } else {
      errorConstants.removeError(this, errorConstants.USERNAME_SYNTAX);
    }
  }

  displayPasswordError() {
    const isValidPassword = this.validatePassword();
    if (!isValidPassword) {
      errorConstants.addError(this, errorConstants.PASSWORD_SYNTAX);
    } else {
      errorConstants.removeError(this, errorConstants.PASSWORD_SYNTAX);
    }
  }

  displayPasswordConfirmationError() {
    const isValidPasswordConfirmation = this.validatePasswordConfirmation();
    if (!isValidPasswordConfirmation) {
      errorConstants.addError(this, errorConstants.PASSWORD_CONFIRMATION_ERROR);
    } else {
      errorConstants.removeError(this, errorConstants.PASSWORD_CONFIRMATION_ERROR);
    }
  }

  enableSubmit() {
    const enableCondition =
      this.validateEmail() &&
      this.validateUsername() &&
      this.validatePassword() &&
      this.validatePasswordConfirmation();
    if (enableCondition) {
      this.setState({ canSubmit: true });
    } else {
      this.setState({ canSubmit: false });
    }
  }

  validateUsername() {
    // simple username regex for only alphanumeric character
    const USERNAME_REGEX = /^[a-zA-Z0-9]{6,20}$/;
    return USERNAME_REGEX.test(this.state.username);
  }

  validatePassword() {
    const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    return PASSWORD_REGEX.test(this.state.password);
  }

  validatePasswordConfirmation() {
    return this.state.password === this.state.passwordConfirmation;
  }

  validateEmail() {
    // simple HTML5 regex to catch simple errors
    const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return EMAIL_REGEX.test(this.state.email);
  }

  render() {
    return (
      <SignupForm
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        displayEmailError={this.displayEmailError}
        displayUsernameError={this.displayUsernameError}
        displayPasswordError={this.displayPasswordError}
        displayPasswordConfirmationError={this.displayPasswordConfirmationError}
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
