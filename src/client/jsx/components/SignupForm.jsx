import React, { PropTypes } from 'react';
import ErrorMessages, { errorsShape } from './ErrorMessages';

const SignupForm = props => (
  <div className="container">
    <div className="col-md-4 col-md-offset-4 col-sm-12">
      <h1 className="text-center">Signup</h1>
      <ErrorMessages
        errors={props.errors}
      />
      <form onSubmit={(e) => { props.handleSubmit(e); }}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Username"
            value={props.username}
            onChange={(e) => { props.handleChange('username', e); }}
            onBlur={() => props.displayUsernameError()}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Email"
            value={props.email}
            onChange={(e) => { props.handleChange('email', e); }}
            onBlur={() => props.displayEmailError()}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            value={props.password}
            onChange={(e) => { props.handleChange('password', e); }}
            onBlur={() => props.displayPasswordError()}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password-confirmation">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="password-confirmation"
            placeholder="Confirm Password"
            value={props.passwordConfirmation}
            onChange={(e) => { props.handleChange('passwordConfirmation', e); }}
            onBlur={() => props.displayPasswordConfirmationError()}
          />
        </div>
        <button
          type="submit"
          disabled={!props.canSubmit}
          className="btn btn-primary
          btn-lg"
        >
          Signup
        </button>
      </form>

    </div>
  </div>
);

export default SignupForm;

SignupForm.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.shape(errorsShape)),
  username: PropTypes.string,
  email: PropTypes.string,
  password: PropTypes.string,
  passwordConfirmation: PropTypes.string,
  displayPasswordConfirmationError: PropTypes.func,
  canSubmit: PropTypes.bool,
};
