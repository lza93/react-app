import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import InfoParagraph from '../../../../src/client/jsx/components/InfoParagraph';
import propsFactory from '../../../helpers/propsFactory';

describe('<InfoParagraph /> Component', () => {
  let sandbox;
  let wrapper;

  const props = propsFactory('InfoParagraphProps', 'filled');

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

    it('should render appropriate content"', () => {
      wrapper = shallow(<InfoParagraph {...props} />);
      expect(wrapper.find('p.paragraph-info').children().node).to.equal(props.content);
    });
  });
});
