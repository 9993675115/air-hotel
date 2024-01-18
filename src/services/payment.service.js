const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');

const ApiError = require('../utils/ApiError');
const messages = require('../constant/message.json');
const logger = require('../config/logger');
const { Payment } = require('../models');

const createPayment = async (_userBody) => {
  const userBody = _userBody;
  console.log("-----------",userBody)
  return Booking.create(userBody);
};
const getPaymentById = async (paymentId) => {
  try {
    const data = await paymentId.findAll();
    return data;
  } catch (error) {
    console.error('Error retrieving users:', error);
    throw error;
  }
};

const updatePayment = async (paymentId, updatedData) => {
  try {
    const findData = await User.findOne({
      where: { paymentId: paymentId }
    });
    if (findData) {
      await Payment.update(updatedData, { where: { paymentId: paymentId } });
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error updating user by id:', error);
    throw error;
  }
};

const deletePayment = async (paymentId) => {
  try {
    const deletedRowsCount = await Booking.destroy({
      where: { paymentId: paymentId }
    });
    return deletedRowsCount;
  } catch (error) {
    console.error('Error deleting user by id:', error);
    throw error;
  }
};

module.exports = {
  createPayment,
  getPaymentById,
  updatePayment,
  deletePayment,
  // Add more service methods as needed
};
