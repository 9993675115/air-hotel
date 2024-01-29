const Joi = require('joi');

const register = {
  body: Joi.object().keys({
    firstName: Joi.string().required(), // Assuming firstName is optional
    lastName: Joi.string().required(), // Assuming lastName is optional
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    role: Joi.string().optional(), // Assuming role is optional
    status: Joi.boolean().optional(), // Assuming status is optional
    isVerify: Joi.boolean().optional(), // Assuming isVerify is optional
    Dob: Joi.date().optional(), // Assuming Dob is optional and should be a date
    country: Joi.string().optional(), // Assuming country is optional
    image: Joi.object().optional(), // Assuming image is optional and should be an object
    companyName: Joi.string().optional(),
    contact: Joi.number().required(),
    pincode: Joi.number(),
    city: Joi.string(), 
    document: Joi.string(),
  })
};


const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required()
  })
};

const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required()
  })
};

const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required()
  })
};

const generatePassword = {
  query: Joi.object().keys({
    password: Joi.string().required()
  })
};
const getUserById = {
  params: Joi.object({
    id: Joi.number().required(),
  }),
};
const update = {
  body: Joi.object().keys({
    firstName: Joi.string().required(), // Assuming firstName is optional
    lastName: Joi.string().required(), // Assuming lastName is optional
    Dob: Joi.date().required(), // Assuming Dob is  and should be a date
    country: Joi.string().required(), // Assuming country is 
    image: Joi.object(), // Assuming image is  and should be an object
    companyName: Joi.string().required(),
    contact: Joi.number().required(),
    pincode: Joi.number().required(),
    city: Joi.string().required(),
    document: Joi.string(),
  })
};

module.exports = {
  login,
  logout,
  refreshTokens,
  register,
  generatePassword,
  getUserById,
  update
};
