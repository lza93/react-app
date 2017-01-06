import { expect } from 'chai';

import userReducer from '../../../../../src/client/jsx/redux/reducers/userReducer';
import initialState from '../../../../../src/client/jsx/redux/reducers/userInitialState';
import storeFake from '../../../../helpers/storeFake';
import generateObject from '../../../../helpers/generateObject';
import * as actionTypes from '../../../../../src/client/jsx/utils/actionTypes';

describe('UserReducer', () => {
  let returnedState;
  let expectedState;

  it('expects initial state to match state', () => {
    expect(initialState).to.deep.equal(Object.assign({}, storeFake('user')));
  });

  it('returns initial state for unmatching action types', () => {
    returnedState = userReducer(undefined, {});
    expect(returnedState).to.equal(initialState);
  });

  it('handles actionType SET_USER', () => {
    const user = generateObject('setUser');
    returnedState = userReducer(initialState, {
      type: actionTypes.SET_USER,
      user,
    });
    expectedState = user;
    expect(returnedState).to.not.equal(initialState);
    expect(returnedState).to.equal(expectedState);
  });
});
