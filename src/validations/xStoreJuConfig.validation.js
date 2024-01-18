const Joi = require('joi');
// const { password, objectId } = require('./custom.validation');

const createXStoreJuConfig = {
  body: Joi.object().keys({
    moduleName: Joi.string().required(),
    columnName: Joi.string().required(),
    columnValue: Joi.string(),
    status: Joi.bool()
  })
};

const getAllXStoreJuConfig = {
  query: Joi.object().keys({
    moduleName: Joi.string(),
    columnName: Joi.string(),
    columnValue: Joi.string(),
    status: Joi.bool()
  })
};

const getXStoreJuConfig = {
  params: Joi.object().keys({
    Id: Joi.number().required()
  })
};

const updateXStoreJuConfig = {
  params: Joi.object().keys({
    Id: Joi.number().required()
  }),
  body: Joi.object()
    .keys({
      moduleName: Joi.string(),
      columnName: Joi.string(),
      columnValue: Joi.string(),
      status: Joi.bool()
    })
    .min(1)
};
const deleteXStoreJuConfig = {
  params: Joi.object().keys({
    Id: Joi.number().required()
  })
};

module.exports = {
  createXStoreJuConfig,
  getAllXStoreJuConfig,
  getXStoreJuConfig,
  updateXStoreJuConfig,
  deleteXStoreJuConfig
};
