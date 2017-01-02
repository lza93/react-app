export default {
  empty: {
    message: '',
    classNamesString: '',
  },
  filled: {
    message: 'This is test error message #1',
    classNamesString: 'test-class-name-1 test-class-name-2',
  },
};

export function errorMessageGenerator(id, message) {
  return {
    id,
    message,
  };
}

export function errorsGenerator(number) {
  const errorArray = [];
  for (let i = 0; i < number; i++) {
    errorArray.push(errorMessageGenerator(`error#${i + 1}`, `generated error #${i + 1}`));
  }
  return errorArray;
}
