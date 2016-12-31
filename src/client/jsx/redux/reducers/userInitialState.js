import { PropTypes } from 'react';

export default {
  id: NaN,
  username: '',
  email: '',
  loggedIn: false,
  roles: [],
};

export const userShape = {
  id: PropTypes.number,
  username: PropTypes.string,
  email: PropTypes.string,
  loggedIn: PropTypes.bool,
  roles: PropTypes.arrayOf(PropTypes.string),
};
