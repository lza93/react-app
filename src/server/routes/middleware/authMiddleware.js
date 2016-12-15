const whitelist = require('../utils/whitelist');
const User = require('../../models/db').models.user;
const Role = require('../../models/db').models.role;
const errorMaker = require('../utils/errorMaker');

module.exports = {
  setUser(req, res, next) {
    if (req.session.userId) {
      User.findOne(
        {
          where: { id: req.session.userId },
          include: Role,
        })
        .then((user) => {
          if (!user) {
            req.user = null;
            next();
            return;
          }
          req.user = whitelist(user, ['id', 'username', 'email']);
          req.user.roles = user.roles.map(role => role.role);
          next();
          return;
        })
        .catch(next);
    } else {
      next();
    }
  },
  isLoggedIn(req, res, next) {
    if (!req.user) {
      throw errorMaker('Not logged in', 401);
    } else {
      next();
    }
  },
  hasRole(role) {
    return function (req, res, next) {
      if (!req.user) {
        throw errorMaker('Not logged in', 401);
      } else if (!req.user.roles.includes(role)) {
        throw errorMaker('Not authorized', 401);
      } else {
        next();
      }
    };
  },
};
