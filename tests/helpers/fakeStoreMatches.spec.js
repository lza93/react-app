import { expect } from 'chai';

import realInitialState from '../../src/client/jsx/redux/initialState';
import storeFake from './storeFake';

describe('initialState', () => {
  it('equals storeFake', () => {
    // for tetsing purposes loading.appLoading is set to false,
    // so reset in test below to match initial state
    expect(realInitialState).to.deep.equal(storeFake(null, { loading: { appLoading: true } }));
  });
});
