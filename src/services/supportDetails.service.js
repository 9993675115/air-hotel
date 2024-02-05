const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');

const ApiError = require('../utils/ApiError');
const messages = require('../constant/message.json');
const logger = require('../config/logger');
const { SupportDetail } = require('../models');
const { Sequelize, Op, DataTypes } = require('sequelize');

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

const getAllSupportDetails = async (query, options) => {
  try {
    if (isNaN(query)) {
      const limit = Number(options.limit);
      const offset = options.page ? limit * (options.page - 1) : 0;

      // Ensure the query is a string
      const searchString = query ? query.toString() : '';

      // Define the where clause for search
      const whereClause = searchString ? {
        [Sequelize.Op.or]: {
          sentBy: { [Sequelize.Op.iLike]: `%${searchString}%` },
          // roomType2: { [Sequelize.Op.iLike]: `%${searchString}%` },
         
          // Add more fields as needed
        }
      } : {};

      const data = await SupportDetail.findAndCountAll({
        where: whereClause,
        order: [['updatedAt', 'DESC']],
        limit,
        offset,
      });

      return data;
    } else {
      const limit = Number(options.limit);
      const offset = options.page ? limit * (options.page - 1) : 0;

      // Ensure the query is a string
      const searchString = query ? query.toString() : '';

      // Define the where clause for search
      const whereClause = searchString ? {
        [Sequelize.Op.or]: {
          supportId:  { [Op.eq]: searchString },
          // monthlyCharge: { [Op.eq]: searchString },
          // weeklyCharge: { [Op.eq]: searchString },
          // roomNumber: { [Op.eq]: searchString },
          // perNightCharge: { [Op.eq]: searchString },
         
        }
      } : {};

      const data = await SupportDetail.findAndCountAll({
        where: whereClause,
        order: [['updatedAt', 'DESC']],
        limit,
        offset,
      });

      return data;
    }
  } catch (error) {
    console.error('Error getting all rooms:', error);
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
