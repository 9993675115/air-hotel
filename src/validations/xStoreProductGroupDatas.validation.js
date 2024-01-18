const Joi = require('joi');
// const { password, objectId } = require('./custom.validation');

const createXStoreProductGroupData = {
  body: Joi.object().keys({
    productGroupId: Joi.number().required(),
    groupLevel: Joi.number().required(),
    description: Joi.string().required(),
    groupCode: Joi.string(),
    status: Joi.bool()
  })
};

const getAllXStoreProductGroupData = {
  query: Joi.object().keys({
    productGroupId: Joi.number(),
    groupLevel: Joi.number(),
    description: Joi.string(),
    groupCode: Joi.string(),
    status: Joi.bool()
  })
};

const getXStoreProductGroupData = {
  params: Joi.object().keys({
    Id: Joi.number().required()
  })
};

const updateXStoreProductGroupData = {
  params: Joi.object().keys({
    Id: Joi.number().required()
  }),
  body: Joi.object()
    .keys({
      productGroupId: Joi.number(),
      groupLevel: Joi.number(),
      description: Joi.string(),
      groupCode: Joi.string(),
      status: Joi.bool()
    })
    .min(1)
};
const deleteXStoreProductGroupData = {
  params: Joi.object().keys({
    Id: Joi.number().required()
  })
};

module.exports = {
  createXStoreProductGroupData,
  getAllXStoreProductGroupData,
  getXStoreProductGroupData,
  updateXStoreProductGroupData,
  deleteXStoreProductGroupData
};
