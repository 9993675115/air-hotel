const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');

const ApiError = require('../utils/ApiError');
const messages = require('../constant/message.json');
const logger = require('../config/logger');

// services/categoryService.js
const {Category} = require('../models');

const { Sequelize } = require('sequelize');

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
 
  const getAllCategories = async (query, options) => {
    try {
      if(query){
        const limit = Number(options.limit);
        const offset = options.page ? limit * (options.page - 1) : 0;
    
        // Ensure the query is a string
        const searchString = query ? query.toString() : '';
        
    
        // Define the where clause for search
        const whereClause = searchString ? {
          [Sequelize.Op.or]: {
            name: { [Sequelize.Op.iLike]: `%${searchString}%` },
            // Add more fields as needed
          }
        } : {};
    
        // Log relevant variables
    
        const data = await Category.findAndCountAll({
          where: whereClause,
          order: [['updatedAt', 'DESC']],
          limit,
          offset,
        });
    
        return data;
      }else{
        const data = await Category.findAll({
          where: {
            status: true,
            // isActive: true,
          },
        });
        return data;
      }
     
    } catch (error) {
      console.error('Error getting users:', error);
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
  const updateCategory = async (categoryId, updateData) => {
    // Ensure updateData is not empty before updating
    if (Object.keys(updateData).length === 0) {
      throw new Error('Update data cannot be empty');
    }
  
    // Validate that the category with the given ID exists
    const existingCategory = await Category.findByPk(categoryId);
    if (!existingCategory) {
      throw new Error('Category not found');
    }
  
    // Perform the update
    await Category.update(updateData, { where: { id: categoryId } });
  
    // Fetch and return the updated category after the update operation
    const updatedCategory = await Category.findByPk(categoryId);
    return updatedCategory;
  };
  
  
  const deleteCategory = async (id) => {
    try {
      const [affectedRowsCount, affectedRows] = await Category.update(
        { status: false },
        { where: { id } }
      );
      
      return affectedRowsCount;

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
