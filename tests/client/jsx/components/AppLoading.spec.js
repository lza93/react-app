import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import AppLoading from '../../../../src/client/jsx/components/AppLoading';

describe('<AppLoading /> Component', () => {
  let wrapper;
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('Rendering', () => {
    it('should render a div with id "about-page"', () => {
      wrapper = shallow(<AppLoading />);
      expect(wrapper.find('#app-loading')).to.have.length(1);
    });
  });
});

