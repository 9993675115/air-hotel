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
  try {
    const support = await Support.findByPk(supportId);
    return support;
  } catch (error) {
    console.error('Error getting support by ID:', error);
    throw error;
  }
};


const getAllSupport = async () => {
  try {
    const supports = await Support.findAll({where:{status:true}});
    return supports;
  } catch (error) {
    console.error('Error getting all supports:', error);
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
