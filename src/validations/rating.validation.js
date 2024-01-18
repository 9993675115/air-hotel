const Joi = require('joi');

const createRating = {
  userId: Joi.number().required(),
  bookingId: Joi.number().required(),
  review: Joi.string().required(),
  status: Joi.string().required(),
};
const updateRatingValidation = {
  body: Joi.object({
    // Define the validation schema for updating a rating
    // Example:
    userId: Joi.string(),
    ratingValue: Joi.number().min(1).max(5),
    // Add more validation as needed
  }),
  params: Joi.object({
    ratingId: Joi.string().required(),
  }),
};
module.exports = {
  createRating,
  updateRatingValidation
};
