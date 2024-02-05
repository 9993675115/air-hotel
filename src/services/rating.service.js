const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');

const ApiError = require('../utils/ApiError');
const messages = require('../constant/message.json');
const logger = require('../config/logger');
const { Rating } = require('../models');
const { Sequelize, Op, DataTypes } = require('sequelize');


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

const getAllRating = async (query, options) => {
  try {
    if (isNaN(query)) {
      const limit = Number(options.limit);
      const offset = options.page ? limit * (options.page - 1) : 0;

      // Ensure the query is a string
      const searchString = query ? query.toString() : '';

      // Define the where clause for search
      const whereClause = searchString ? {
        [Sequelize.Op.or]: {
          review: { [Sequelize.Op.iLike]: `%${searchString}%` },
          // address: { [Sequelize.Op.iLike]: `%${searchString}%` },
         
          // Add more fields as needed
        }
      } : {};

      const data = await Rating.findAndCountAll({
        where: whereClause,
        order: [['updatedAt', 'DESC']],
        limit,
        offset,
      });

      return data;
    } else {
      const limit = Number(options.limit);
      const offset = options.page ? limit * (options.page - 1) : 0;

      // Ensure the query is a string
      const searchString = query ? query.toString() : '';

      // Define the where clause for search
      const whereClause = searchString ? {
        [Sequelize.Op.or]: {
          userId:  { [Op.eq]: searchString },
          // totalRoom: { [Op.eq]: searchString },
          // roomQuantity: { [Op.eq]: searchString },
          bookingId: { [Op.eq]: searchString },
          // roomId: { [Op.eq]: searchString },
          // Add more fields as needed
          // checkOutDate: {
          //   [Sequelize.Op.between]: [
          //     new Date(new Date(searchString).setUTCHours(0, 0, 0, 0)), // Start of the day
          //     new Date(new Date(searchString).setUTCHours(23, 59, 59, 999)) // End of the day
          //   ]
          // },
        }
      } : {};

      const data = await Rating.findAndCountAll({
        where: whereClause,
        order: [['updatedAt', 'DESC']],
        limit,
        offset,
      });

      return data;
    }
  } catch (error) {
    console.error('Error getting all bookings:', error);
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
