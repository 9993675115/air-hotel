const Joi = require('joi');

const createAddressValidation = Joi.object({
  userId: Joi.number().integer().required(),
  address: Joi.string().required(),
  defaultAddress: Joi.boolean().required(),
  status: Joi.boolean().required(),
});

const updateAddressValidation = Joi.object({
  userId: Joi.number().integer().required(),
  address: Joi.string().required(),
  defaultAddress: Joi.boolean().required(),
  status: Joi.boolean().required(),
});
module.exports = {
  createAddressValidation,
  updateAddressValidation,
};
