/* global document */
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';

import style from '../assets/stylesheets/main.scss'; // eslint-disable-line
import store from './redux/store';

import ConnectedAppContainer from './containers/AppContainer';
import About from './components/About';
import Home from './components/Home';
import ConnectedLoginFormContainer from './containers/LoginFormContainer';
import ConnectedSignupFormContainer from './containers/SignupFormContainer';

const rootRouter = (
  <Provider store={store}>
    <Router history={browserHistory} >
      <Route path="/" component={ConnectedAppContainer}>
        <IndexRoute component={Home} />
        <Route path="/about" component={About} />
        <Route path="/signup" component={ConnectedSignupFormContainer} />
        <Route path="/login" component={ConnectedLoginFormContainer} />
      </Route>
    </Router>
  </Provider>
);

render(rootRouter, document.getElementById('app'));
