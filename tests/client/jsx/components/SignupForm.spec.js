import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import SignupForm from '../../../../src/client/jsx/components/SignupForm';
import ErrorMessages from '../../../../src/client/jsx/components/ErrorMessages';

describe('<SignupForm /> Component', () => {
  let sandbox;
  let wrapper;
  const props = {
    canSubmit: false,
    email: '',
    errors: [],
    password: '',
    passwordConfirmation: '',
    username: '',
    displayPasswordConfirmationError: () => {},
    handleChange: () => {},
    handleSubmit: () => {},
  };

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
      const updatedProps = Object.assign({}, props, {
        username: 'bobloblaw',
        email: 'bob.loblaw@law.blog',
        password: 'Password1!',
        passwordConfirmation: 'Password1!',
        canSubmit: true,
      });
      wrapper = shallow(<SignupForm {...updatedProps} />);
      expect(wrapper.find('input#username[value="bobloblaw"]')).to.have.length(1);
      expect(wrapper.find('input#email[value="bob.loblaw@law.blog"]')).to.have.length(1);
      expect(wrapper.find('input#password[value="Password1!"]')).to.have.length(1);
      expect(wrapper.find('input#password-confirmation[value="Password1!"]')).to.have.length(1);
      expect(wrapper.find('button[type="submit"][disabled=false]')).to.have.length(1);
    });
  });

  describe('Simulating User Events', () => {
    it('calls handleChange for changes in username, email, password, and passwordConfirmation', () => {
      sandbox.spy(props, 'handleChange');
      wrapper = shallow(<SignupForm {...props} />);
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

    it('calls handleSubmit when form is submitted', () => {
      sandbox.spy(props, 'handleSubmit');
      const form = shallow(<SignupForm {...props} />).find('form');

      form.simulate('submit');
      expect(props.handleSubmit.calledOnce).to.equal(true);
    });
  });
});
