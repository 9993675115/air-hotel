const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const messages = require('../constant/message.json');
const logger = require('../config/logger');
const { Subscription } = require('../models');
const { Sequelize, Op, DataTypes } = require('sequelize');

const createSubscription = async (_subscriptionBody) => {
  const subscriptionBody = _subscriptionBody;
  console.log("-----------", subscriptionBody);
  return Subscription.create(subscriptionBody);
};

const getSubscriptionById = async (subscriptionId) => {
  try {
    const data = await Subscription.findByPk(subscriptionId);
    return data;
  } catch (error) {
    console.error('Error retrieving subscription:', error);
    throw error;
  }
};

const getAllSubscriptions = async (query, options) => {
  const isValidDate = (date) => {
    return date instanceof Date && !isNaN(date);
  };
  try {
    if (isNaN(query)) {
      const limit = Number(options.limit);
      const offset = options.page ? limit * (options.page - 1) : 0;

      // Ensure the query is a string
      const searchString = query ? query.toString() : '';

      // Define the where clause for search
      const whereClause = searchString ? {
        [Sequelize.Op.or]: {
          planName: { [Sequelize.Op.iLike]: `%${searchString}%` },
          period: { [Sequelize.Op.iLike]: `%${searchString}%` },
          paymentMethod: { [Sequelize.Op.iLike]: `%${searchString}%` },
          subscriptionType: { [Sequelize.Op.iLike]: `%${searchString}%` },
          startDate: {
            [Sequelize.Op.between]: [
              isValidDate(new Date(searchString)) ? new Date(searchString) : new Date(),
              isValidDate(new Date(searchString)) ? new Date(searchString) : new Date()
            ]
          },
          endDate: {
            [Sequelize.Op.between]: [
              isValidDate(new Date(searchString)) ? new Date(searchString) : new Date(),
              isValidDate(new Date(searchString)) ? new Date(searchString) : new Date()
            ]
          },
          // Add more fields as needed
        }
      } : {};

      const data = await Subscription.findAndCountAll({
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
          price:  { [Op.eq]: searchString },
          noOfHotels: { [Op.eq]: searchString },
          roomQuantity: { [Op.eq]: searchString },
          userId: { [Op.eq]: searchString },
          
        }
      } : {};

      const data = await Subscription.findAndCountAll({
        where: whereClause,
        order: [['updatedAt', 'DESC']],
        limit,
        offset,
      });

      return data;
    }
  } catch (error) {
    console.error('Error getting all Subscriptions:', error);
    throw error;
  }
};




const updateSubscription = async (subscriptionId, updatedData) => {
  // Correct the column name to "id"
  const subscription = await Subscription.update(updatedData, { where: { id: subscriptionId } });
  return subscription;
};

const deleteSubscription = async (id) => {
  try {
    const deletedRowsCount = await Subscription.destroy({
      where: { id }
    });
    return deletedRowsCount;
  } catch (error) {
    console.error('Error deleting subscription by id:', error);
    throw error;
  }
};

module.exports = {
  createSubscription,
  getSubscriptionById,
  updateSubscription,
  deleteSubscription,
  getAllSubscriptions
  // Add more service methods as needed
};
