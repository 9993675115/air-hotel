const Joi = require('joi');

const createPayment = {
  userId: Joi.number().required(),
  bookingId: Joi.number().required(),
  paymentResponse: Joi.string().required(),
  status: Joi.boolean().required(),
};
const updatePaymentValidation = {
  body: Joi.object({
    amount: Joi.number(),
    // Add more validation as needed
  }),
  params: Joi.object({
    paymentId: Joi.string().required(),
  }),
};

module.exports = {
  createPayment,
  updatePaymentValidation
};
