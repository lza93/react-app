import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import InfoParagraph from '../../../../src/client/jsx/components/InfoParagraph';

describe('<InfoParagraph /> Component', () => {
  let sandbox;
  let wrapper;

  const props = {
    content: 'this is some paragraph content',
    horizontalInfoStyle: { border: '1px solid red' },
    paragraphInfoStyle: { border: '2px solid blue' },
  };

  beforeEach((done) => {
    sandbox = sinon.sandbox.create();
    done();
  });

  afterEach((done) => {
    sandbox.restore();
    done();
  });

  describe('Rendering', () => {
    it('should render a div with a class of "paragraph-info"', () => {
      wrapper = shallow(<InfoParagraph {...props} />);
      expect(wrapper.find('div.paragraph-info')).to.have.length(1);
    });
  });
});
