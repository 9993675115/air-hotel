const Joi = require('joi');

const getAllCommonParams = {
  query: Joi.object().keys({
    id: Joi.number(),
    franchiseeCode: Joi.string(),
    franchiseeName: Joi.string(),
    lSEFFranchiseePrefix: Joi.string(),
    eANFranchiseePrefix: Joi.number(),
    productGridId: Joi.number(),
    priceGridId: Joi.number(),
    storeCountryCode: Joi.string(),
    storeCode: Joi.number(),
    currencyCode: Joi.string(),
    franchiseeInterfaceCode: Joi.number(),
    applicationLanguage: Joi.string(),
    lastRun: Joi.date(),
    lastFileIndex: Joi.number(),
    lastEANSequence: Joi.number(),
    status: Joi.bool()
  })
};

const getCommonParam = {
  params: Joi.object().keys({
    commonParamId: Joi.number().required()
  })
};

const updateCommonParam = {
  params: Joi.object().keys({
    commonParamId: Joi.number().required()
  }),
  body: Joi.object()
    .keys({
      eanCodePrefix: Joi.string(),
      lseProductCodePrefix: Joi.string()
    })
    .min(1)
};
module.exports = {
  getAllCommonParams,
  getCommonParam,
  updateCommonParam
};
