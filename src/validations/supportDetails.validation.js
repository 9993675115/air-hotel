const Joi = require('joi');

const createSupportDetail = {
  supportId: Joi.number().required(),
  description: Joi.string().required(),
  sentBy: Joi.string().required(),
  status: Joi.boolean(),
};
const updateSupportDetailValidation = {
  // body: Joi.object({
  //   // Define the validation schema for updating a support detail
  //   // Example:
  //   supportId: Joi.string(),
  //   // Add more validation as needed
  // }),
  // params: Joi.object({
    supportDetailId: Joi.string().required(),
    sentBy: Joi.string(),
    description: Joi.string().required(),
  // }),
};

module.exports = {
  createSupportDetail,
  updateSupportDetailValidation
};
