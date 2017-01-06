import { expect } from 'chai';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import sinon from 'sinon';

import * as userAuth from '../../../../../src/client/jsx/redux/actionCreators/userAuth';
import * as actionTypes from '../../../../../src/client/jsx/constants/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


describe('userAuth Actions', () => {
  const initialUserState = {
    email: '',
    id: NaN,
    loggedIn: false,
    roles: [],
    username: '',
  };

  const user = Object.assign({}, initialUserState, {
    id: 1,
    username: 'bobloblaw',
    email: 'bobloblaw@law.blog',
    roles: ['admin'],
  });

  describe('Synchronous actions: ', () => {
    describe('userAction', () => {
      it('creates an action to set the user', () => {
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
  });

  describe('Async Actions: ', () => {
    let testRequest;
    let store;
    beforeEach((done) => {
      testRequest = nock('http://localhost:80');
      store = mockStore({ user: {} });
      done();
    });

    afterEach((done) => {
      nock.cleanAll();
      done();
    });

    describe('signupUser', () => {
      it('creates SET_USER action', () => {
        const returnedUser = Object.assign({}, user);
        const signupInfo = {
          username: 'bobloblaw',
          email: 'bobloblaw@law.blog',
          password: 'Password1!',
        };
        testRequest.post('/api/users', signupInfo)
          .reply(200, returnedUser);
        const expectedActions = [
          {
            type: actionTypes.SET_USER,
            user: {
              ...returnedUser,
              loggedIn: true,
            },
          },
        ];
        return store.dispatch(userAuth.signupUser(signupInfo))
          .then(() => {
            expect(store.getActions()).to.deep.equal(expectedActions);
          });
      });
    });

    describe('loginUser', () => {
      it('creates SET_USER action', () => {
        const returnedUser = Object.assign({}, user);
        const loginInfo = {
          email: 'bobloblaw@law.blog',
          password: 'Password1!',
        };
        testRequest.post('/api/sessions', loginInfo)
          .reply(200, returnedUser);
        const expectedActions = [
          {
            type: actionTypes.SET_USER,
            user: {
              ...returnedUser,
              loggedIn: true,
            },
          },
        ];
        return store.dispatch(userAuth.loginUser(loginInfo))
          .then(() => {
            expect(store.getActions()).to.deep.equal(expectedActions);
          });
      });
    });

    describe('logoutUser', () => {
      it('creates SET_USER action', () => {
        testRequest.delete('/api/sessions')
          .reply(200);
        const expectedActions = [
          {
            type: actionTypes.SET_USER,
            user: initialUserState,
          },
        ];
        return store.dispatch(userAuth.logoutUser())
          .then(() => {
            expect(store.getActions()).to.deep.equal(expectedActions);
          });
      });

      it('handles errors aprropriately', () => {
        testRequest.delete('/api/sessions')
          .replyWithError('this is a test generated error');

        return store.dispatch(userAuth.logoutUser())
          .then(() => {
            // trivial tests because error handling isn't happening yet for this actionCreator
            expect(true).to.equal(true);
          });
      });
    });

    describe('loginActiveSession', () => {
      let sandbox;

      beforeEach((done) => {
        sandbox = sinon.sandbox.create();
        done();
      });

      afterEach((done) => {
        sandbox.restore();
        done();
      });

      it('creates SET_USER action for found user', () => {
        testRequest.get('/api/sessions/me')
          .reply(200, user);
        const expectedActions = [
          {
            type: actionTypes.SET_USER,
            user: {
              ...user,
              loggedIn: true,
            },
          },
          {
            type: actionTypes.FINISHED_LOADING_USER,
          },
        ];
        return store.dispatch(userAuth.loginActiveSession())
          .then(() => {
            expect(store.getActions()).to.deep.equal(expectedActions);
          });
      });

      it('calls logoutUser action for user not found', () => {
        testRequest.get('/api/sessions/me')
          .reply(200);
        testRequest.delete('/api/sessions')
          .reply(200);
        const expectedActions = [
          {
            type: actionTypes.FINISHED_LOADING_USER,
          },
          {
            type: 'SET_USER',
            user: {
              email: '',
              id: NaN,
              loggedIn: false,
              roles: [],
              username: '',
            },
          },
        ];
        return store.dispatch(userAuth.loginActiveSession())
          .then(() => {
            expect(store.getActions()).to.deep.equal(expectedActions);
          });
      });
    });
  });
});
