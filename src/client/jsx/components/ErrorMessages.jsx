import React, { Component } from 'react';

const ErrorMessage = ({ message, classNamesString }) => {
  classNamesString = classNamesString || 'text-danger';
  return (
    <p className={classNamesString}>
      {message}
    </p>
  );
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
    };
  }

  componentWillReceiveProps(newProps) {
    if (this.state.errors === newProps.errors) { return }
    this.setState({
      errors: newProps.errors,
    })
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
    )
  }
}

