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
const getAllBookingDetails = async () => {
  try {
    const bookingDetails = await BookingDetails.findAll();
    return bookingDetails;
  } catch (error) {
    console.error('Error getting all booking details:', error);
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

    const deletedRowsCount = await BookingDetails.update({status:false},{
      where: { id: bookingDetailId }
    });

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
