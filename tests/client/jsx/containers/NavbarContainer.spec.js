import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import { NavbarContainer, mapStateToProps, mapDispatchToProps } from '../../../../src/client/jsx/containers/NavbarContainer';
import Navbar from '../../../../src/client/jsx/components/Navbar';
import propsFactory from '../../../helpers/propsFactory';
import { createBasicEvent } from '../../../helpers/eventCreators';
import { rejectedPromise } from '../../../helpers/emptyPromise';
import storeFake, * as storeFakeMethods from '../../../helpers/storeFake';
import * as userAuth from '../../../../src/client/jsx/redux/actionCreators/userAuth';

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

  describe('Lifecycle Tests', () => {
    it('updates state if loggedIn status changes', () => {
      wrapper = shallow(<NavbarContainer {...NavbarContainerProps} />);
      sandbox.spy(wrapper.instance(), 'setState');
      const newProps = propsFactory('NavbarContainerProps', 'filled');
      wrapper.setProps(newProps);
      expect(wrapper.instance().setState.calledOnce).to.equal(true);
      wrapper.setProps(NavbarContainerProps);
      expect(wrapper.instance().setState.calledTwice).to.equal(true);
    });

    it('doesn\'t update state if loggedIn status is the same', () => {
      wrapper = shallow(<NavbarContainer {...NavbarContainerProps} />);
      sandbox.spy(wrapper.instance(), 'setState');
      const newProps = propsFactory('NavbarContainerProps', 'filled');
      newProps.user.loggedIn = false;
      wrapper.setProps(newProps);
      expect(wrapper.instance().setState.called).to.equal(false);
    });
  });

  describe('Mapping State and Dispatch to Props', () => {
    describe('mapStateToProps', () => {
      let store;

      beforeEach((done) => {
        store = storeFake();
        done();
      });

      it('returns appropriate props', () => {
        const expectedProps = propsFactory('NavbarContainerProps', 'empty');
        delete expectedProps.logoutUser;
        delete expectedProps.router;
        const returnedProps = mapStateToProps(store);
        expect(returnedProps).to.deep.equal(expectedProps);
      });
    });

    describe('mapDispatchToProps', () => {
      let returnedProps;
      beforeEach((done) => {
        sandbox.spy(storeFakeMethods, 'dispatch');
        returnedProps = mapDispatchToProps(storeFakeMethods.dispatch);
        done();
      });

      it('maps logoutUser to props', () => {
        expect(returnedProps.logoutUser).to.exist; // eslint-disable-line
        sandbox.stub(userAuth, 'logoutUser');
        const userData = {};
        returnedProps.logoutUser();
        expect(storeFakeMethods.dispatch.calledOnce).to.equal(true);
        expect(userAuth.logoutUser.calledOnce).to.equal(true);
        expect(userAuth.logoutUser.calledWith()).to.equal(true);
        expect(storeFakeMethods.dispatch.calledWith(userAuth.logoutUser())).to.equal(true);
      });
    });
  });
});
