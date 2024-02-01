const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const messages = require('../constant/message.json');
const logger = require('../config/logger');
const { Subscription } = require('../models');

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

const getAllSubscriptions = async () => {
  try {
    const subscriptions = await Subscription.findAll();
    return subscriptions;
  } catch (error) {
    console.error('Error getting all subscriptions:', error);
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
