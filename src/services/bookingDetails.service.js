const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');

const ApiError = require('../utils/ApiError');
const messages = require('../constant/message.json');
const logger = require('../config/logger');
const { BookingDetails } = require('../models');
const { Sequelize, Op, DataTypes } = require('sequelize');

const createBookingDetails = async (_userBody) => {
  const userBody = _userBody;
  console.log("-----------",userBody)
  return BookingDetails.create(userBody);
};
const getBookingDetailById = async (id) => {
  try {
    const bookingDetail = await BookingDetails.findByPk(id);

    if (!bookingDetail) {
      // Handle the case where the booking detail is not found
      return null;
    }

    return bookingDetail;
  } catch (error) {
    console.error('Error fetching booking detail by ID:', error);
    throw error;
  }
};
const getAllBookingDetails = async (query, options) => {
  try {
    if (isNaN(query)) {
      const limit = Number(options.limit);
      const offset = options.page ? limit * (options.page - 1) : 0;

      // Ensure the query is a string
      const searchString = query ? query.toString() : '';

      // Define the where clause for search
      const whereClause = searchString ? {
        [Sequelize.Op.or]: {
          paymentType: { [Sequelize.Op.iLike]: `%${searchString}%` },
          // address: { [Sequelize.Op.iLike]: `%${searchString}%` },
         
          // Add more fields as needed
        }
      } : {};

      const data = await BookingDetails.findAndCountAll({
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
          bookingId:  { [Op.eq]: searchString },
          // totalRoom: { [Op.eq]: searchString },
          // roomQuantity: { [Op.eq]: searchString },
          amount: { [Op.eq]: searchString },
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

      const data = await BookingDetails.findAndCountAll({
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

const updateBookingDetail = async (bookingDetailId, updatedData) => {
  try {
    const bookingDetail = await BookingDetails.findByPk(bookingDetailId);

    if (!bookingDetail) {
      // Handle the case where the booking detail is not found
      return null;
    }

    // Update the fields based on the provided `updatedData`
    const updatedBookingDetail = await bookingDetail.update(updatedData);

    return updatedBookingDetail;
  } catch (error) {
    console.error('Error updating booking detail by id:', error);
    throw error;
  }
};


const deleteBookingDetail = async (bookingDetailId) => {
  try {
    if (!bookingDetailId) {
      throw new Error('Booking detail ID is required for deletion.');
    }

    const deletedRowsCount = await BookingDetails.update(
      { status: false },
      {
        where: { id: bookingDetailId }, // Assuming the primary key is named 'id'
      }
    );
    return deletedRowsCount;
  } catch (error) {
    console.error('Error deleting booking detail by id:', error);
    throw error;
  }
};


module.exports = {
  createBookingDetails,
  getBookingDetailById,
  updateBookingDetail,
  deleteBookingDetail,
  getAllBookingDetails
  // Add more service methods as needed
};
