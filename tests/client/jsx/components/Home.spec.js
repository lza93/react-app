import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import Home from '../../../../src/client/jsx/components/Home';
import * as paragraphHelper from '../../../../src/client/jsx/components/InfoParagraph';

describe('<Home /> Component', () => {
  let wrapper;
  let sandbox;

  beforeEach((done) => {
    sandbox = sinon.sandbox.create();
    done();
  });

  afterEach((done) => {
    sandbox.restore();
    done();
  });

  describe('Rendering', () => {
    it('renders a div with id "home"', () => {
      wrapper = shallow(<Home />);
      expect(wrapper.find('#home')).to.have.length(1);
    });

    it('renders a div with id "home-info"', () => {
      wrapper = shallow(<Home />);
      expect(wrapper.find('#home-info')).to.have.length(1);
    });

    it('calls renderParagraphs', () => {
      sandbox.spy(paragraphHelper, 'renderParagraphs');
      wrapper = shallow(<Home />);
      expect(paragraphHelper.renderParagraphs.calledOnce).to.equal(true);
    });
  });
});
