const Joi = require('joi');

const createBooking = {
  name: Joi.string().required(),
  checkInDate: Joi.date().required(),
  checkOutDate: Joi.date().required(),
  adult: Joi.number().required(),
  children: Joi.number().required(),
  price: Joi.number().required(),
  totalPrice: Joi.number().required(),
  totalRoom: Joi.number().required(),
  roomQuantity: Joi.number().required(),
  userId: Joi.number().required(),
  roomId: Joi.number().required(),
  address: Joi.string().required(),
  status: Joi.string().required(),
};
const updateBookingValidation = {
  body: Joi.object({
    // Define the validation schema for updating a booking
    // Example:
    userId: Joi.string(),
    roomId: Joi.string(),
    checkInDate: Joi.date().iso(),
    checkOutDate: Joi.date().iso(),
    // Add more validation as needed
  }),
  params: Joi.object({
    bookingId: Joi.string().required(),
  }),
};

module.exports = {
  createBooking,
  updateBookingValidation
};
