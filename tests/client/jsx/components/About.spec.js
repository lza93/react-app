import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import About from '../../../../src/client/jsx/components/About';

describe('<About /> Component', () => {
  let wrapper;
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('Rendering', () => {
    it('should render an element with id "about-page"', () => {
      wrapper = shallow(<About />);
      expect(wrapper.find('#about-page')).to.have.length(1);
    });
  });
});
