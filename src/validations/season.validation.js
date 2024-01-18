const Joi = require('joi');
// const { password, objectId } = require('./custom.validation');

const createSeason = {
  body: Joi.object().keys({
    seasonCode: Joi.string().required(),
    status: Joi.bool(),
    inMdm: Joi.bool(),
    xStoreCode: Joi.string()
  })
};

const getAllSeasons = {
  query: Joi.object().keys({
    season: Joi.number(),
    status: Joi.bool(),
    inMdm: Joi.bool(),
    xStoreCode: Joi.string()
  })
};

const getSeason = {
  params: Joi.object().keys({
    seasonId: Joi.number().required()
  })
};

const updateSeason = {
  params: Joi.object().keys({
    seasonId: Joi.number().required()
  }),
  body: Joi.object()
    .keys({
      seasonCode: Joi.string(),
      status: Joi.bool(),
      inMdm: Joi.bool(),
      xStoreCode: Joi.string()
    })
    .min(1)
};
const deleteSeason = {
  params: Joi.object().keys({
    seasonId: Joi.number().required()
  })
};

module.exports = {
  createSeason,
  getAllSeasons,
  getSeason,
  updateSeason,
  deleteSeason
};
