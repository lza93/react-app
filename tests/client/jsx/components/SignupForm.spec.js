import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import SignupForm from '../../../../src/client/jsx/components/SignupForm';
import ErrorMessages from '../../../../src/client/jsx/components/ErrorMessages';
import propsFactory from '../../../helpers/propsFactory';

describe('<SignupForm /> Component', () => {
  let sandbox;
  let wrapper;
  const props = propsFactory('SignupFormProps', 'empty');

  beforeEach((done) => {
    sandbox = sinon.sandbox.create();
    done();
  });

  afterEach((done) => {
    sandbox.restore();
    done();
  });

  describe('Rendering', () => {
    it('renders a div with the id "signup-form"', () => {
      wrapper = shallow(<SignupForm {...props} />);
      expect(wrapper.find('#signup-form')).to.have.length(1);
    });

    it('renders ErrorMessages', () => {
      wrapper = shallow(<SignupForm {...props} />);
      expect(wrapper.find(ErrorMessages)).to.have.length(1);
    });

    it('initially renders username, email, password and passwordConfirmation input fields, and a disabled button', () => {
      wrapper = shallow(<SignupForm {...props} />);
      expect(wrapper.find('input#username[type="text"]')).to.have.length(1);
      expect(wrapper.find('input#email[type="email"]')).to.have.length(1);
      expect(wrapper.find('input#password[type="password"]')).to.have.length(1);
      expect(wrapper.find('input#password-confirmation[type="password"]')).to.have.length(1);
      expect(wrapper.find('button[type="submit"][disabled=true]')).to.have.length(1);
    });

    it('appropriately renders username, email, password and passwordConfirmation, and enables button with props', () => {
      const updatedProps = propsFactory('SignupFormProps', 'filled');
      wrapper = shallow(<SignupForm {...updatedProps} />);
      expect(wrapper.find(`input#username[value="${updatedProps.username}"]`)).to.have.length(1);
      expect(wrapper.find(`input#email[value="${updatedProps.email}"]`)).to.have.length(1);
      expect(wrapper.find(`input#password[value="${updatedProps.password}"]`)).to.have.length(1);
      expect(wrapper.find(`input#password-confirmation[value="${updatedProps.passwordConfirmation}"]`)).to.have.length(1);
      expect(wrapper.find('button[type="submit"][disabled=false]')).to.have.length(1);
    });
  });

  describe('Simulating User Events', () => {
    beforeEach((done) => {
      sandbox.spy(props, 'handleChange');
      sandbox.spy(props, 'displayUsernameError');
      sandbox.spy(props, 'displayEmailError');
      sandbox.spy(props, 'displayPasswordError');
      sandbox.spy(props, 'displayPasswordConfirmationError');
      sandbox.spy(props, 'handleSubmit');
      wrapper = shallow(<SignupForm {...props} />);
      done();
    });

    it('calls handleChange for changes in username, email, password, and passwordConfirmation', () => {
      const usernameInput = wrapper.find('input#username');
      const emailInput = wrapper.find('input#email');
      const passwordInput = wrapper.find('input#password');
      const passwordConfirmationInput = wrapper.find('input#password-confirmation');

      usernameInput.simulate('change');
      expect(props.handleChange.calledOnce).to.equal(true);
      emailInput.simulate('change');
      expect(props.handleChange.calledTwice).to.equal(true);
      passwordInput.simulate('change');
      expect(props.handleChange.calledThrice).to.equal(true);
      passwordConfirmationInput.simulate('change');
      expect(props.handleChange.callCount).to.equal(4);
    });

    it('calls appropriate displayError function onBlur for each input', () => {
      const usernameInput = wrapper.find('input#username');
      const emailInput = wrapper.find('input#email');
      const passwordInput = wrapper.find('input#password');
      const passwordConfirmationInput = wrapper.find('input#password-confirmation');

      usernameInput.simulate('blur');
      expect(props.displayUsernameError.calledOnce).to.equal(true);
      emailInput.simulate('blur').simulate('blur');
      expect(props.displayEmailError.calledTwice).to.equal(true);
      passwordInput.simulate('blur').simulate('blur').simulate('blur');
      expect(props.displayPasswordError.calledThrice).to.equal(true);
      passwordConfirmationInput.simulate('blur').simulate('blur').simulate('blur').simulate('blur');
      expect(props.displayPasswordConfirmationError.callCount).to.equal(4);
    });

    it('calls handleSubmit when form is submitted', () => {
      const form = wrapper.find('form');

      form.simulate('submit');
      expect(props.handleSubmit.calledOnce).to.equal(true);
    });
  });
});
