const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');

const ApiError = require('../utils/ApiError');
const messages = require('../constant/message.json');
const logger = require('../config/logger');
const { Booking } = require('../models');
const { Sequelize, Op, DataTypes } = require('sequelize');

const createBooking = async (_userBody) => {
  const userBody = _userBody;
  console.log("-----------",userBody)
  return Booking.create(userBody);
};
const getBookingById = async (bookingId) => {
  try {
    const data = await Booking.findByPk(bookingId);
    return data;
  } catch (error) {
    console.error('Error retrieving users:', error);
    throw error;
  }
};
const getAllBooking = async (query, options) => {
  const isValidDate = (date) => {
    return date instanceof Date && !isNaN(date);
  };
  try {
    if (isNaN(query)) {
      const limit = Number(options.limit);
      const offset = options.page ? limit * (options.page - 1) : 0;

      // Ensure the query is a string
      const searchString = query ? query.toString() : '';

      // Define the where clause for search
      const whereClause = searchString ? {
        [Sequelize.Op.or]: {
          name: { [Sequelize.Op.iLike]: `%${searchString}%` },
          address: { [Sequelize.Op.iLike]: `%${searchString}%` },
          checkInDate: {
            [Sequelize.Op.between]: [
              isValidDate(new Date(searchString)) ? new Date(searchString) : new Date(),
              isValidDate(new Date(searchString)) ? new Date(searchString) : new Date()
            ]
          },
          checkOutDate: {
            [Sequelize.Op.between]: [
              isValidDate(new Date(searchString)) ? new Date(searchString) : new Date(),
              isValidDate(new Date(searchString)) ? new Date(searchString) : new Date()
            ]
          },
          // Add more fields as needed
        }
      } : {};

      const data = await Booking.findAndCountAll({
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
          price:  { [Op.eq]: searchString },
          totalRoom: { [Op.eq]: searchString },
          roomQuantity: { [Op.eq]: searchString },
          userId: { [Op.eq]: searchString },
          roomId: { [Op.eq]: searchString },
          // Add more fields as needed
          // checkOutDate: {
          //   [Sequelize.Op.between]: [
          //     new Date(new Date(searchString).setUTCHours(0, 0, 0, 0)), // Start of the day
          //     new Date(new Date(searchString).setUTCHours(23, 59, 59, 999)) // End of the day
          //   ]
          // },
        }
      } : {};

      const data = await Booking.findAndCountAll({
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


const updateBooking = async (bookingId, updatedData) => {
  // Correct the column name to "id"
  const booking = await Booking.update(updatedData, { where: { id: bookingId } });
  return booking;
};


const deleteBooking = async (id) => {
  try {
    const deletedRowsCount = await Booking.update({status:false},{
      where: { id }
    });
    return deletedRowsCount;
  } catch (error) {
    console.error('Error deleting user by id:', error);
    throw error;
  }
};


module.exports = {
  createBooking,
  getBookingById,
  updateBooking,
  deleteBooking,
  getAllBooking
  // Add more service methods as needed
};
