import storeFake from './storeFake';

const utilityObjects = {
  loginInfo: {
    email: 'bobloblaw@law.blog',
    password: 'Password1!',
  },
  signupInfo: {
    username: 'bobloblaw',
    email: 'bobloblaw@law.blog',
    password: 'Password1!',
    passwordConfirmation: 'Password1!',
  },
  setUser: Object.assign({}, storeFake('user'), {
    username: 'bobloblaw',
    email: 'bobloblaw@law.blog',
    id: 1,
    loggedIn: true,
    roles: [],
  }),
};

export default (state, objectProperties) => {
  if (Object.keys(utilityObjects).includes(state)) {
    const newObject = Object.assign({}, utilityObjects[state], objectProperties);
    return Object.freeze(newObject);
  }
  return storeFake(state, objectProperties);
};
