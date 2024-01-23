// routes/categoryRoutes.js
const express = require('express');
const validate = require('../../middlewares/validate');
const categoryController = require('../../controllers/category.controller');
const categoryValidation = require('../../validations/category.validation');

const router = express.Router();

router.post('/createcategory', validate(categoryValidation.createCategorySchema), categoryController.createCategory);
// Add more routes as needed

// GET /api/bookings/:bookingId
router.get('/:categoryId', validate(categoryValidation.getCategorySchema),categoryController.getCategoryById);

router.get('/', categoryController.getAllCategories);

// PUT /api/bookings/:bookingId
router.put('/:categoryId', validate(categoryValidation.updateCategorySchema), categoryController.updateCategory);

// DELETE /api/bookings/:bookingId
router.delete('/:categoryId', categoryController.deleteCategory);


module.exports = router;
