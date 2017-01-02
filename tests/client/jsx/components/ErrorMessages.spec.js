import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import ErrorContainer, { ErrorMessage } from '../../../../src/client/jsx/components/ErrorMessages';
import propsFactory from '../../../helpers/propsFactory';

describe('<ErrorContainer /> Component', () => {
  let wrapper;
  let sandbox;
  const props = propsFactory('ErrorMessagesProps', 'filled');

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('Rendering', () => {
    it('should render a div with id "errors-div"', () => {
      wrapper = shallow(<ErrorContainer {...props} />);
      expect(wrapper.find('#errors-div')).to.have.length(1);
    });

    it('should render 0 ErrorMessage components when no errors are passed', () => {
      wrapper = shallow(<ErrorContainer />);
      expect(wrapper.find('ErrorMessage')).to.have.length(0);
    });

    it('should render correct number o ErrorMessage components', () => {
      wrapper = shallow(<ErrorContainer {...props} />);
      expect(wrapper.find('ErrorMessage')).to.have.length(3);
    });
  });
});
