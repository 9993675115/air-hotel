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
    const rating = await Rating.findByPk(ratingId);

    if (!rating) {
      throw new Error('Rating not found');
    }

    return rating;
  } catch (error) {
    console.error('Error fetching rating by ID:', error);
    throw error;
  }
};

const updateRating = async (ratingId, updateData) => {
  try {
    const rating = await Rating.findByPk(ratingId);

    if (!rating) {
      throw new Error('Rating not found');
    }

    // Update the rating with the provided data
    await rating.update(updateData);

    // Return the updated rating
    return rating;
  } catch (error) {
    console.error('Error updating rating by ID:', error);
    throw error;
  }
};

const getAllRating = async (userId) => {
  try {
    const ratings = await Rating.findAll({status:true},{
      where: { userId },
    });

    return ratings;
  } catch (error) {
    console.error('Error getting ratings by user ID:', error);
    throw error;
  }
};


const deleteRating = async (ratingId) => {
  try {
    const deletedRowCount = await Rating.update({status:false},{
      where: { id: ratingId },
    });

    return deletedRowCount;
  } catch (error) {
    console.error('Error deleting rating by ID:', error);
    throw error;
  }
};


module.exports = {
  createRating,
  getRatingById,
  updateRating,
  deleteRating,
  getAllRating
};
