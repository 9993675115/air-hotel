const Joi = require('joi');

const createGender = {
  body: Joi.object().keys({
    genderCode: Joi.string().required(),
    genderDesc: Joi.string().required(),
    status: Joi.bool(),
    inMdm: Joi.bool(),
    xStoreCode: Joi.string()
  })
};

const getAllGenders = {
  query: Joi.object().keys({
    genderCode: Joi.string(),
    genderDesc: Joi.string(),
    status: Joi.bool(),
    inMdm: Joi.bool(),
    xStoreCode: Joi.string()
  })
};

const getGender = {
  params: Joi.object().keys({
    genderId: Joi.number().required()
  })
};

const updateGender = {
  params: Joi.object().keys({
    genderId: Joi.number().required()
  }),
  body: Joi.object()
    .keys({
      genderCode: Joi.string(),
      genderDesc: Joi.string(),
      status: Joi.bool(),
      inMdm: Joi.bool(),
      xStoreCode: Joi.string()
    })
    .min(1)
};
const deleteGender = {
  params: Joi.object().keys({
    genderId: Joi.number().required()
  })
};

module.exports = {
  createGender,
  getAllGenders,
  getGender,
  updateGender,
  deleteGender
};
