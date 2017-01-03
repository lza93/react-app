import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import { AppContainer } from '../../../../src/client/jsx/containers/AppContainer';

import NavbarContainer from '../../../../src/client/jsx/containers/NavbarContainer';
import AppLoading from '../../../../src/client/jsx/components/AppLoading';
import propsFactory from '../../../helpers/propsFactory';

const AppProps = propsFactory('AppProps', 'empty');

describe('<AppContainer />', () => {
  let wrapper;
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('Rendering', () => {
    it('initially renders AppLoading component', () => {
      const loadingProps = Object.assign({}, AppProps, { appLoading: true });
      wrapper = shallow(<AppContainer {...loadingProps} />);
      expect(wrapper.find(AppLoading)).to.have.length(1);
      expect(wrapper.find('#app-root')).to.have.length(0);
    });

    it('renders App component', () => {
      wrapper = shallow(<AppContainer {...AppProps} />);
      expect(wrapper.find('#app-root')).to.have.length(1);
      expect(wrapper.find(AppLoading)).to.have.length(0);
    });

    it('renders Navbar component', () => {
      wrapper = shallow(<AppContainer {...AppProps} />);
      expect(wrapper.find(NavbarContainer)).to.have.length(1);
    });

    it('renders children passed in component', () => {
      wrapper = shallow(
        <AppContainer {...AppProps} >
          <div className="app-child" id="app-child-1" />
          <div className="app-child" id="app-child-2" />
        </AppContainer>);
      expect(wrapper.find('#app-child-1')).to.have.length(1);
      expect(wrapper.find('#app-child-2')).to.have.length(1);
      expect(wrapper.find('.app-child')).to.have.length(2);
    });
  });
});
