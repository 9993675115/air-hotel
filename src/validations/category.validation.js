// validators/categoryValidator.js
const Joi = require('joi');

const createCategorySchema = {
  name: Joi.string().required(),
  image: Joi.string().required(),
  isActive: Joi.boolean(),
  icon: Joi.string(),
  status: Joi.boolean(),
};

const updateCategorySchema = Joi.object({
  name: Joi.string(),
  image: Joi.string(),
  isActive: Joi.boolean(),
  categoryIcon: Joi.string(),
  status: Joi.boolean(),
});

const getCategorySchema = Joi.object({
  categoryName: Joi.string(),
  image: Joi.string(),
  isActive: Joi.boolean(),
  categoryIcon: Joi.string(),
  status: Joi.boolean(),
  // You can add more validation rules as needed for your specific use case
});

const categoryIdSchema = Joi.object({
  categoryId: Joi.number().integer().required(),
});

module.exports = {
  createCategorySchema,
  updateCategorySchema,
  getCategorySchema,
  categoryIdSchema,
};
