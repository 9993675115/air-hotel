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
const getBookingById = async () => {
  try {
    const data = await Booking.findAll();
    return data;
  } catch (error) {
    console.error('Error retrieving users:', error);
    throw error;
  }
};

const updateBooking = async (bookingId, updatedData) => {
  try {
    const findData = await Booking.findOne({
      where: { bookingId: bookingId }
    });
    if (findData) {
      await Booking.update(updatedData, { where: { bookingId: bookingId } });
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error updating user by id:', error);
    throw error;
  }};

const deleteBooking = async (id) => {
  try {
    const deletedRowsCount = await Booking.destroy({
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
  // Add more service methods as needed
};
