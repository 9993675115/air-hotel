const Joi = require('joi');

const createRoomSchema = {
  userId: Joi.number().required(),
  roomNumber: Joi.string().required(),
  roomType: Joi.string().required(),
  roomType2: Joi.string().required(),
  extraMattress: Joi.boolean().required(),
  extraMattressCharge: Joi.number().required(),
  perNightCharge: Joi.number().required(),
  monthlyCharge: Joi.number().required(),
  weeklyCharge: Joi.number().required(),
  numberOfGuest: Joi.number().required(),
  numberOfChildren: Joi.number().required(),
  description: Joi.string().required(),
  selectAmenities: Joi.array().items(Joi.string()).required(),
  image: Joi.object().required(), // You might need to refine this based on the actual structure of the image
  status: Joi.boolean(),
  hotelId:Joi.number(),
  featureImage: Joi.object()
};
const getRoomByIdValidationSchema = {
  params: Joi.object({
    bookingId: Joi.number().required(),
  }),
};

const updateRoomValidationSchema = {
  body: Joi.object({
    userId: Joi.number(),
    roomNumber: Joi.number(),
    roomTypeId: Joi.number(),
    extraMattress: Joi.boolean(),
    extraMattressCharge: Joi.number(),
    perNightCharge: Joi.number(),
    monthlyCharge: Joi.number(),
    weeklyCharge: Joi.number(),
    numberOfGuest: Joi.number(),
    numberOfChildren: Joi.number(),
    description: Joi.string(),
    selectAmenities: Joi.array().items(Joi.string()),
    image: Joi.object(), // You might need to refine this based on the actual structure of the image
    status: Joi.boolean(),
    hotelId:Joi.number(),
    roomId: Joi.number(),
    featureImage: Joi.object()
    // Add more validation as needed
  }),
  // params: Joi.object({
  // }),
};

module.exports = {
  createRoomSchema,
  updateRoomValidationSchema,
  getRoomByIdValidationSchema
};
