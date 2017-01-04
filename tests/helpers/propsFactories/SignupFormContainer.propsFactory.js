import storeFake from '../storeFake';
import emptyPromise from '../emptyPromise';
import { router } from './ReactRouterMock.propsFactory';

const user = storeFake('user');
const filledUser = Object.assign({}, user, {
  email: 'bobloblaw@law.blog',
  id: 1,
  loggedIn: true,
  roles: ['admin'],
  username: 'bobloblaw',
});

export default {
  empty: {
    user,
    signupUser: emptyPromise,
    router,
  },
  filled: {
    user: filledUser,
    signupUser: emptyPromise,
    router,
  },
};
