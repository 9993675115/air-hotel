const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');

const ApiError = require('../utils/ApiError');
const messages = require('../constant/message.json');
const logger = require('../config/logger');
const { SupportDetail } = require('../models');

const createSupportDetail = async (supportDetailData) => {
  try {
    const createdSupportDetail = await SupportDetail.create(supportDetailData);
    return createdSupportDetail;
  } catch (error) {
    console.error('Error creating support detail:', error);
    throw error;
  }
};
const getSupportDetailById = async (supportDetailId) => {
  const supportDetail = await SupportDetail.findByPk(supportDetailId);
  return supportDetail;
};

const getAllSupportDetails = async () => {
  try {
    const supportDetails = await SupportDetail.findAll();
    return supportDetails;
  } catch (error) {
    console.error('Error getting all support details:', error);
    throw error;
  }
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
  try {
    const deletedCount = await SupportDetail.update({status:false},{
      where: { id: supportDetailId },
    });
    return deletedCount;
  } catch (error) {
    console.error('Error deleting support detail:', error);
    throw error;
  }
};

module.exports = {
  createSupportDetail,
  getSupportDetailById,
  updateSupportDetail,
  deleteSupportDetail,
  getAllSupportDetails
  // Add more service methods as needed
};
