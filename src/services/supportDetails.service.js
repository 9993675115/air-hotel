const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');

const ApiError = require('../utils/ApiError');
const messages = require('../constant/message.json');
const logger = require('../config/logger');
const { SupportDetail } = require('../models');

const createSupportDetail = async (supportDetailBody) => {
  const supportDetail = await SupportDetail.create(supportDetailBody);
  return supportDetail;
};
const getSupportDetailById = async (supportDetailId) => {
  const supportDetail = await SupportDetail.findByPk(supportDetailId);
  return supportDetail;
};

const updateSupportDetail = async (supportDetailId, updatedData) => {
  const supportDetail = await SupportDetail.findByPk(supportDetailId);
  if (!supportDetail) {
    throw new Error('SupportDetail not found');
  }

  await supportDetail.update(updatedData);
  return supportDetail;
};

const deleteSupportDetail = async (supportDetailId) => {
  const supportDetail = await SupportDetail.findByPk(supportDetailId);
  if (!supportDetail) {
    throw new Error('SupportDetail not found');
  }

  await supportDetail.destroy();
};

module.exports = {
  createSupportDetail,
  getSupportDetailById,
  updateSupportDetail,
  deleteSupportDetail,
  // Add more service methods as needed
};
