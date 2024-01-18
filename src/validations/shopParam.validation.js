const Joi = require('joi');

const getAllShopParams = {
  query: Joi.object().keys({
    shopId: Joi.number(),
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

const getShopParam = {
  params: Joi.object().keys({
    shopParamId: Joi.number().required()
  })
};

const updateShopParam = {
  params: Joi.object().keys({
    shopParamId: Joi.number()
  }),
  body: Joi.object()
    .keys({
      applicationLanguageId: Joi.number(),
      franchiseeCode: Joi.string(),
      franchiseeName: Joi.string(),
      lseCodeFranchiseePrefix: Joi.string(),
      eanCodeFranchiseePrefix: Joi.string(),
      productGridId: Joi.string(),
      priceGridId: Joi.string(),
      currencyCode: Joi.string(),
      franchiseeInterfaceCode: Joi.string(),
      applicationLanguage: Joi.string(),
      lastRun: Joi.date(),
      lastFileIndex: Joi.number(),
      storeCountryCode: Joi.string()
    })
    .min(1)
};

module.exports = {
  getAllShopParams,
  getShopParam,
  updateShopParam
};
