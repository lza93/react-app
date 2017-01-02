import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import About from '../../../../src/client/jsx/components/About';
import * as paragraphHelper from '../../../../src/client/jsx/components/InfoParagraph';

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
    it('renders an element with id "about-page"', () => {
      wrapper = shallow(<About />);
      expect(wrapper.find('#about-page')).to.have.length(1);
    });

    it('calls renderParagraphs', () => {
      sandbox.spy(paragraphHelper, 'renderParagraphs');
      wrapper = shallow(<About />);
      expect(paragraphHelper.renderParagraphs.calledOnce).to.equal(true);
    });
  });
});
