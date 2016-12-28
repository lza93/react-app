import axios from 'axios';
import { SET_USER, FINISHED_LOADING_USER } from '../actionConstants';
import initialState from '../reducers/userInitialState';

function userAction(user) {
  return {
    type: SET_USER,
    user,
  };
}

function finshedLoadingUser() {
  return {
    type: FINISHED_LOADING_USER,
  };
}

export function signupUser(userData) {
  return dispatch => axios.post('/api/users', userData)
    .then((user) => {
      const newUser = {
        ...initialState,
        ...user.data,
        loggedIn: true,
      };
      dispatch(userAction(newUser));
      return newUser;
    });
}

export function loginUser(userData) {
  return dispatch => axios.post('/api/sessions', userData)
    .then((user) => {
      const newUser = {
        ...initialState,
        ...user.data,
        loggedIn: true,
      };
      dispatch(userAction(newUser));
      return newUser;
    });
}

export function logoutUser() {
  return dispatch => axios.delete('/api/sessions')
    .then(() => {
      dispatch(userAction(initialState));
      return {};
    })
    .catch((err) => {
      console.log('THIS IS AN UNHANDLED ERROR', err);
      return {};
    });
}

export function loginActiveSession() {
  return dispatch => axios.get('/api/sessions/me')
    .then((user) => {
      if (!user.data) {
        dispatch(finshedLoadingUser());
        return logoutUser();
      }
      const newUser = {
        ...initialState,
        ...user.data,
        loggedIn: true,
      };
      dispatch(userAction(newUser));
      return dispatch(finshedLoadingUser());
    });
}

