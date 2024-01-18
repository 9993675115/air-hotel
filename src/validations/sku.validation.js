const Joi = require('joi');

const createSku = {
  body: Joi.object().keys({
    productId: Joi.number().required(),
    sizeProfileSizeId: Joi.number().required(),
    cod: Joi.string(),
    lic: Joi.string(),
    lastUpdate: Joi.date(),
    size: Joi.string(),
    leg: Joi.string(),
    ean: Joi.string(),
    status: Joi.bool()
  })
};

const getAllSkus = {
  query: Joi.object().keys({
    category: Joi.number().integer(),
    subCategory: Joi.number().integer(),
    vendorProductCode: Joi.string(),
    ProductDescription: Joi.string(),
    levisProductCodePrefix: Joi.string(),
    levisProductCode: Joi.string(),
    costDataTypes: Joi.number(),
    vat: Joi.number().integer(),
    brand: Joi.number().integer(),
    gender: Joi.number().integer(),
    lifeCycle: Joi.number().integer(),
    productDesc: Joi.string(),
    vendorProduct: Joi.string(),
    levisProduct: Joi.string(),
    sku: Joi.string(),
    ean: Joi.string(),
    season: Joi.number(),
    limit: Joi.number().integer(),
    page: Joi.number().integer()
  })
};

const getSku = {
  params: Joi.object().keys({
    skuId: Joi.number().required()
  })
};

const updateSku = {
  params: Joi.object().keys({
    skuId: Joi.number().required()
  }),
  body: Joi.object()
    .keys({
      cod: Joi.string(),
      lic: Joi.string(),
      lastUpdate: Joi.date(),
      size: Joi.string(),
      leg: Joi.string(),
      ean: Joi.string(),
      status: Joi.bool()
    })
    .min(1)
};
const deleteSku = {
  params: Joi.object().keys({
    skuId: Joi.number().required()
  })
};

module.exports = {
  createSku,
  getAllSkus,
  getSku,
  updateSku,
  deleteSku
};
