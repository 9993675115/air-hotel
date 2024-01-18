const Joi = require('joi');

const createShop = {
  body: Joi.object().keys({
    storeCode: Joi.string().required(),
    storeName: Joi.string().required()
  })
};

const getAllShops = {
  query: Joi.object().keys({
    shopId: Joi.number(),
    storeCode: Joi.string(),
    storeName: Joi.number(),
    isActive: Joi.bool(),
    status: Joi.bool()
  })
};

const getShop = {
  params: Joi.object().keys({
    shopId: Joi.number().required()
  })
};

const updateShop = {
  params: Joi.object().keys({
    shopId: Joi.number().required()
  }),
  body: Joi.object()
    .keys({
      storeName: Joi.string(),
      isActive: Joi.bool(),
      status: Joi.bool()
    })
    .min(1)
};
const deleteShop = {
  params: Joi.object().keys({
    shopId: Joi.number().required()
  })
};

module.exports = {
  createShop,
  getAllShops,
  getShop,
  updateShop,
  deleteShop
};
