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
      xit('calls loginUser when called', () => {
        // throw new Error('decide to run through error chain on handlesubmit or stub it out');
        sandbox.spy(LoginFormContainerProps, 'loginUser');
        sandbox.spy(LoginFormContainerProps.router, 'push');
        wrapper = shallow(<LoginFormContainer {...LoginFormContainerProps} />);
        const handleSubmit = wrapper.instance().handleSubmit;
        event = createBasicEvent();

        handleSubmit(event);
        expect(LoginFormContainerProps.loginUser.calledOnce).to.equal(true);
      });

      xit('calls props.router.push when loginUser is successful', () => {
        sandbox.spy(LoginFormContainerProps.router, 'push');
        wrapper = shallow(<LoginFormContainer {...LoginFormContainerProps} />);
        const handleSubmit = wrapper.instance().handleSubmit;
        event = createBasicEvent();
        
        return handleSubmit(event)
          .then(() => {
            expect(LoginFormContainerProps.router.push.calledOnce).to.equal(true);
          });
      });

      it('calls addError when loginUser is unsuccessful', () => {
        sandbox.spy(errorConstants, 'addError');
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
      it('should set state appropriately', () => {
        wrapper = shallow(<LoginFormContainer {...LoginFormContainerProps} />);
        const handleChange = wrapper.instance().handleChange;

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

      it('should call enableSubmit class method', () => {
        wrapper = shallow(<LoginFormContainer {...LoginFormContainerProps} />);
        const instance = wrapper.instance();
        const handleChange = instance.handleChange;
        sandbox.spy(instance, 'enableSubmit')
        
        event = createEventTargetValue('bobloblaw@law.blog');
        handleChange('email', event);
        expect(instance.enableSubmit.calledOnce).to.equal(true);

        event = createEventTargetValue('Password1!');
        handleChange('password', event);
        expect(instance.enableSubmit.calledTwice).to.equal(true);
      });
    });

    describe('displayEmailError', () => {
      
    });

    describe('enableSubmit', () => {
    
    });

    describe('validateEmail', () => {
    
    });
  });

  describe('Lifecycle Tests', () => {
    xit('sets state appropriately on load', () => {
      wrapper = shallow(<LoginFormContainer {...LoginFormContainerProps} />);
      expect(wrapper.state().appLoading).to.equal(LoginFormContainerProps.appLoading);
    });

    xit('calls loginActiveSession before mounting', () => {
      sandbox.spy(LoginFormContainerProps, 'loginActiveSession');
      wrapper = shallow(<LoginFormContainer {...LoginFormContainerProps} />);
      expect(LoginFormContainerProps.loginActiveSession.calledOnce).to.equal(true);
    });

    xit('calls setState and sets the new state when receiving new props only', () => {
      wrapper = shallow(<LoginFormContainer {...LoginFormContainerProps} />);
      sandbox.spy(Component.prototype, 'setState');
      wrapper.setProps({ appLoading: true });
      wrapper.setProps({ appLoading: true });
      expect(Component.prototype.setState.calledOnce).to.equal(true);
      wrapper.setProps({ appLoading: false });
      expect(Component.prototype.setState.calledTwice).to.equal(true);
      expect(wrapper.state('appLoading')).to.equal(false);
    });
  });
});
