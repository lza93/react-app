/* global document */
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import style from '../assets/stylesheets/main.scss'; // eslint-disable-line

import App from './components/App';
import About from './components/About';
import Home from './components/Home';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';

const rootRouter = (
  <Router history={browserHistory} >
    <Route path="/" component={App} >
      <IndexRoute component={Home} />
      <Route path="/about" component={About} />
      <Route path="/signup" component={SignupForm} />
      <Route path="/login" component={LoginForm} />
    </Route>
  </Router>
);

render(rootRouter, document.getElementById('app'));
