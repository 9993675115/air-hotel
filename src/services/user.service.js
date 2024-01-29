const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const { User} = require('../models');
const ApiError = require('../utils/ApiError');
const messages = require('../constant/message.json');
const logger = require('../config/logger');

const getExistingEmais = async (email) => {
  logger.info(email);
  return User.findOne({ where: { email, status: true } });
};

const createUser = async (_userBody) => {
  console.log("pppppppppppppppppppp",_userBody)
  const userBody = _userBody;
  if (await getExistingEmais(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, messages.EMAIL_ALREADY_EXISTS);
  }
  userBody.password = await bcrypt.hash(userBody.password, 8);
  return User.create(userBody);
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
    //  include:  Booking 
  });
};


  const getUserById = async (userId) => {
    try {
      const user = await User.findByPk(userId);
  
      if (!user) {
        console.log('User not found for id', userId);
        return null; // or handle the case accordingly
      }
  
      console.log('User found:', user);
      return user;
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      throw new Error('Error fetching user by ID');
    }
  };

  const updateUserByID = async (id, updatedData)=>{
   const data = await User.update(updatedData, { where: { id } });
  // return (id);
  return data
  };
  const deleteUser = async (id) => {
    try {
      const deletedRowsCount = await User.update({status:false},{
        where: { id }
      });
      return deletedRowsCount;
    } catch (error) {
      console.error('Error deleting user by id:', error);
      throw error;
    }
  };

module.exports = {
  createUser,
  getUserByEmail,
  getUserWithSecretFields,
  getUserWithSecretFieldsById,
  updateUserById,
  getAllUser,
  getUserById,
  updateUserByID,
  deleteUser
};
