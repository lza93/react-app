import { SET_USER } from '../../utils/actionTypes';
import initialState from './userInitialState';

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return action.user;
    default:
      return state;
  }
}
