import { expect } from 'chai';
import * as userAuth from '../../../../../src/client/jsx/redux/actionCreators/userAuth';
import * as actionTypes from '../../../../../src/client/jsx/constants/actionTypes';

describe('userAuth Actions', () => {
  describe('userAction', () => {
    it('creates an action to set the user', () => {
      const user = {
        id: 1,
        username: 'bobloblaw',
        email: 'bobloblaw@law.blog',
        roles: ['admin'],
      };
      const action = {
        type: actionTypes.SET_USER,
        user,
      };
      expect(userAuth.userAction(user)).to.deep.equal(action);
    });
  });

  describe('fisnishedLoadingUser', () => {
    it('creates an action to indicate app is finished loading', () => {
      const action = {
        type: actionTypes.FINISHED_LOADING_USER,
      };
      expect(userAuth.finishedLoadingUser()).to.deep.equal(action);
    });
  });

  describe('signupUser', () => {
    
  })

});
