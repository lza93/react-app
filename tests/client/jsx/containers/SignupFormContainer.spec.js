import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import { SignupFormContainer } from '../../../../src/client/jsx/containers/SignupFormContainer';
import SignupForm from '../../../../src/client/jsx/components/SignupForm';
import * as errorConstants from '../../../../src/client/jsx/constants/errorConstants';
import propsFactory from '../../../helpers/propsFactory';
import { rejectedPromise } from '../../../helpers/emptyPromise';
import { createBasicEvent, createEventTargetValue } from '../../../helpers/eventCreators';

describe('<SignupFormContainer />', () => {
  let wrapper;
  let sandbox;
  const SignupFormContainerProps = propsFactory('SignupFormContainerProps', 'empty');

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('Rendering', () => {
    it('renders SignupForm component', () => {
      wrapper = shallow(<SignupFormContainer {...SignupFormContainerProps} />);
      expect(wrapper.find(SignupForm)).to.have.length(1);
    });
  });

  describe('Class Methods', () => {
    let event;
    describe('handleSubmit', () => {
      it('calls signupUser when called', () => {
        sandbox.spy(SignupFormContainerProps, 'signupUser');
        wrapper = shallow(<SignupFormContainer {...SignupFormContainerProps} />);
        event = createBasicEvent();

        wrapper.instance().handleSubmit(event);
        expect(SignupFormContainerProps.signupUser.calledOnce).to.equal(true);
      });

      it('calls props.router.push when signupUser is successful', () => {
        sandbox.spy(SignupFormContainerProps.router, 'push');
        wrapper = shallow(<SignupFormContainer {...SignupFormContainerProps} />);
        event = createBasicEvent();

        return wrapper.instance().handleSubmit(event)
          .then(() => {
            expect(SignupFormContainerProps.router.push.calledOnce).to.equal(true);
          });
      });

      it('calls addError when signupUser is unsuccessful', () => {
        sandbox.stub(errorConstants, 'addError');
        const newProps = Object.assign({}, SignupFormContainerProps, {
          signupUser: rejectedPromise,
        });
        wrapper = shallow(<SignupFormContainer {...newProps} />);
        const handleSubmit = wrapper.instance().handleSubmit;
        event = createBasicEvent();

        return handleSubmit(event)
          .then(() => {
            expect(errorConstants.addError.calledOnce).to.equal(true);
          });
      });
    });

    describe('handleChange', () => {
      it('sets state appropriately', () => {
        wrapper = shallow(<SignupFormContainer {...SignupFormContainerProps} />);
        const handleChange = wrapper.instance().handleChange;
        sandbox.stub(wrapper.instance(), 'enableSubmit').returns(true);

        event = createEventTargetValue('bobloblaw');
        handleChange('username', event);
        expect(wrapper.state('username')).to.equal('bobloblaw');

        event = createEventTargetValue('bobloblaw@law.blog');
        handleChange('email', event);
        expect(wrapper.state('email')).to.equal('bobloblaw@law.blog');

        event = createEventTargetValue('Password1!');
        handleChange('password', event);
        expect(wrapper.state('password')).to.equal('Password1!');

        event = createEventTargetValue('Password2!');
        handleChange('passwordConfirmation', event);
        expect(wrapper.state('passwordConfirmation')).to.equal('Password2!');
      });

      it('calls enableSubmit class method', () => {
        wrapper = shallow(<SignupFormContainer {...SignupFormContainerProps} />);
        const instance = wrapper.instance();
        const handleChange = instance.handleChange;
        sandbox.stub(instance, 'enableSubmit').returns(true);

        event = createEventTargetValue('bobloblaw@law.blog');
        handleChange('email', event);
        expect(instance.enableSubmit.calledOnce).to.equal(true);

        event = createEventTargetValue('Password1!');
        handleChange('password', event);
        expect(instance.enableSubmit.calledTwice).to.equal(true);
      });
    });

    describe('displayEmailError', () => {
      it('calls addError for invalid email', () => {
        sandbox.stub(errorConstants, 'addError');
        wrapper = shallow(<SignupFormContainer {...SignupFormContainerProps} />);
        sandbox.stub(wrapper.instance(), 'validateEmail').returns(false);
        wrapper.instance().displayEmailError();
        expect(errorConstants.addError.calledOnce).to.equal(true);
      });

      it('calls removeError for valid email', () => {
        sandbox.stub(errorConstants, 'removeError');
        wrapper = shallow(<SignupFormContainer {...SignupFormContainerProps} />);
        sandbox.stub(wrapper.instance(), 'validateEmail').returns(true);
        wrapper.instance().displayEmailError();
        expect(errorConstants.removeError.calledOnce).to.equal(true);
      });
    });

    describe('displayUsernameError', () => {
      it('calls addError for invalid username', () => {
        sandbox.stub(errorConstants, 'addError');
        wrapper = shallow(<SignupFormContainer {...SignupFormContainerProps} />);
        sandbox.stub(wrapper.instance(), 'validateUsername').returns(false);
        wrapper.instance().displayUsernameError();
        expect(errorConstants.addError.calledOnce).to.equal(true);
      });

      it('calls removeError for valid username', () => {
        sandbox.stub(errorConstants, 'removeError');
        wrapper = shallow(<SignupFormContainer {...SignupFormContainerProps} />);
        sandbox.stub(wrapper.instance(), 'validateUsername').returns(true);
        wrapper.instance().displayUsernameError();
        expect(errorConstants.removeError.calledOnce).to.equal(true);
      });
    });

    describe('displayPasswordError', () => {
      it('calls addError for invalid password', () => {
        sandbox.stub(errorConstants, 'addError');
        wrapper = shallow(<SignupFormContainer {...SignupFormContainerProps} />);
        sandbox.stub(wrapper.instance(), 'validatePassword').returns(false);
        wrapper.instance().displayPasswordError();
        expect(errorConstants.addError.calledOnce).to.equal(true);
      });

      it('calls removeError for valid password', () => {
        sandbox.stub(errorConstants, 'removeError');
        wrapper = shallow(<SignupFormContainer {...SignupFormContainerProps} />);
        sandbox.stub(wrapper.instance(), 'validatePassword').returns(true);
        wrapper.instance().displayPasswordError();
        expect(errorConstants.removeError.calledOnce).to.equal(true);
      });
    });

    describe('displayPasswordConfirmationError', () => {
      it('calls addError for invalid passwordConfirmation', () => {
        sandbox.stub(errorConstants, 'addError');
        wrapper = shallow(<SignupFormContainer {...SignupFormContainerProps} />);
        sandbox.stub(wrapper.instance(), 'validatePasswordConfirmation').returns(false);
        wrapper.instance().displayPasswordConfirmationError();
        expect(errorConstants.addError.calledOnce).to.equal(true);
      });

      it('calls removeError for valid passwordConfirmation', () => {
        sandbox.stub(errorConstants, 'removeError');
        wrapper = shallow(<SignupFormContainer {...SignupFormContainerProps} />);
        sandbox.stub(wrapper.instance(), 'validatePasswordConfirmation').returns(true);
        wrapper.instance().displayPasswordConfirmationError();
        expect(errorConstants.removeError.calledOnce).to.equal(true);
      });
    });

    describe('enableSubmit', () => {
      it('sets canSubmit on state to true if all validations pass', () => {
        wrapper = shallow(<SignupFormContainer {...SignupFormContainerProps} />);
        const instance = wrapper.instance();
        sandbox.stub(instance, 'validateEmail').returns(true);
        sandbox.stub(instance, 'validateUsername').returns(true);
        sandbox.stub(instance, 'validatePassword').returns(true);
        sandbox.stub(instance, 'validatePasswordConfirmation').returns(true);

        wrapper.setState({ password: 'Password1!' });
        expect(instance.state.canSubmit).to.equal(false);
        instance.enableSubmit();
        expect(instance.state.canSubmit).to.equal(true);
      });

      it('sets canSubmit on state to false if there is one failing condition', () => {
        wrapper = shallow(<SignupFormContainer {...SignupFormContainerProps} />);
        const instance = wrapper.instance();
        const validateEmail = sandbox.stub(instance, 'validateEmail').returns(true);
        const validateUsername = sandbox.stub(instance, 'validateUsername').returns(true);
        const validatePassword = sandbox.stub(instance, 'validatePassword').returns(true);
        const validatePasswordConfirmation = sandbox.stub(instance, 'validatePasswordConfirmation').returns(false);

        wrapper.setState({ canSubmit: true });
        expect(instance.state.canSubmit).to.equal(true);
        instance.enableSubmit();
        expect(instance.state.canSubmit).to.equal(false);

        wrapper.setState({ canSubmit: true });
        expect(instance.state.canSubmit).to.equal(true);
        validatePasswordConfirmation.returns(true);
        validatePassword.returns(false);
        instance.enableSubmit();
        expect(instance.state.canSubmit).to.equal(false);

        wrapper.setState({ canSubmit: true });
        expect(instance.state.canSubmit).to.equal(true);
        validatePassword.returns(true);
        validateUsername.returns(false);
        instance.enableSubmit();
        expect(instance.state.canSubmit).to.equal(false);

        wrapper.setState({ canSubmit: true });
        expect(instance.state.canSubmit).to.equal(true);
        validateUsername.returns(true);
        validateEmail.returns(false);
        instance.enableSubmit();
        expect(instance.state.canSubmit).to.equal(false);
      });
    });

    describe('validateEmail', () => {
      it('returns true/false for a valid/invalid email', () => {
        wrapper = shallow(<SignupFormContainer {...SignupFormContainerProps} />);
        const instance = wrapper.instance();
        wrapper.setState({ email: 'bobloblaw@law.blog' });
        expect(instance.validateEmail()).to.equal(true);
        wrapper.setState({ email: 'bobloblawATlawDOTblog' });
        expect(instance.validateEmail()).to.equal(false);
      });
    });

    describe('validateUsername', () => {
      it('returns true/false for a valid/invalid username', () => {
        wrapper = shallow(<SignupFormContainer {...SignupFormContainerProps} />);
        const instance = wrapper.instance();
        wrapper.setState({ username: 'William' });
        expect(instance.validateUsername()).to.equal(true);
        wrapper.setState({ username: 'wil1!' });
        expect(instance.validateUsername()).to.equal(false);
      });
    });

    describe('validatePassword', () => {
      it('returns true/false for a valid/invalid password', () => {
        wrapper = shallow(<SignupFormContainer {...SignupFormContainerProps} />);
        const instance = wrapper.instance();
        wrapper.setState({ password: 'Password1!' });
        expect(instance.validatePassword()).to.equal(true);
        wrapper.setState({ password: 'Pw1!' });
        expect(instance.validatePassword()).to.equal(false);
      });
    });

    describe('validatePasswordConfirmation', () => {
      it('returns true/false for a valid/invalid password', () => {
        wrapper = shallow(<SignupFormContainer {...SignupFormContainerProps} />);
        const instance = wrapper.instance();
        wrapper.setState({ password: 'Password1!', passwordConfirmation: 'Password1!' });
        expect(instance.validatePasswordConfirmation()).to.equal(true);
        wrapper.setState({ password: 'Password1!', passwordConfirmation: 'Password2!' });
        expect(instance.validatePasswordConfirmation()).to.equal(false);
      });
    });
  });

  describe('Lifecycle Tests', () => {
    it('sets state appropriately on load', () => {
      wrapper = shallow(<SignupFormContainer {...SignupFormContainerProps} />);
      const state = wrapper.state();
      expect(state.username).to.equal('');
      expect(state.email).to.equal('');
      expect(state.password).to.equal('');
      expect(state.passwordConfirmation).to.equal('');
      expect(state.errors).to.deep.equal([]);
      expect(state.canSubmit).to.equal(false);
    });
  });
});
