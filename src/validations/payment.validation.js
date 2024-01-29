const Joi = require('joi');

const createPayment = {
  userId: Joi.number().required(),
  bookingId: Joi.number().required(),
  paymentResponse: Joi.string().required(),
  status: Joi.boolean().required(),
};
const getPaymentValidation = {
  params: Joi.object({
    paymentId: Joi.number().required(),
  }),
};
const updatePaymentValidation = {
    amount: Joi.number(),
  };

module.exports = {
  createPayment,
  getPaymentValidation,
  updatePaymentValidation
};
