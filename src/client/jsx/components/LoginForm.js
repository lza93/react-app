import React from 'react';

const LoginForm = props => (
  <div className="container">
    <div className="col-md-4 col-md-offset-4 col-sm-12">
      <h1>This is the login form </h1>
      <form onSubmit={(e) => { props.handleSubmit(e); }}>
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
        <button type="submit" className="btn btn-default">Login</button>
      </form>
    </div>
  </div>
);

export default LoginForm;
