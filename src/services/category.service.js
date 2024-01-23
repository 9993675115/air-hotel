const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');

const ApiError = require('../utils/ApiError');
const messages = require('../constant/message.json');
const logger = require('../config/logger');

// services/categoryService.js
const {Category} = require('../models');

// You can add business logic or additional database interactions here if needed

const createCategory = async (_userBody) => {
    const userBody= _userBody;
    // console.log("-----------", _userBody);
    try {
      const result = await Category.create(userBody);
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
      throw error; // Rethrow the error to handle it at a higher level if needed
    }
  };
 
  const getAllCategories = async () => {
    try {
      const categorys = await Category.findAll();
      return categorys;
    } catch (error) {
      console.error('Error getting all hotels:', error);
      throw error;
    }
  };
  const getCategoryById = async (categoryId) => {
    try {
      const categorys = await Category.findByPk(categoryId);
      return categorys;
    } catch (error) {
      console.error('Error retrieving users:', error);
      throw error;
    }
  };
  const updateCategory = async (categoryId, categoryData) => {
    const category = await Category.findByPk(categoryId);
    if (!category) {
      throw new Error('Category not found');
    }
    await category.update(categoryData);
    return category;
  };
  const deleteCategory = async (id) => {
    try {
      const deletedRowsCount = await Category.update({status:false},{
        where: { id }
      });
      return deletedRowsCount;
    } catch (error) {
      console.error('Error deleting category by id:', error);
      throw error;
    }
  };
  
  
  
  
  
 
  module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
  }
