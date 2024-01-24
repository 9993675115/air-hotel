const Joi = require('joi');

const createRoomType = {
  body: Joi.object({
    typeName: Joi.string(),
    description: Joi.string(),
    status: Joi.boolean(),
    // Add more validation as needed
  }),
  params: Joi.object({
    roomTypeId: Joi.string(),
  }),
};

const getRoomTypeValidation = {
  params: Joi.object({
    roomTypeId: Joi.string().required(),
  }),
};
const updateRoomTypeValidation = {
  body: Joi.object({
    typeName: Joi.string(),
    description: Joi.string(),
    status: Joi.boolean(),
    // Add more validation as needed
  }),
  params: Joi.object({
    roomTypeId: Joi.string(),
  }),
};

module.exports = {
  createRoomType,
  updateRoomTypeValidation,
  getRoomTypeValidation
};
