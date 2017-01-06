import axios from 'axios';
import { SET_USER, FINISHED_LOADING_USER } from '../../utils/actionTypes';
import initialState from '../reducers/userInitialState';

export function userAction(user) {
  return {
    type: SET_USER,
    user,
  };
}

export function finishedLoadingUser() {
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
      return dispatch(userAction(newUser));
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
    .then(() => dispatch(userAction(initialState)))
    .catch((err) => {
      console.log('THIS IS AN UNHANDLED ERROR', err.message);
      return {};
    });
}

export function loginActiveSession() {
  return dispatch => axios.get('/api/sessions/me')
    .then((user) => {
      if (!user.data) {
        dispatch(finishedLoadingUser());
        return dispatch(logoutUser());
      }
      const newUser = {
        ...initialState,
        ...user.data,
        loggedIn: true,
      };
      dispatch(userAction(newUser));
      return dispatch(finishedLoadingUser());
    });
}

