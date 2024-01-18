const Joi = require('joi');

const createRoom = {
  userId: Joi.number().required(),
  roomNumber: Joi.number().required(),
  roomTypeId: Joi.string().required(),
  status: Joi.boolean().required(),
};
const updateRoomValidation = {
  body: Joi.object({
    name: Joi.string(),
    // Add more validation as needed
  }),
  params: Joi.object({
    roomId: Joi.string().required(),
  }),
};
module.exports = {
  createRoom,
  updateRoomValidation
};
