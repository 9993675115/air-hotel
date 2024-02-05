const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const { User, Hotel} = require('../models');
const ApiError = require('../utils/ApiError');
const messages = require('../constant/message.json');
const logger = require('../config/logger');

const { Sequelize } = require('sequelize');

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
  try {
    const data = await User.findOne({
      where: { email: email, status: true}
    });
    return data;
  } catch (error) {
    console.error('Error retrieving user by email:', error);
    throw error;
  }
};
const getUserWithSecretFields = async (email) => {
  return User.scope('withSecretColumns').findOne({ where: { email } });
};
const getUserWithSecretFieldsById = async (id) => {
  try {
    const user = await User.scope('withSecretColumns').findOne({
      where: { id: id }
    });
    return user;
  } catch (error) {
    console.error('Error retrieving user with secret fields by id:', error);
    throw error;
  }
};

const getAllUser = async (query, options, search) => {
  try {
    if (search !== undefined && search !== null && search !== '') {
      // Ensure options is defined
      if (!options) {
        options = {};
      }

      const limit = options.limit ? Number(options.limit) : 10;
      const page = options.page ? Number(options.page) : 1;
      const offset = limit * (page - 1);

      // Ensure the search is a string
      const searchString = search ? search.toString() : '';

      // Define the where clause for search
      const whereClause = searchString ? {
        [Sequelize.Op.or]: {
          firstName: { [Sequelize.Op.iLike]: `%${searchString}%` },
          lastName: { [Sequelize.Op.iLike]: `%${searchString}%` },
          email: { [Sequelize.Op.iLike]: `%${searchString}%` },
          // Add more fields as needed
        }
      } : {};

      // Log relevant variables for the search case
      console.log('Search:', search);
      console.log('Where Clause:', whereClause);

      const data = await User.findAndCountAll({
        where: whereClause,
        order: [['updatedAt', 'DESC']],
        limit,
        offset,
      });

      console.log('Returned Data:', data);

      return data;
    } else {
      // Log relevant variables for the else case
      console.log('Search is empty or undefined.');

      const data = await User.findAndCountAll({
        where: { status: true },
        limit: 10, // Add a default limit for all users
        offset: 0, // Start from the beginning for all users
      });

      console.log('Returned All Users Data:', data);

      return data;
    }
  } catch (error) {
    console.error('Error getting users:', error);
    throw error;
  }
};

// const getUserBySearch = async (query, options) => {
//   try {
//     const limit = Number(options.limit);
//     const offset = options.page ? limit * (options.page - 1) : 0;

//     if (query && query.search) {
//       query.search = decodeURIComponent(query.search);
//       query.search = query.search.replace(/\"%/g, '').replace(/%\"/g, ''); // Remove extra quotes and percent signs.
//     }
//     if (query == null || options == null) {
//     const data = await User.findAndgetAllUser({
//       where: { status: true },
//       limit: limit,}); // Pass the query conditions as the first argument
//     return data;
//     }
//     else {
//       const data = await User.findAndgetAllUser({
//         where: { ...query, status: true },
//         limit: limit,
//         offset: offset
//       });
//       return data;
//     }
//   } catch (error) {
//     console.error('Error getting users:', error);
//     throw error;
//   }
// }

  const getUserById = async (id) => {
    try {
      const data = await User.findByPk(id,{
        where: { },
        include:[{model:Hotel}]
        
      });
      return data;
    } catch (error) {
      console.error('Error retrieving user by id:', error);
      return error;
    }
  };

  // const updateUserByID = async (id, updatedData)=>{
  //  const data = await User.update(updatedData, { where: { id } });
  // // return (id);
  // return data
  // };

  const updateUserByID = async (id, newData) => {
    try {
      const user = await User.findByPk(id);
  
      if (user) {
        await user.update(newData);
        return user;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
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
  // updateUserById,
  getAllUser,
  getUserById,
  updateUserByID,
  deleteUser,
  // getUserBySearch
};
