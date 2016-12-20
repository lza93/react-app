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
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
