const Joi = require('joi');
// const { password, objectId } = require('./custom.validation');

const createSizeProfileSize = {
  body: Joi.object().keys({
    updateSizeProfileSize: Joi.array(),
    createSizeProfileSize: Joi.array()
  })
};

const getAllSizeProfileSizes = {
  query: Joi.object().keys({
    sizeProfileCode: Joi.string(),
    sizeProfileName: Joi.string(),
    size: Joi.string(),
    leg: Joi.string()
  })
};

const getSizeProfileSize = {
  params: Joi.object().keys({
    sizeProfileSizeId: Joi.number().required()
  })
};

const updateSizeProfileSize = {
  params: Joi.object().keys({
    sizeProfileSizeId: Joi.number().required()
  }),
  body: Joi.object()
    .keys({
      sizeProfileId: Joi.number(),
      size: Joi.string(),
      leg: Joi.string(),
      sequenceOrder: Joi.number(),
      status: Joi.bool()
    })
    .min(1)
};
const deleteSizeProfileSize = {
  params: Joi.object().keys({
    sizeProfileSizeId: Joi.number().required()
  })
};

module.exports = {
  createSizeProfileSize,
  getAllSizeProfileSizes,
  getSizeProfileSize,
  updateSizeProfileSize,
  deleteSizeProfileSize
};
