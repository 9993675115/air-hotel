const Joi = require('joi');

const createSubscription = {
  planName: Joi.string().required(),
  period: Joi.string().required(),
  noOfHotels: Joi.number().required(),
  price: Joi.number().required(),
  currencyType: Joi.string().required(),
  userId: Joi.number().required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
  paymentMethod: Joi.string().required(),
  autoRenew: Joi.boolean().required(),
  subscriptionType: Joi.string().required(),
  status: Joi.boolean(),
};

const updateSubscriptionValidation = {
  body: Joi.object({
    // Define the validation schema for updating a subscription
    // Example:
    planName: Joi.string(),
    period: Joi.string(),
    noOfHotels: Joi.number(),
    price: Joi.number(),
    currencyType: Joi.string(),
    userId: Joi.number(),
    startDate: Joi.date().iso(),
    endDate: Joi.date().iso(),
    paymentMethod: Joi.string(),
    autoRenew: Joi.boolean(),
    subscriptionType: Joi.string(),
    status: Joi.boolean(),
    // Add more validation as needed
  }),
  params: Joi.object({
    subscriptionId: Joi.number().required(),
  }),
};

const getSubscriptionsValidation = Joi.object({
  userId: Joi.number(),
  // You can add more validation rules as needed for your specific use case
});

module.exports = {
  createSubscription,
  updateSubscriptionValidation,
  getSubscriptionsValidation,
};
