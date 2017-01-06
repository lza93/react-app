import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { routerShape } from 'react-router';
import LoginForm from '../components/LoginForm';
import { loginUser } from '../redux/actionCreators/userAuth';
import errorConstants, { addError, removeError } from '../constants/errorConstants';

export class LoginFormContainer extends Component {
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
    return this.props.loginUser(this.state)
      .then(() => this.props.router.push('/'))
      .catch(() => addError(this, errorConstants.LOGIN_ERROR));
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
      addError(this, errorConstants.EMAIL_SYNTAX);
    } else {
      removeError(this, errorConstants.EMAIL_SYNTAX);
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

export const mapStateToProps = state => ({
  user: state.user,
});

export const mapDispatchToProps = dispatch => ({
  loginUser(userData) {
    return dispatch(loginUser(userData));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginFormContainer);

LoginFormContainer.propTypes = {
  loginUser: PropTypes.func,
  router: routerShape,
};
