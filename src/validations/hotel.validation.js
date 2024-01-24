// validators/hotelValidator.js
const Joi = require('joi');

const createHotelSchema = {
  // Existing validation
  // ...

  // New validation
  address: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  country: Joi.string().required(),
  pincode: Joi.string().required(),
  distanceFromAirport: Joi.string().required(),
  distanceFromCenter: Joi.string().required(),
  location: Joi.string().required(),
  numberOfRoom: Joi.number().integer().required(),
  startingPrice: Joi.number().integer().required(),
  checkInTime: Joi.string().required(), // Assuming it's a string, adjust if needed
  checkOutTime: Joi.string().required(), // Assuming it's a string, adjust if needed
  description: Joi.string().required(),
  selectFacility: Joi.array().items(Joi.string()).required(),
  name:Joi.string().required(),
  status:Joi.boolean(),
  categoryId: Joi.number().integer(),
};

const updateHotelSchema = Joi.object({
  // Existing validation
  // ...

  // New validation
  address: Joi.string(),
  city: Joi.string(),
  state: Joi.string(),
  country: Joi.string(),
  pincode: Joi.string(),
  distanceFromAirport: Joi.string(),
  distanceFromCenter: Joi.string(),
  location: Joi.string(),
  numberOfRoom: Joi.number().integer(),
  startingPrice: Joi.number().integer(),
  checkInTime: Joi.string(), // Assuming it's a string, adjust if needed
  checkOutTime: Joi.string(), // Assuming it's a string, adjust if needed
  description: Joi.string(),
  selectFacility: Joi.array().items(Joi.string()),
  name:Joi.string(),
  status:Joi.boolean(),
  categoryId: Joi.number().integer(),
});

const getHotelSchema = Joi.object({
  // Existing validation
  // ...

  // New validation
  address: Joi.string(),
  city: Joi.string(),
  state: Joi.string(),
  country: Joi.string(),
  pincode: Joi.number(),
  distanceFromAirport: Joi.string(),
  distanceFromCenter: Joi.string(),
  location: Joi.string(),
  numberOfRoom: Joi.number().integer(),
  startingPrice: Joi.number().integer(),
  checkInTime: Joi.string(), // Assuming it's a string, adjust if needed
  checkOutTime: Joi.string(), // Assuming it's a string, adjust if needed
  description: Joi.string(),
  selectFacility: Joi.array().items(Joi.string()),
  name:Joi.string(),
  status:Joi.boolean(),
  categoryId: Joi.number().integer(),
});

const hotelIdSchema = Joi.object({
  hotelId: Joi.number().integer().required(),
});

module.exports = {
  createHotelSchema,
  updateHotelSchema,
  getHotelSchema,
  hotelIdSchema,
};
