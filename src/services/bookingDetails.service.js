const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');

const ApiError = require('../utils/ApiError');
const messages = require('../constant/message.json');
const logger = require('../config/logger');
const { BookingDetails } = require('../models');

const createBookingDetails = async (_userBody) => {
  const userBody = _userBody;
  console.log("-----------",userBody)
  return BookingDetails.create(userBody);
};
const getBookingDetailById = async (bookingDetailId) => {
  try {
    const data = await bookingDetailId.findAll();
    return data;
  } catch (error) {
    console.error('Error retrieving users:', error);
    throw error;
  }
};

const updateBookingDetail = async (bookingDetailId, updatedData) => {
  try {
    const findData = await User.findOne({
      where: { bookingDetailId: bookingDetailId }
    });
    if (findData) {
      await Booking.update(updatedData, { where: { bookingDetailId: bookingDetailId } });
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error updating user by id:', error);
    throw error;
  }
};

const deleteBookingDetail = async (BookingDetail) => {
  try {
    const deletedRowsCount = await BookingDetail.destroy({
      where: { bookingDetailId: BookingDetail }
    });
    return deletedRowsCount;
  } catch (error) {
    console.error('Error deleting user by id:', error);
    throw error;
  }
};

module.exports = {
  createBookingDetails,
  getBookingDetailById,
  updateBookingDetail,
  deleteBookingDetail,
  // Add more service methods as needed
};
