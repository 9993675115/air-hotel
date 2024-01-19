const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');

const ApiError = require('../utils/ApiError');
const messages = require('../constant/message.json');
const logger = require('../config/logger');
const { Rating } = require('../models');

const createRating = async (_userBody) => {
  const userBody = _userBody;
  console.log("-----------",userBody)
  return Rating.create(userBody);
};
const getRatingById = async () => {
  try {
    const data = await Rating.findAll();
    return data;
  } catch (error) {
    console.error('Error retrieving users:', error);
    throw error;
  }
};

const updateRating = async (ratingId, updatedData) => {
  try {
    const findData = await Rating.findOne({
      where: { ratingId: ratingId }
    });
    if (findData) {
      await Rating.update(updatedData, { where: { ratingId: ratingId } });
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error updating user by id:', error);
    throw error;
  }
};

const deleteRating = async (ratingId) => {
  try {
    const deletedRowsCount = await Rating.destroy({
      where: { ratingId: ratingId }
    });
    return deletedRowsCount;
  } catch (error) {
    console.error('Error deleting user by id:', error);
    throw error;
  }
};


module.exports = {
  createRating,
  getRatingById,
  updateRating,
  deleteRating,
  // Add more service methods as needed
};
