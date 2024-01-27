const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const catchAsync = require('../utils/catchAsync');
const { ratingService } = require('../services');

// const createRating = catchAsync(async (req, res) => {
//   try{
//   const ratings = await ratingService.createRating(req.body);
//   res.status(httpStatus.CREATED).send({ ratings });
//   }
//   catch (error) {
//     console.error('Error ratings by id:', error);
//     return res.status(500).json({ error: error });
//   }
// });

const createRating = catchAsync(async (req, res) => {
  try {
    const ratings = await ratingService.createRating(req.body);

    // Assuming createRating returns a boolean or the created rating object
    if (ratings) {
      res.status(httpStatus.CREATED).send({ ratings });
    } else {
      // Handle the case where rating creation fails for some reason
      return res.status(400).json({ error: "Failed to create the rating." });
    }
  } catch (error) {
    console.error('Error creating rating:', error);

    if (error.name === 'ValidationError') {
      // Handle validation errors (e.g., missing required fields)
      return res.status(400).json({ error: 'Validation error. Please provide all required fields.' });
    } else if (error.name === 'SequelizeUniqueConstraintError') {
      // Handle unique constraint violation (duplicate entry)
      return res.status(400).json({ error: 'Rating with the same details already exists.' });
    } else {
      // Handle other types of errors
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});

const getRatingById = async (req, res) => {
  try {
    const ratingId = req.params.ratingId;

    // The ratingId is already validated by the middleware, so no need for additional validation here

    const rating = await ratingService.getRatingById(ratingId);

    res.status(httpStatus.OK).json({ rating });
  } catch (error) {
    console.error('Error getting rating by ID:', error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
  }
};
const updateRating = async (req, res) => {
  try {
    const ratingId = req.params.ratingId;
    const updateData = req.body;

    // The ratingId and updateData are already validated by the middleware, so no need for additional validation here

    const updatedRating = await ratingService.updateRating(ratingId, updateData);

    res.status(httpStatus.OK).json({ updatedRating });
  } catch (error) {
    console.error('Error updating rating by ID:', error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
  }
};

const getAllRating = async (req, res) => {
  const userId = req.params.ratingId;

  try {
    const ratings = await ratingService.getAllRating(userId);

    res.status(httpStatus.OK).send({ ratings });
  } catch (error) {
    console.error('Error getting ratings by user ID:', error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Error getting ratings' });
  }
};
  const deleteRating = async (req, res) => {
    const ratingId = req.params.ratingId;

    try {
      const deletedRowCount = await ratingService.deleteRating(ratingId);
  
      if (deletedRowCount > 0) {
        res.status(httpStatus.OK).send({ message: 'Rating deleted successfully' });
      } else {
        res.status(httpStatus.NOT_FOUND).send({ message: 'Rating not found' });
      }
    } catch (error) {
      console.error('Error deleting rating by ID:', error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Error deleting rating' });
    }
  };

module.exports = {
  createRating,
  getRatingById,
  updateRating,
  deleteRating,
  getAllRating
  // Add more controller methods as needed
};
