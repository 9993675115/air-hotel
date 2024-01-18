const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const tokenService = require('./token.service');
const userService = require('./user.service');
const Token = require('../models/token');
const ApiError = require('../utils/ApiError');
const { tokenTypes } = require('../config/tokens');
const logger = require('../config/logger');

const loginUserWithEmailAndPassword = async (email, password) => {
  const userWithSecretFields = await userService.getUserWithSecretFields(email);
  const user = await userService.getUserByEmail(email);
  logger.info('message');
  if (!user || !(await bcrypt.compare(password, userWithSecretFields.password))) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Incorrect email or password');
  }
  return user;
};

const logout = async (refreshToken) => {
  const refreshTokenDoc = await Token.findOne({ token: refreshToken, type: tokenTypes.REFRESH, blacklisted: false });
  if (!refreshTokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
  }
  await refreshTokenDoc.remove();
};

const refreshAuth = async (refreshToken) => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(refreshToken, tokenTypes.REFRESH);
    const user = await userService.getUserById(refreshTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await refreshTokenDoc.remove();
    return tokenService.generateAuthTokens(user);
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
  }
};

module.exports = {
  loginUserWithEmailAndPassword,
  logout,
  refreshAuth
};
