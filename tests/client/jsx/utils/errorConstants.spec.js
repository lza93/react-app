import { expect } from 'chai';
import sinon from 'sinon';

import * as errorUtils from '../../../../src/client/jsx/constants/errorConstants';

describe('errorUtils', () => {
  let sandbox;
  let mockContextThis;
  beforeEach((done) => {
    mockContextThis = {
      state: { errors: [
        errorUtils.default.SIGNUP_ERROR,
        errorUtils.default.LOGIN_ERROR,
      ] },
      setState: () => {},
    };
    sandbox = sinon.sandbox.create();
    done();
  });
  afterEach((done) => {
    sandbox.restore();
    done();
  });

  describe('noDuplicateIds', () => {
    it('returns true if no duplicate error ids are found', () => {
      const arrayToCheck = mockContextThis.state.errors;
      const objectToAdd = errorUtils.default.EMAIL_SYNTAX;
      expect(errorUtils.noDuplicateIds(arrayToCheck, objectToAdd)).to.equal(true);
    });
    it('returns false if duplicate error ids are found', () => {
      const arrayToCheck = mockContextThis.state.errors;
      const objectToAdd = errorUtils.default.LOGIN_ERROR;
      expect(errorUtils.noDuplicateIds(arrayToCheck, objectToAdd)).to.equal(false);
    });
  });
  describe('adding and removing errors', () => {
    let setStateSpy;
    beforeEach((done) => {
      setStateSpy = sandbox.spy(mockContextThis, 'setState');
      done();
    });

    describe('addError', () => {
      it('calls setState if the error doesn\'t already exist', () => {
        const errorToAdd = errorUtils.default.USERNAME_SYNTAX;
        const errorsCopy = mockContextThis.state.errors.slice();
        errorsCopy.push(errorToAdd);
        errorUtils.addError(mockContextThis, errorToAdd);

        expect(setStateSpy.calledOnce).to.equal(true);
        expect(setStateSpy.getCall(0).args[0]).to.deep.equal({ errors: errorsCopy });
      });

      it('doesn\'t call setState if the error already exists', () => {
        const errorToAdd = errorUtils.default.SIGNUP_ERROR;
        errorUtils.addError(mockContextThis, errorToAdd);

        expect(setStateSpy.called).to.equal(false);
      });
    });

    describe('removeError', () => {
      it('calls setState if it finds the error to be removed', () => {
        const errorToRemove = errorUtils.default.LOGIN_ERROR;
        const errorsCopy = mockContextThis.state.errors.slice(0, 1);
        errorUtils.removeError(mockContextThis, errorToRemove);

        expect(setStateSpy.calledOnce).to.equal(true);
        expect(setStateSpy.getCall(0).args[0]).to.deep.equal({ errors: errorsCopy });
      });

      it('doesn\'t call setState if the error isn\'t found', () => {
        const errorToRemove = errorUtils.default.EMAIL_SYNTAX;
        errorUtils.removeError(mockContextThis, errorToRemove);

        expect(setStateSpy.called).to.equal(false);
      });
    });
  });
});
