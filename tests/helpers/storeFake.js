const storeState = {
  loading: {
    appLoading: false,
  },
  user: {
    email: '',
    id: NaN,
    loggedIn: false,
    roles: [],
    username: '',
  },
};

export default (slice, objectProperties) => {
  if (!slice) return Object.freeze(Object.assign({}, storeState, objectProperties));
  if (!Object.keys(storeState).includes(slice)) throw new Error('that slice of store doesn\'t exist');
  const newObject = Object.assign({}, storeState[slice], objectProperties);
  return Object.freeze(newObject);
};

export const dispatch = () => {};
