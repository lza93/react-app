import React from 'react';
import ErrorMessages from './ErrorMessages';
const SignupForm = props => (
  <div className="container">
    <div className="col-md-4 col-md-offset-4 col-sm-12">
      <h1>This is the signup form </h1>
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
          />
        </div>
        <button type="submit" className="btn btn-default">Signup</button>
      </form>

    </div>
  </div>
);

export default SignupForm;
