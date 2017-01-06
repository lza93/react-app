import { expect } from 'chai';

import loadingReducer from '../../../../../src/client/jsx/redux/reducers/loadingReducer';
import initialState from '../../../../../src/client/jsx/redux/reducers/loadingInitialState';
import storeFake from '../../../../helpers/storeFake';
import * as actionTypes from '../../../../../src/client/jsx/utils/actionTypes';

describe('LoadingReducer', () => {
  let returnedState;
  let expectedState;

  it('expects initial state to match state', () => {
    expect(initialState).to.deep.equal(Object.assign({}, storeFake('loading'), { appLoading: true }));
  });

  it('returns initial state for unmatching action types', () => {
    returnedState = loadingReducer(undefined, {});
    expect(returnedState).to.equal(initialState);
  });

  it('handles actionType FINISHED_LOADING_USER', () => {
    returnedState = loadingReducer(initialState, { type: actionTypes.FINISHED_LOADING_USER });
    expectedState = Object.assign({}, initialState, { appLoading: false });
    expect(returnedState).to.not.equal(initialState);
    expect(returnedState).to.deep.equal(expectedState);
  });
});
