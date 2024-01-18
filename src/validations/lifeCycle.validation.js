const Joi = require('joi');
// const { password, objectId } = require('./custom.validation');

const createLifeCycle = {
  body: Joi.object().keys({
    lifeCycleCode: Joi.string().required(),
    lifeCycleDesc: Joi.string().required(),
    status: Joi.bool(),
    inMdm: Joi.bool(),
    xStoreCode: Joi.string()
  })
};

const getAllLifeCycles = {
  query: Joi.object().keys({
    shopId: Joi.number(),
    lifeCycleCode: Joi.string(),
    lifeCycleDesc: Joi.string(),
    status: Joi.bool(),
    inMdm: Joi.bool(),
    xStoreCode: Joi.string()
  })
};

const getLifeCycle = {
  params: Joi.object().keys({
    lifeCycleId: Joi.number().required()
  })
};

const updateLifeCycle = {
  params: Joi.object().keys({
    lifeCycleId: Joi.number().required()
  }),
  body: Joi.object()
    .keys({
      lifeCycleCode: Joi.string(),
      lifeCycleDesc: Joi.string(),
      status: Joi.bool(),
      inMdm: Joi.bool(),
      xStoreCode: Joi.string()
    })
    .min(1)
};
const deleteLifeCycle = {
  params: Joi.object().keys({
    lifeCycleId: Joi.number().required()
  })
};

module.exports = {
  createLifeCycle,
  getAllLifeCycles,
  getLifeCycle,
  updateLifeCycle,
  deleteLifeCycle
};
