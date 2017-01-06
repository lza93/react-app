import React, { Component, PropTypes } from 'react';
import deepEqual from 'deep-equal';

export const ErrorMessage = ({ message, classNamesString }) => {
  classNamesString = classNamesString || 'text-danger';
  return (
    <p className={classNamesString}>
      {message}
    </p>
  );
};

ErrorMessage.propTypes = {
  message: PropTypes.string,
  classNamesString: PropTypes.string,
};

export default class ErrorContainer extends Component {
  constructor(props) {
    super(props);
    if (this.props.errors) {
      this.state = {
        errors: [
          ...props.errors,
        ],
      };
    } else {
      this.state = {
        errors: [],
      };
    }
  }

  componentWillReceiveProps(newProps) {
    if (deepEqual(this.state.errors, newProps.errors)) { return; }
    this.setState({
      errors: newProps.errors,
    });
  }

  haveErrors() {
    return this.state.errors.length > 0;
  }

  renderErrors() {
    return this.state.errors.map((err, i) => (
      <ErrorMessage key={i} message={err.message} classNamesString={err.classNamesString} />
    ));
  }

  render() {
    return (
      <div id="errors-div">
        { this.haveErrors() ? this.renderErrors() : null }
      </div>
    );
  }
}

export const errorsShape = {
  id: PropTypes.string,
  message: PropTypes.string,
};

ErrorContainer.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.shape(errorsShape)),
};
