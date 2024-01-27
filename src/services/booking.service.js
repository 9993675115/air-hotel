const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');

const ApiError = require('../utils/ApiError');
const messages = require('../constant/message.json');
const logger = require('../config/logger');
const { Booking } = require('../models');

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
const getAllBooking = async () => {
  try {
    const bookings = await Booking.findAll();
    return bookings;
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
