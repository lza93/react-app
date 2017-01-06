import React, { Component } from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import { AppContainer, mapStateToProps, mapDispatchToProps } from '../../../../src/client/jsx/containers/AppContainer';
import ConnectedNavbarContainer from '../../../../src/client/jsx/containers/NavbarContainer';
import AppLoading from '../../../../src/client/jsx/components/AppLoading';
import propsFactory from '../../../helpers/propsFactory';
import storeFake, * as storeFakeMethods from '../../../helpers/storeFake';
import * as userAuth from '../../../../src/client/jsx/redux/actionCreators/userAuth';

describe('<AppContainer />', () => {
  let wrapper;
  let sandbox;
  const AppContainerProps = propsFactory('AppContainerProps', 'empty');

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('Rendering', () => {
    it('initially renders AppLoading component', () => {
      const loadingProps = Object.assign({}, AppContainerProps, { appLoading: true });
      wrapper = shallow(<AppContainer {...loadingProps} />);
      expect(wrapper.find(AppLoading)).to.have.length(1);
      expect(wrapper.find('#app-root')).to.have.length(0);
    });

    it('renders App component', () => {
      wrapper = shallow(<AppContainer {...AppContainerProps} />);
      expect(wrapper.find('#app-root')).to.have.length(1);
      expect(wrapper.find(AppLoading)).to.have.length(0);
    });

    it('renders Navbar component', () => {
      wrapper = shallow(<AppContainer {...AppContainerProps} />);
      expect(wrapper.find(ConnectedNavbarContainer)).to.have.length(1);
    });

    it('renders children passed in component', () => {
      wrapper = shallow(
        <AppContainer {...AppContainerProps} >
          <div className="app-child" id="app-child-1" />
          <div className="app-child" id="app-child-2" />
        </AppContainer>);
      expect(wrapper.find('#app-child-1')).to.have.length(1);
      expect(wrapper.find('#app-child-2')).to.have.length(1);
      expect(wrapper.find('.app-child')).to.have.length(2);
    });
  });

  describe('Lifecycle Tests', () => {
    it('sets state appropriately on load', () => {
      wrapper = shallow(<AppContainer {...AppContainerProps} />);
      expect(wrapper.state().appLoading).to.equal(AppContainerProps.appLoading);
    });

    it('calls loginActiveSession before mounting', () => {
      sandbox.spy(AppContainerProps, 'loginActiveSession');
      wrapper = shallow(<AppContainer {...AppContainerProps} />);
      expect(AppContainerProps.loginActiveSession.calledOnce).to.equal(true);
    });

    it('calls setState and sets the new state when receiving new props only', () => {
      wrapper = shallow(<AppContainer {...AppContainerProps} />);
      sandbox.spy(Component.prototype, 'setState');
      wrapper.setProps({ appLoading: true });
      wrapper.setProps({ appLoading: true });
      expect(Component.prototype.setState.calledOnce).to.equal(true);
      wrapper.setProps({ appLoading: false });
      expect(Component.prototype.setState.calledTwice).to.equal(true);
      expect(wrapper.state('appLoading')).to.equal(false);
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
        const expectedProps = propsFactory('AppContainerProps', 'empty');
        delete expectedProps.loginActiveSession;
        const returnedProps = mapStateToProps(store);
        expect(returnedProps).to.deep.equal(expectedProps);
      });
    });

    describe('mapDispatchProps', () => {
      let returnedProps;
      beforeEach((done) => {
        sandbox.spy(storeFakeMethods, 'dispatch');
        returnedProps = mapDispatchToProps(storeFakeMethods.dispatch);
        done();
      });

      it('maps loginActiveSession to props', () => {
        expect(returnedProps.loginActiveSession).to.exist; // eslint-disable-line
        sandbox.stub(userAuth, 'loginActiveSession');
        returnedProps.loginActiveSession();
        expect(storeFakeMethods.dispatch.calledOnce).to.equal(true);
        expect(userAuth.loginActiveSession.calledOnce).to.equal(true);
        expect(storeFakeMethods.dispatch.calledWith(userAuth.loginActiveSession())).to.equal(true);
      });
    });
  });
});
