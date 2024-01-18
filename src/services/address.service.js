// const { Address } = require('../models');
const {Address} = require('../models')
const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');

 const ApiError = require('../utils/ApiError');
 const messages = require('../constant/message.json');
 const logger = require('../config/logger');

const createAddress = async (_userBody) => {
  const userBody = _userBody;
  console.log("-----------",userBody)
  return Address.create(userBody);
};

const getAddressById = async () => {
    try {
      const data = await Address.findAll();
      return data;
    } catch (error) {
      console.error('Error retrieving users:', error);
      throw error;
    }
  };

  
  const updateAddress = async (addressId, updatedData) => {
    try {
      const findData = await User.findOne({
        where: { addressId: addressId }
      });
      if (findData) {
        await Address.update(updatedData, { where: { addressId: addressId } });
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error updating user by id:', error);
      throw error;
    }
  };
  
  const deleteAddress = async (addressId) => {
    try {
      const deletedRowsCount = await Address.destroy({
        where: { addressId: addressId }
      });
      return deletedRowsCount;
    } catch (error) {
      console.error('Error deleting user by id:', error);
      throw error;
    }
  };
module.exports = {
  createAddress,
  getAddressById,
  updateAddress,
  deleteAddress,
  // Add more service methods as needed
};
