import { errorsGenerator } from './ErrorMessage.propsFactory';

export default {
  empty: {
    errors: [],
  },
  filled: {
    errors: errorsGenerator(3),
  },
};
