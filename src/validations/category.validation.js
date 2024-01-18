const Joi = require('joi');

const createCategory = {
  body: Joi.object().keys({
    categoryCode: Joi.string().required(),
    categoryDesc: Joi.string().required(),
    status: Joi.bool(),
    inMdm: Joi.bool(),
    xStoreCode: Joi.string()
  })
};

const getAllCategories = {
  query: Joi.object().keys({
    categoryCode: Joi.string(),
    categoryDesc: Joi.string(),
    status: Joi.bool(),
    inMdm: Joi.bool(),
    xStoreCode: Joi.string()
  })
};

const getCategory = {
  params: Joi.object().keys({
    categoryId: Joi.number().required()
  })
};

const updateCategory = {
  params: Joi.object().keys({
    categoryId: Joi.number().required()
  }),
  body: Joi.object()
    .keys({
      categoryCode: Joi.string(),
      categoryDesc: Joi.string(),
      status: Joi.bool(),
      inMdm: Joi.bool(),
      xStoreCode: Joi.string()
    })
    .min(1)
};
const deleteCategory = {
  params: Joi.object().keys({
    categoryId: Joi.number().required()
  })
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategory,
  updateCategory,
  deleteCategory
};
