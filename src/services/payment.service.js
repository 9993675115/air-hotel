const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');

const ApiError = require('../utils/ApiError');
const messages = require('../constant/message.json');
const logger = require('../config/logger');
const { Payment } = require('../models');

const createPayment = async (_userBody) => {
  const userBody = _userBody;
  console.log("-----------",userBody)
  return Payment.create(userBody);
};
const getAllPayment = async () => {
  try {
    const data = await Payment.findAll();
    return data;
  } catch (error) {
    console.error('Error retrieving users:', error);
    throw error;
  }
};
const getPaymentById = async (paymentId) => {
  try {
    const data = await Payment.findByPk(paymentId);
    return data;
  } catch (error) {
    console.error('Error retrieving users:', error);
    throw error;
  }
}

const updatePayment = async (paymentId, updatedData) => {
  try {
    // Assuming Payment is your Sequelize model
    const [rowsUpdated, [updatedPayment]] = await Payment.update(updatedData, {
      where: { paymentId },
      returning: true, // This makes sure that the updated record is returned
    });

    if (rowsUpdated > 0) {
      return updatedPayment;
    } else {
      // Handle the case when no rows are updated
      throw new Error('Payment not found');
    }
  } catch (error) {
    // Handle other errors, e.g., database errors
    console.error('Error updating payment:', error);
    throw error;
  }
};


const deletePayment = async (paymentId) => {
  try {
    const deletedRowsCount = await Payment.update({status:false},{
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
  getAllPayment,
  updatePayment,
  deletePayment,
  getPaymentById
  // Add more service methods as needed
};
