const SIGNUP_ERROR = {
  id: 'signupError',
  message: 'There was an error signing up',
};

const LOGIN_ERROR = {
  id: 'loginError',
  message: 'There was an error signing up',
};

const EMAIL_SYNTAX = {
  id: 'emailSyntax',
  message: 'the email field should contain a valid email address',
};

function noDuplicateIds(arrayToCheck, objectToAdd) {
  return !arrayToCheck.some(objectInArray => objectInArray.id === objectToAdd.id);
}

function addError(contextThis, errorToAdd) {
  if (noDuplicateIds(contextThis.state.errors, errorToAdd)) {
    const newStateErrors = [...contextThis.state.errors, errorToAdd];
    contextThis.setState({
      errors: newStateErrors,
    });
  }
}

function removeError(contextThis, errorToRemove) {
  const indexOfError = contextThis.state.errors.findIndex(
    errorInState => errorInState.id === errorToRemove.id // eslint-disable-line
  );
  if (indexOfError === -1) { return; }
  const newStateErrors = [
    ...contextThis.state.errors.slice(0, indexOfError),
    ...contextThis.state.errors.slice(indexOfError + 1),
  ];
  contextThis.setState({
    errors: newStateErrors,
  });
}

export default {
  SIGNUP_ERROR,
  LOGIN_ERROR,
  EMAIL_SYNTAX,
  noDuplicateIds,
  addError,
  removeError,
};
