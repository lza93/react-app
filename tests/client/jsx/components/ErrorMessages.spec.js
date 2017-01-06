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

  describe('Rendering', () => {
    it('renders a div with id "errors-div"', () => {
      wrapper = shallow(<ErrorContainer {...props} />);
      expect(wrapper.find('#errors-div')).to.have.length(1);
    });

    it('renders 0 ErrorMessage components when no errors are passed', () => {
      wrapper = shallow(<ErrorContainer />);
      expect(wrapper.find('ErrorMessage')).to.have.length(0);
    });

    it('renders correct number o ErrorMessage components', () => {
      wrapper = shallow(<ErrorContainer {...props} />);
      expect(wrapper.find('ErrorMessage')).to.have.length(3);
    });
  });

  describe('Lifecyle Tests', () => {
    beforeEach((done) => {
      sandbox = sinon.sandbox.create();
      done();
    });
    afterEach((done) => {
      sandbox.restore();
      done();
    });

    it('updates the state with the new props', () => {
      wrapper = shallow(<ErrorContainer {...props} />);
      sandbox.spy(wrapper.instance(), 'setState');
      const newProps = Object.assign({}, props);
      newProps.errors = props.errors.slice()
      newProps.errors.push({ id: 'error#4', message: 'changed error4' });
      wrapper.setProps(newProps);
      expect(wrapper.instance().setState.called).to.equal(true);
      expect(wrapper.state().errors).to.equal(newProps.errors);
    });

    it('doesn\'t update if the props are the same', () => {
      wrapper = shallow(<ErrorContainer {...props} />);
      sandbox.spy(wrapper.instance(), 'setState');
      const newProps = Object.assign({}, props);
      wrapper.setProps(newProps);
      expect(wrapper.instance().setState.called).to.equal(false);
    });
  });
});

describe('<ErrorMessage /> Component', () => {
  let wrapper;
  const props = { message: 'test error message', classNamesString: 'className1 className2' };

  describe('Rendering', () => {
    it('renders a paragraph with appropriate message"', () => {
      wrapper = shallow(<ErrorMessage {...props} />);
      expect(wrapper.find('p')).to.have.length(1);
      expect(wrapper.text()).to.equal(props.message);
    });

    it('sets the class name to "text-danger" if no classNamesString is passed', () => {
      wrapper = shallow(<ErrorMessage message={props.message} />);
      expect(wrapper.hasClass('text-danger')).to.equal(true);
    });

    it('sets the class names appropriately', () => {
      wrapper = shallow(<ErrorMessage {...props} />);
      expect(wrapper.hasClass('className1')).to.equal(true);
      expect(wrapper.hasClass('className2')).to.equal(true);
    });
  });
});
