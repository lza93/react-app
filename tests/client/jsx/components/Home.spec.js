import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import Home from '../../../../src/client/jsx/components/Home';
import InfoParagraph, { renderParagraphs } from '../../../../src/client/jsx/components/InfoParagraph';

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
    it('should render a div with id "home"', () => {
      wrapper = shallow(<Home />);
      expect(wrapper.find('#home')).to.have.length(1);
    });

    it('should render a div with id "home-info"', () => {
      wrapper = shallow(<Home />);
      expect(wrapper.find('#home-info')).to.have.length(1);
    });
  });
});
