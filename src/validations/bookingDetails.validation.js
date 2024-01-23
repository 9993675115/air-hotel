const Joi = require('joi');

const createBookingDetail = {
  bookingId: Joi.number().required(),
  roomId: Joi.number().required(),
  paymentType: Joi.string().required(),
  amount: Joi.number().required(),
  status: Joi.boolean().required(),
};
const updateBookingDetailValidation = {
  body: Joi.object({
    // Define the validation schema for updating a booking detail
    // Example:
    bookingId: Joi.number(),
    // Add more validation as needed
  }),
  params: Joi.object({
    bookingDetailId: Joi.string().required(),
  }),
};
const getBookingDetailsValidation = {
  params: Joi.object({
    bookingDetailId: Joi.number().required(),
    
  }),
};

module.exports = {
  createBookingDetail,
  getBookingDetailsValidation,
  updateBookingDetailValidation
};
