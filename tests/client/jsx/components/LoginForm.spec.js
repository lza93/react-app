import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import LoginForm from '../../../../src/client/jsx/components/LoginForm';
import ErrorMessages from '../../../../src/client/jsx/components/ErrorMessages';

describe('<LoginForm /> Component', () => {
  let sandbox;
  let wrapper;
  const props = {
    handleChange: () => {},
    handleSubmit: () => {},
    displayEmailError: () => {},
    email: '',
    password: '',
    errors: [],
    canSubmit: false,
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
    it('renders a div with id "login-form"', () => {
      wrapper = shallow(<LoginForm {...props} />);
      expect(wrapper.find('#login-form')).to.have.length(1);
    });

    it('renders ErrorMessages', () => {
      wrapper = shallow(<LoginForm {...props} />);
      expect(wrapper.find(ErrorMessages)).to.have.length(1);
    });

    it('initially renders email and password input, and disabled button fields', () => {
      wrapper = shallow(<LoginForm {...props} />);
      expect(wrapper.find('input[type="email"]')).to.have.length(1);
      expect(wrapper.find('input[type="password"]')).to.have.length(1);
      expect(wrapper.find('button[type="submit"][disabled=true]')).to.have.length(1);
    });

    it('appropriately renders filled email, password, and enables button with props', () => {
      const updatedProps = Object.assign({}, props, {
        email: 'bob@example.com',
        password: 'Password1!',
        canSubmit: true,
      });
      wrapper = shallow(<LoginForm {...updatedProps} />);
      expect(wrapper.find('input[type="email"][value="bob@example.com"]')).to.have.length(1);
      expect(wrapper.find('input[type="password"][value="Password1!"]')).to.have.length(1);
      expect(wrapper.find('button[type="submit"][disabled=false]')).to.have.length(1);
    });
  });

  describe('Simulating User Events', () => {
    it('should call props.handleChange for changes in email and passowrd', () => {
      sandbox.spy(props, 'handleChange');
      wrapper = shallow(<LoginForm {...props} />);
      const emailInput = wrapper.find('input[type="email"]');
      const passwordInput = wrapper.find('input[type="password"]');

      emailInput.simulate('change');
      expect(props.handleChange.calledOnce).to.equal(true);
      passwordInput.simulate('change');
      expect(props.handleChange.calledTwice).to.equal(true);
    });

    it('should call handleSubmit when form is submitted', () => {
      sandbox.spy(props, 'handleSubmit');
      wrapper = shallow(<LoginForm {...props} />);
      const form = wrapper.find('form');

      form.simulate('submit');
      expect(props.handleSubmit.calledOnce).to.equal(true);
    });
  });
});
