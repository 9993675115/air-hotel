// controllers/categoryController.js
const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const catchAsync = require('../utils/catchAsync');

const categoryServices = require('../services');


const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryServices.categoryService.getAllCategories();
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Example in your route or controller
const getCategoryById = async (req, res) => {
  const categoryId = req.params.categoryId;
  try {
    const category = await categoryServices.categoryService.getCategoryById(categoryId); // Correct the way you call getCategoryById
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    return res.status(200).json(category);
  } catch (error) {
    console.error('Error retrieving category by ID:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


const createCategory = async (req, res) => {
  const category = await categoryServices.categoryService.createCategory(req.body);
  res.status(httpStatus.CREATED).send({ message: "Category added successfully" });
};
const updateCategory = catchAsync(async (req, res) => {
  const categoryId = req.params.categoryId;
  const updateData = req.body;

  const updatedCategory = await categoryServices.categoryService.updateCategory(categoryId, updateData);

  res.status(httpStatus.OK).json(updatedCategory);
});

const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    // Ensure categoryId is defined before calling deleteCategory
    if (!categoryId) {
      return res.status(400).json({ error: 'CategoryId is required' });
    }

    const deletedRowsCount = await categoryServices.categoryService.deleteCategory(categoryId);

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
