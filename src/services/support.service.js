const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const { Support,User, Shop, ShopParam, ApplicationLanguage } = require('../models');
const ApiError = require('../utils/ApiError');
const messages = require('../constant/message.json');
const logger = require('../config/logger');
// const support = require('../models/support');
const { Sequelize, Op, DataTypes } = require('sequelize');

const createSupport = async (_supportBody) => {
  const supportBody = _supportBody;
  return Support.create(supportBody);
};
const getSupportById = async (supportId) => {
  try {
    const support = await Support.findByPk(supportId);
    return support;
  } catch (error) {
    console.error('Error getting support by ID:', error);
    throw error;
  }
};


const getAllSupport = async (query, options) => {
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
        }
      } : {};

      const data = await Support.findAndCountAll({
        where: whereClause,
        order: [['updatedAt', 'DESC']],
        limit,
        offset,
      });

      return data;
    } else {
      console.log('Query is empty or undefined.');

      const data = await Support.findAll({
        where: { status: true },
        // include: Booking
      });

      console.log('Returned All Supports Data:', data);

      return data;
    }
  } catch (error) {
    console.error('Error getting all Supports:', error);
    throw error;
  }
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
  try {
    const deletedCount = await Support.update({status:false},{
      where: {
        id: supportId,
      },
    });
    return deletedCount;
  } catch (error) {
    console.error('Error deleting support:', error);
    throw error;
  }
};

module.exports = {
  createSupport,
  getSupportById,
  updateSupport,
  deleteSupport,
  getAllSupport
};
