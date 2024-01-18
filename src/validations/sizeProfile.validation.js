const Joi = require('joi');

const createSizeProfile = {
  body: Joi.object().keys({
    sizeProfile: Joi.object()
      .keys({
        sizeProfileCode: Joi.string().required(),
        sizeProfileName: Joi.string()
      })
      .required(),
    sizeProfileSize: Joi.array().items(
      Joi.object({
        size: Joi.string(),
        leg: Joi.string().allow('')
      })
    )
  })
};

const getAllSizeProfiles = {
  query: Joi.object().keys({
    sizeProfileCode: Joi.string(),
    sizeProfileDesc: Joi.string(),
    updatedAt: Joi.date(),
    status: Joi.bool()
  })
};

const getSizeProfile = {
  params: Joi.object().keys({
    sizeProfileId: Joi.number().required()
  })
};

const updateSizeProfile = {
  params: Joi.object().keys({
    sizeProfileId: Joi.number().required()
  }),
  body: Joi.object()
    .keys({
      updateSizeProfile: Joi.object().keys({
        sizeProfileName: Joi.string()
      }),
      createSizeProfileSize: Joi.array().items(
        Joi.object({
          sizeProfileId: Joi.number(),
          size: Joi.string(),
          leg: Joi.string().allow(''),
          sequenceOrder: Joi.number(),
          id: Joi.number(),
          shopId: Joi.number(),
          status: Joi.bool(),
          createdAt: Joi.date(),
          updatedAt: Joi.date()
        })
      )
    })
    .min(1)
};
const deleteSizeProfile = {
  params: Joi.object().keys({
    sizeProfileId: Joi.number().required()
  })
};

module.exports = {
  createSizeProfile,
  getAllSizeProfiles,
  getSizeProfile,
  updateSizeProfile,
  deleteSizeProfile
};
