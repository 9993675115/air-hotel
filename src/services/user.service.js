const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const { User, Shop, ShopParam, ApplicationLanguage, Booking } = require('../models');
const ApiError = require('../utils/ApiError');
const messages = require('../constant/message.json');
const logger = require('../config/logger');

const getExistingEmais = async (email) => {
  logger.info(email);
  return User.findOne({ where: { email, status: true } });
};

const createUser = async (_userBody) => {
  const userBody = _userBody;
  console.log("ppppppppppppppppppppppppppppp",userBody)
  if (await getExistingEmais(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, messages.EMAIL_ALREADY_EXISTS);
  }
  userBody.password = await bcrypt.hash(userBody.password, 8);
  return User.create(userBody);
};

const getUserById = async (id) => {
  return User.findOne({
    where: {
      id,
      status: true
    }
  });
};

const getUserByEmail = async (email) => {
  return User.findOne({
    where: { email, status: true }
  });
};
const getUserWithSecretFields = async (email) => {
  return User.scope('withSecretColumns').findOne({ where: { email } });
};
const getUserWithSecretFieldsById = async (id) => {
  return User.scope('withSecretColumns').findOne({ where: { id } });
};
const updateUserById = async (req) => {
  const parsedSett =JSON.parse(req.body.settings)
  const userId = req.user?.dataValues.id? req.user.dataValues.id:1;
  return User.update( { settings: parsedSett },
  { where: { id: userId } });
};
const getAllUser = async () => {
  return User.findAll({
    where: {  status: true },
     include:  Booking 
  });
};

module.exports = {
  createUser,
  getUserById,
  getUserByEmail,
  getUserWithSecretFields,
  getUserWithSecretFieldsById,
  updateUserById,
  getAllUser
};
