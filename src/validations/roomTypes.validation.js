const Joi = require('joi');

const createRoomType = {
  body: Joi.object({
    typeName: Joi.string(),
    description: Joi.string(),
    // Add more validation as needed
  }),
  params: Joi.object({
    roomTypeId: Joi.string(),
  }),
};
const updateRoomTypeValidation = {
  body: Joi.object({
    typeName: Joi.string(),
    description: Joi.string(),
    // Add more validation as needed
  }),
  params: Joi.object({
    roomTypeId: Joi.string(),
  }),
};

module.exports = {
  createRoomType,
  updateRoomTypeValidation
};
