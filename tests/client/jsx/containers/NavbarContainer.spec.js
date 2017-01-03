import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import { NavbarContainer } from '../../../../src/client/jsx/containers/NavbarContainer';
import Navbar from '../../../../src/client/jsx/components/Navbar';
import propsFactory from '../../../helpers/propsFactory';
import { createBasicEvent } from '../../../helpers/eventCreators';
import { rejectedPromise } from '../../../helpers/emptyPromise';

describe('<NavbarContainer />', () => {
  let wrapper;
  let sandbox;
  const NavbarContainerProps = propsFactory('NavbarContainerProps', 'empty');

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('Rendering', () => {
    it('renders LoginForm component', () => {
      wrapper = shallow(<NavbarContainer {...NavbarContainerProps} />);
      expect(wrapper.find(Navbar)).to.have.length(1);
    });
  });

  describe('Class Methods', () => {
    let event;
    describe('logout', () => {
      it('calls logoutUser when called', () => {
        sandbox.spy(NavbarContainerProps, 'logoutUser');
        wrapper = shallow(<NavbarContainer {...NavbarContainerProps} />);
        event = createBasicEvent();

        wrapper.instance().logout(event);
        expect(NavbarContainerProps.logoutUser.calledOnce).to.equal(true);
      });

      it('calls props.router.push when logoutUser is successful', () => {
        sandbox.spy(NavbarContainerProps.router, 'push');
        wrapper = shallow(<NavbarContainer {...NavbarContainerProps} />);
        event = createBasicEvent();

        return wrapper.instance().logout(event)
          .then(() => {
            expect(NavbarContainerProps.router.push.calledOnce).to.equal(true);
          });
      });

      it('a test that needs to be completed when front end error handling is decided on', () => {
        const newProps = Object.assign({}, NavbarContainerProps, {
          logoutUser: rejectedPromise,
        });
        wrapper = shallow(<NavbarContainer {...newProps} />);
        event = createBasicEvent();

        return wrapper.instance().logout(event)
          .then(() => {
            // no decision made yet on how to handle front end failure of logout
            expect(true).to.equal(true);
          });
      });
    });
  });
});
