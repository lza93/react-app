import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import Navbar from '../../../../src/client/jsx/components/Navbar';

describe('<Navbar /> Component', () => {
  let wrapper;
  let sandbox;
  const props = {
    loggedIn: false,
    logout: () => {},
  };
  const loggedInProps = Object.assign({}, props, { loggedIn: true });

  beforeEach((done) => {
    sandbox = sinon.sandbox.create();
    done();
  });

  afterEach((done) => {
    sandbox.restore();
    done();
  });

  describe('Rendering', () => {
    it('renders a navbar with id "main-navbar"', () => {
      wrapper = shallow(<Navbar {...props} />);
      expect(wrapper.find('nav#main-navbar')).to.have.length(1);
    });

    it('initially renders Home, About, Signup and Login links, not logout Button', () => {
      wrapper = shallow(<Navbar {...props} />);
      expect(wrapper.find('Link[to="/"]')).to.have.length(1);
      expect(wrapper.find('Link[to="/about"]')).to.have.length(1);
      expect(wrapper.find('Link[to="/signup"]')).to.have.length(1);
      expect(wrapper.find('Link[to="/login"]')).to.have.length(1);
      expect(wrapper.find('button#logout-navbar-button')).to.have.length(0);
    });

    it('renders Home and About links, and logout button for loggedIn users, not Signup and Login links', () => {
      wrapper = shallow(<Navbar {...loggedInProps} />);
      expect(wrapper.find('Link[to="/"]')).to.have.length(1);
      expect(wrapper.find('Link[to="/about"]')).to.have.length(1);
      expect(wrapper.find('button#logout-navbar-button')).to.have.length(1);
      expect(wrapper.find('Link[to="/signup"]')).to.have.length(0);
      expect(wrapper.find('Link[to="/login"]')).to.have.length(0);
    });
  });

  describe('Simulating User Events', () => {
    it('calls logout when logout button is click', () => {
      sandbox.spy(loggedInProps, 'logout');
      const button = shallow(<Navbar {...loggedInProps} />).find('button#logout-navbar-button');

      button.simulate('click');
      expect(loggedInProps.logout.calledOnce).to.equal(true);
    });
  });
});
