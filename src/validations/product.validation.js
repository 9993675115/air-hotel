const Joi = require('joi');
// const { password, objectId } = require('./custom.validation');

const createProduct = {
  body: Joi.object().keys({
    updateProduct: Joi.array(),
    createProduct: Joi.array().items(
      Joi.object({
        categoryId: Joi.number().messages({
          'number.base': `"Category" is required`
        }),
        subCategoryId: Joi.number().messages({
          'number.base': `"Sub Category" is required`
        }),
        brandId: Joi.number().messages({
          'number.base': `"Brand" is required`
        }),
        genderId: Joi.number().messages({
          'number.base': `"Gender" is required`
        }),
        sizeProfileId: Joi.number().messages({
          'number.base': `"Size Profile" is required`
        }),
        lifeCycleId: Joi.number().messages({
          'number.base': `"Lifecycle" is required`
        }),
        seasonId: Joi.number().messages({
          'number.base': `"Season" is required`
        }),
        vatId: Joi.number().messages({
          'number.base': `"Vat" is required`
        }),
        vendorProductCode: Joi.string(),
        productDescription: Joi.string(),
        levisProductCodePrefix: Joi.string(),
        levisProductCode: Joi.string(),
        costPrice: Joi.number(),
        lastRun: Joi.date()
      })
    )
  })
};

const getAllProducts = {
  query: Joi.object().keys({
    categoryId: Joi.number(),
    subCategoryId: Joi.number(),
    vendorProductCode: Joi.string(),
    ProductDescription: Joi.string(),
    levisProductCodePrefix: Joi.string(),
    levisProductCode: Joi.string(),
    costDataTypes: Joi.number(),
    VAT: Joi.number(),
    brand: Joi.number(),
    gender: Joi.number(),
    category: Joi.string(),
    subCategory: Joi.string(),
    lifeCycle: Joi.string(),
    productDesc: Joi.string(),
    vendorProduct: Joi.string(),
    levisProduct: Joi.string(),
    sku: Joi.string(),
    ean: Joi.string(),
    vat: Joi.string(),
    season: Joi.string()
  })
};

const getProduct = {
  params: Joi.object().keys({
    productId: Joi.number().required()
  })
};

const updateProduct = {
  params: Joi.object().keys({
    productId: Joi.number().required()
  }),
  body: Joi.object()
    .keys({
      product: Joi.object().keys({
        categoryId: Joi.number(),
        subCategoryId: Joi.number(),
        brandId: Joi.number(),
        genderId: Joi.number(),
        sizeProfileId: Joi.number(),
        lifeCycleId: Joi.number(),
        seasonId: Joi.number(),
        vatId: Joi.number(),
        vendorProductCode: Joi.string(),
        productDescription: Joi.string(),
        levisProductCodePrefix: Joi.string(),
        levisProductCode: Joi.string(),
        costPrice: Joi.string(),
        lastRun: Joi.date()
      })
    })
    .min(1)
};
const deleteProduct = {
  params: Joi.object().keys({
    productId: Joi.number().required()
  })
};

module.exports = {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct
};
