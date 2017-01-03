import React, { Component } from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import { AppContainer } from '../../../../src/client/jsx/containers/AppContainer';
import NavbarContainer from '../../../../src/client/jsx/containers/NavbarContainer';
import AppLoading from '../../../../src/client/jsx/components/AppLoading';
import propsFactory from '../../../helpers/propsFactory';


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
      expect(wrapper.find(NavbarContainer)).to.have.length(1);
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
});
