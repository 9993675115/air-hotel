const Joi = require('joi');

const createRoomType = {
  typeName: Joi.string().required(),
  description: Joi.string().required(),
};
const updateRoomTypeValidation = {
  body: Joi.object({
    name: Joi.string(),
    description: Joi.string(),
    // Add more validation as needed
  }),
  params: Joi.object({
    roomTypeId: Joi.string().required(),
  }),
};

module.exports = {
  createRoomType,
  updateRoomTypeValidation
};
