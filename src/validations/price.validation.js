const Joi = require('joi');

const createPrice = {
  body: Joi.object().keys({
    updatePrice: Joi.array(),
    createPrice: Joi.array()
  })
};

const getAllPrices = {
  query: Joi.object().keys({
    brand: Joi.string(),
    gender: Joi.string(),
    category: Joi.string(),
    subCategory: Joi.string(),
    productDesc: Joi.string(),
    vendorProduct: Joi.string(),
    levisProduct: Joi.string(),
    effectiveDateFrom: Joi.date(),
    effectiveDateTo: Joi.date(),
    lifeCycle: Joi.string(),
    season: Joi.string(),
    rrp: Joi.number(),
    vat: Joi.string(),
    productWithoutPrice: Joi.string()
  })
};
const getPrice = {
  params: Joi.object().keys({
    priceId: Joi.number().required()
  })
};

const updatePrice = {
  params: Joi.object().keys({
    priceId: Joi.number().required()
  }),
  body: Joi.object()
    .keys({
      productId: Joi.number().required(),
      rrp: Joi.number(),
      effectiveDate: Joi.date(),
      effectiveEndDate: Joi.date(),
      updatedAt: Joi.date(),
      status: Joi.bool()
    })
    .min(1)
};
const deletePrice = {
  params: Joi.object().keys({
    priceId: Joi.number().required()
  })
};

module.exports = {
  createPrice,
  getAllPrices,
  getPrice,
  updatePrice,
  deletePrice
};
