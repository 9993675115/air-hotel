const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const { Support,User, Shop, ShopParam, ApplicationLanguage } = require('../models');
const ApiError = require('../utils/ApiError');
const messages = require('../constant/message.json');
const logger = require('../config/logger');
// const support = require('../models/support');

const createSupport = async (_supportBody) => {
  const supportBody = _supportBody;
  return Support.create(supportBody);
};
const getSupportById = async (supportId) => {
  const support = await Support.findByPk(supportId);
  return support;
};

const updateSupport = async (supportId, updatedData) => {
  const support = await Support.findByPk(supportId);
  if (!support) {
    throw new Error('Support not found');
  }

  await support.update(updatedData);
  return support;
};

const deleteSupport = async (supportId) => {
  const support = await Support.findByPk(supportId);
  if (!support) {
    throw new Error('Support not found');
  }

  await support.destroy();
};

module.exports = {
  createSupport,
  getSupportById,
  updateSupport,
  deleteSupport,
  // Add more service methods as needed
};
