const SIGNUP_ERROR = {
  id: 'signupError',
  message: 'There was an error signing up',
};

const LOGIN_ERROR = {
  id: 'loginError',
  message: 'There was an error logging in',
};

const EMAIL_SYNTAX = {
  id: 'emailSyntax',
  message: 'the email field should contain a valid email address',
};

const USERNAME_SYNTAX = {
  id: 'usernameSyntax',
  message: 'the username may only consist of alphanumeric characters between 6 and 20 characters long',
};

const PASSWORD_SYNTAX = {
  id: 'passwordError',
  message: 'the password should contain at least one upper-case, and one lower-case letter, contain at least one special character and be at least 8 characters long',
};

const PASSWORD_CONFIRMATION_ERROR = {
  id: 'passwordConfirmationError',
  message: 'the password confirmation should match the password',
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
  USERNAME_SYNTAX,
  PASSWORD_SYNTAX,
  PASSWORD_CONFIRMATION_ERROR,
  noDuplicateIds,
  addError,
  removeError,
};
