import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import App from '../../../../src/client/jsx/components/App';
import NavbarContainer from '../../../../src/client/jsx/containers/NavbarContainer';
import AppLoading from '../../../../src/client/jsx/components/AppLoading';

const AppProps = {
  appLoading: false,
  loginActiveSession: () => {},
};

describe('<App />', () => {
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
      wrapper = shallow(<App {...loadingProps} />);
      expect(wrapper.find(AppLoading)).to.have.length(1);
    });

    it('renders App component', () => {
      wrapper = shallow(<App {...AppProps} />);
      expect(wrapper.find('#app-root')).to.have.length(1);
    });

    it('renders Navbar component', () => {
      wrapper = shallow(<App {...AppProps} />);
      expect(wrapper.find(NavbarContainer)).to.have.length(1);
    });
  });
});
