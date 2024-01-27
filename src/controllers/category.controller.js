// controllers/categoryController.js
const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const catchAsync = require('../utils/catchAsync');

const categoryServices = require('../services/category.service');


const getAllCategories = async (req, res) => {
  try {
    const category = await categoryServices.getAllCategories() ;
    res.status(httpStatus.OK).json(category);
  } catch (error) {
    console.error('Error getting all category:', error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
  }
};

// Example in your route or controller
const getCategoryById = async (req, res) => {
  const categoryId = req.params.categoryId;
  try {
    const category = await categoryServices.getCategoryById(categoryId); // Correct the way you call getCategoryById
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    return res.status(200).json(category);
  } catch (error) {
    console.error('Error retrieving category by ID:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


// const createCategory = async (req, res) => {
  
//   try{
//     const category = await categoryServices.createCategory(req.body);
//     if(category){
//       res.status(httpStatus.CREATED).send({ message: "Category added successfully" });
//     }
//   }catch (error) {
//     console.error('Error deleting category by id:', error);
//     return res.status(500).json({ error: error });
//   }

// };
const createCategory = async (req, res) => {
  try {
    const category = await categoryServices.createCategory(req.body);

    // Assuming createCategory returns a boolean indicating success
    if (category) {
      res.status(httpStatus.CREATED).send({ message: "Category added successfully" });
    } else {
      // Handle the case where category creation fails for some reason
      return res.status(400).json({ error: "Failed to create the category." });
    }
  } catch (error) {
    console.error('Error creating category:', error);

    if (error.name === 'ValidationError') {
      // Handle validation errors (e.g., missing required fields)
      return res.status(400).json({ error: 'Validation error. Please provide all required fields.' });
    } else if (error.name === 'SequelizeUniqueConstraintError') {
      // Handle unique constraint violation (duplicate entry)
      return res.status(400).json({ error: 'Category with the same details already exists.' });
    } else {
      // Handle other types of errors
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};

const updateCategory = catchAsync(async (req, res) => {
  const categoryId = req.params.categoryId;
  const updateData = req.body;

  const updatedCategory = await categoryServices.updateCategory(categoryId, updateData);

  res.status(httpStatus.OK).json(updatedCategory);
});

const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    // Ensure categoryId is defined before calling deleteCategory
    if (!categoryId) {
      return res.status(400).json({ error: 'CategoryId is required' });
    }

    const deletedRowsCount = await categoryServices.deleteCategory(categoryId);

    if (!deletedRowsCount) {
      return res.status(404).json({ error: 'Category not found' });
    }

    return res.status(200).send({ message: 'Category deleted successfully' });

  } catch (error) {
    console.error('Error deleting category by id:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
};
