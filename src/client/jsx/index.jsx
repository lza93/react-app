/* global document */
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import style from '../assets/stylesheets/main.scss'; // eslint-disable-line

import store from './store';

import App from './components/App';
import About from './components/About';
import Home from './components/Home';
import SignupFormContainer from './containers/SignupFormContainer';
import LoginFormContainer from './containers/LoginFormContainer';

const rootRouter = (
  <Provider store={store}>
    <Router history={browserHistory} >
      <Route path="/" component={App} >
        <IndexRoute component={Home} />
        <Route path="/about" component={About} />
        <Route path="/signup" component={SignupFormContainer} />
        <Route path="/login" component={LoginFormContainer} />
      </Route>
    </Router>
  </Provider>
);

render(rootRouter, document.getElementById('app'));
