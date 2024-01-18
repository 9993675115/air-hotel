const Joi = require('joi');
// const { password, objectId } = require('./custom.validation');

const createSubCategory = {
  body: Joi.object().keys({
    categoryId: Joi.number().required(),
    subCategoryCode: Joi.string(),
    subCategoryDesc: Joi.string(),
    status: Joi.bool(),
    inMdm: Joi.bool(),
    xStoreCode: Joi.string()
  })
};

const getAllSubCategories = {
  query: Joi.object().keys({
    categoryId: Joi.number(),
    subCategoryCode: Joi.string(),
    subCategoryDesc: Joi.string(),
    categoryCode: Joi.string(),
    status: Joi.bool(),
    inMdm: Joi.bool(),
    xStoreCode: Joi.string()
  })
};

const getSubCategory = {
  params: Joi.object().keys({
    subCategoryId: Joi.number().required()
  })
};

const updateSubCategory = {
  params: Joi.object().keys({
    subCategoryId: Joi.number().required()
  }),
  body: Joi.object()
    .keys({
      categoryId: Joi.number(),
      subCategoryCode: Joi.string(),
      subCategoryDesc: Joi.string(),
      status: Joi.bool(),
      inMdm: Joi.bool(),
      xStoreCode: Joi.string()
    })
    .min(1)
};
const deleteSubCategory = {
  params: Joi.object().keys({
    subCategoryId: Joi.number().required()
  })
};

module.exports = {
  createSubCategory,
  getAllSubCategories,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory
};
