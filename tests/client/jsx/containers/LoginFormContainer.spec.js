import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import { LoginFormContainer } from '../../../../src/client/jsx/containers/LoginFormContainer';
import LoginForm from '../../../../src/client/jsx/components/LoginForm';
import * as errorConstants from '../../../../src/client/jsx/constants/errorConstants';
import propsFactory from '../../../helpers/propsFactory';
import { rejectedPromise } from '../../../helpers/emptyPromise';
import { createBasicEvent, createEventTargetValue } from '../../../helpers/eventCreators';

describe('<LoginFormContainer />', () => {
  let wrapper;
  let sandbox;
  const LoginFormContainerProps = propsFactory('LoginFormContainerProps', 'empty');

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('Rendering', () => {
    it('renders LoginForm component', () => {
      wrapper = shallow(<LoginFormContainer {...LoginFormContainerProps} />);
      expect(wrapper.find(LoginForm)).to.have.length(1);
    });
  });

  describe('Class Methods', () => {
    let event;
    describe('handleSubmit', () => {
      it('calls loginUser when called', () => {
        sandbox.spy(LoginFormContainerProps, 'loginUser');
        wrapper = shallow(<LoginFormContainer {...LoginFormContainerProps} />);
        event = createBasicEvent();

        wrapper.instance().handleSubmit(event);
        expect(LoginFormContainerProps.loginUser.calledOnce).to.equal(true);
      });

      it('calls props.router.push when loginUser is successful', () => {
        sandbox.spy(LoginFormContainerProps.router, 'push');
        wrapper = shallow(<LoginFormContainer {...LoginFormContainerProps} />);
        event = createBasicEvent();

        return wrapper.instance().handleSubmit(event)
          .then(() => {
            expect(LoginFormContainerProps.router.push.calledOnce).to.equal(true);
          });
      });

      it('calls addError when loginUser is unsuccessful', () => {
        sandbox.stub(errorConstants, 'addError');
        const newProps = Object.assign({}, LoginFormContainerProps, {
          loginUser: rejectedPromise,
        });
        wrapper = shallow(<LoginFormContainer {...newProps} />);
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
        wrapper = shallow(<LoginFormContainer {...LoginFormContainerProps} />);
        const handleChange = wrapper.instance().handleChange;
        sandbox.stub(wrapper.instance(), 'enableSubmit').returns(true);

        event = createEventTargetValue('boblob');
        handleChange('email', event);
        expect(wrapper.state('email')).to.equal('boblob');

        event = createEventTargetValue('bobloblaw@law.blog');
        handleChange('email', event);
        expect(wrapper.state('email')).to.equal('bobloblaw@law.blog');

        event = createEventTargetValue('Password1!');
        handleChange('password', event);
        expect(wrapper.state('password')).to.equal('Password1!');
        expect(wrapper.state('email')).to.equal('bobloblaw@law.blog');
      });

      it('calls enableSubmit class method', () => {
        wrapper = shallow(<LoginFormContainer {...LoginFormContainerProps} />);
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
        wrapper = shallow(<LoginFormContainer {...LoginFormContainerProps} />);
        sandbox.stub(wrapper.instance(), 'validateEmail').returns(false);
        wrapper.instance().displayEmailError();
        expect(errorConstants.addError.calledOnce).to.equal(true);
      });

      it('calls removeError for valid email', () => {
        sandbox.stub(errorConstants, 'removeError');
        wrapper = shallow(<LoginFormContainer {...LoginFormContainerProps} />);
        sandbox.stub(wrapper.instance(), 'validateEmail').returns(true);
        wrapper.instance().displayEmailError();
        expect(errorConstants.removeError.calledOnce).to.equal(true);
      });
    });

    describe('enableSubmit', () => {
      it('sets canSubmit on state to true if there is a valid email and password length', () => {
        wrapper = shallow(<LoginFormContainer {...LoginFormContainerProps} />);
        const instance = wrapper.instance();
        sandbox.stub(instance, 'validateEmail').returns(true);

        wrapper.setState({ password: 'Password1!' });
        expect(instance.state.canSubmit).to.equal(false);
        instance.enableSubmit();
        expect(instance.state.canSubmit).to.equal(true);
      });

      it('sets canSubmit on state to false if there is an invalid email but valid password length', () => {
        wrapper = shallow(<LoginFormContainer {...LoginFormContainerProps} />);
        const instance = wrapper.instance();
        sandbox.stub(instance, 'validateEmail').returns(false);

        wrapper.setState({ password: 'Password1!', canSubmit: true });
        expect(instance.state.canSubmit).to.equal(true);
        instance.enableSubmit();
        expect(instance.state.canSubmit).to.equal(false);
      });

      it('sets canSubmit on state to false if there is a valid email but invalid password length', () => {
        wrapper = shallow(<LoginFormContainer {...LoginFormContainerProps} />);
        const instance = wrapper.instance();
        sandbox.stub(instance, 'validateEmail').returns(true);

        wrapper.setState({ password: 'PW1!', canSubmit: true });
        expect(instance.state.canSubmit).to.equal(true);
        instance.enableSubmit();
        expect(instance.state.canSubmit).to.equal(false);
      });
    });

    describe('validateEmail', () => {
      it('returns true/false for a valid/invalid email', () => {
        wrapper = shallow(<LoginFormContainer {...LoginFormContainerProps} />);
        const instance = wrapper.instance();
        wrapper.setState({ email: 'bobloblaw@law.blog' });
        expect(instance.validateEmail()).to.equal(true);
        wrapper.setState({ email: 'bobloblawATlawDOTblog' });
        expect(instance.validateEmail()).to.equal(false);
      });
    });
  });
});
