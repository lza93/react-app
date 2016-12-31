import loadingInitialState from './loadingInitialState';
import { FINISHED_LOADING_USER } from '../../constants/actionConstants';

export default function (state = loadingInitialState, action) {
  switch (action.type) {
    case FINISHED_LOADING_USER:
      return {
        ...state,
        appLoading: false,
      };
    default:
      return state;
  }
}
