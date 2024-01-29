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
  await Payment.update(updatedData, { where: { paymentId } });
  return updatePayment(paymentId);
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
