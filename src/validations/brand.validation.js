const Joi = require('joi');
// const { password, objectId } = require('./custom.validation');

const createBrand = {
  body: Joi.object().keys({
    brandCode: Joi.string().required(),
    brandDesc: Joi.string().required(),
    status: Joi.bool(),
    inMdm: Joi.bool(),
    xStoreCode: Joi.string()
  })
};

const getAllBrands = {
  query: Joi.object().keys({
    brandCode: Joi.string(),
    brandDesc: Joi.string(),
    status: Joi.bool(),
    inMdm: Joi.bool(),
    xStoreCode: Joi.string()
  })
};

const getBrand = {
  params: Joi.object().keys({
    brandId: Joi.number().required()
  })
};

const updateBrand = {
  params: Joi.object().keys({
    brandId: Joi.number().required()
  }),
  body: Joi.object()
    .keys({
      brandCode: Joi.string(),
      brandDesc: Joi.string(),
      status: Joi.bool(),
      inMdm: Joi.bool(),
      xStoreCode: Joi.string()
    })
    .min(1)
};
const deleteBrand = {
  params: Joi.object().keys({
    brandId: Joi.number().required()
  })
};

module.exports = {
  createBrand,
  getAllBrands,
  getBrand,
  updateBrand,
  deleteBrand
};
