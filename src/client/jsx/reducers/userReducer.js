import { SET_USER } from '../actionConstants';
import initialState from './userInitialState';

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return action.user;
    default:
      return state;
  }
}
