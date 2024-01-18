const Joi = require('joi');
// const { password, objectId } = require('./custom.validation');

const createVat = {
  body: Joi.object().keys({
    vatCode: Joi.string().required(),
    vatDesc: Joi.string(),
    status: Joi.bool(),
    inMdm: Joi.bool(),
    xStoreCode: Joi.string()
  })
};

const getAllVats = {
  query: Joi.object().keys({
    vatCode: Joi.string(),
    vatDesc: Joi.string(),
    status: Joi.bool(),
    inMdm: Joi.bool(),
    xStoreCode: Joi.string()
  })
};

const getVat = {
  params: Joi.object().keys({
    vatId: Joi.number().required()
  })
};

const updateVat = {
  params: Joi.object().keys({
    vatId: Joi.number().required()
  }),
  body: Joi.object()
    .keys({
      vatCode: Joi.string(),
      vatDesc: Joi.string(),
      status: Joi.bool(),
      inMdm: Joi.bool(),
      xStoreCode: Joi.string()
    })
    .min(1)
};
const deleteVat = {
  params: Joi.object().keys({
    vatId: Joi.number().required()
  })
};

module.exports = {
  createVat,
  getAllVats,
  getVat,
  updateVat,
  deleteVat
};
