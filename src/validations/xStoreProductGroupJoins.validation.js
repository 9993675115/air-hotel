const Joi = require('joi');
// const { password, objectId } = require('./custom.validation');

const createXStoreProductGroupJoin = {
  body: Joi.object().keys({
    productGroupId: Joi.number().required(),
    childProductGroupId: Joi.number().required(),
    status: Joi.bool()
  })
};

const getAllXStoreProductGroupJoin = {
  query: Joi.object().keys({
    productGroupId: Joi.number(),
    childProductGroupId: Joi.number(),
    status: Joi.bool()
  })
};

const getXStoreProductGroupJoin = {
  params: Joi.object().keys({
    Id: Joi.number().required()
  })
};

const updateXStoreProductGroupJoin = {
  params: Joi.object().keys({
    Id: Joi.number().required()
  }),
  body: Joi.object()
    .keys({
      productGroupId: Joi.number(),
      childProductGroupId: Joi.number(),
      status: Joi.bool()
    })
    .min(1)
};
const deleteXStoreProductGroupJoin = {
  params: Joi.object().keys({
    Id: Joi.number().required()
  })
};

module.exports = {
  createXStoreProductGroupJoin,
  getAllXStoreProductGroupJoin,
  getXStoreProductGroupJoin,
  updateXStoreProductGroupJoin,
  deleteXStoreProductGroupJoin
};
