const Joi = require('joi');

const createSupport = {
  subject: Joi.string().required(),
  title: Joi.string().required(),
  sentBy: Joi.string().required(),
  status: Joi.boolean().required(),
};
const updateSupportValidation = {
  body: Joi.object({
    // Define the validation schema for updating a support
    // Example:
    userId: Joi.string(),
    issue: Joi.string(),
    // Add more validation as needed
  }),
  params: Joi.object({
    supportId: Joi.string().required(),
  }),
};

module.exports = {
  createSupport,
  updateSupportValidation
};
