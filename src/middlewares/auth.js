const passport = require('passport');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { roleRights } = require('../config/roles');
const logger = require('../config/logger');

const verifyCallback = (req, resolve, reject, requiredRights) => async (err, user, info) => {
  if (err || info || !user) {
    return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
  }
  req.user = user;

  if (requiredRights.length) {
    const userRights = roleRights.get(user.role);
    const hasRequiredRights = requiredRights.some((requiredRight) => userRights.includes(requiredRight));
    logger.info(user.role);
    logger.info(hasRequiredRights);
    if (!hasRequiredRights && req.params.userId !== user.id) {
      return reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));
    }
  }

  resolve();
};

const auth =
  (...requiredRights) =>
  async (req, res, next) => {
    return new Promise((resolve, reject) => {
      passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, requiredRights))(req, res, next);
    })
      .then(() => next())
      .catch((err) => next(err));
  };

module.exports = auth;

// const passport = require('passport');
// const httpStatus = require('http-status');
// const ApiError = require('../utils/ApiError');
// const { roleRights } = require('../config/roles');
// const logger = require('../config/logger');

// const verifyCallback = (req, resolve, reject, requiredRoles) => async (err, user, info) => {
//   if (err || info || !user) {
//     return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
//   }
//   req.user = user;

//   if (requiredRoles.length) {
//     const userRoles = roleRights.get(user.role);
//     const hasRequiredRoles = requiredRoles.some((requiredRole) => userRoles.includes(requiredRole));
//     logger.info(user.role);
//     logger.info(hasRequiredRoles);
//     if (!hasRequiredRoles && req.params.userId !== user.id) {
//       return reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));
//     }
//   }

//   resolve();
// };

// const auth =
//   (...requiredRoles) =>
//   async (req, res, next) => {
//     return new Promise((resolve, reject) => {
//       passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, requiredRoles))(req, res, next);
//     })
//       .then(() => next())
//       .catch((err) => next(err));
//   };

// module.exports = auth;

