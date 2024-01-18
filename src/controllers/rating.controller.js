const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const catchAsync = require('../utils/catchAsync');
const { ratingService } = require('../services');

const createRating = catchAsync(async (req, res) => {
  let userBody = req.body;
  const data = await ratingService.createRating(userBody);
  console.log("--------------------------------------------",data)
  if (data) {
    await res.status(200).send({ message: 'created successfully' });
  } else {
    await res.status(404).send({ message: 'not created' });
  }
});

const getRatingById = async (req, res) => {
  const userBody=req.body
  const data =await ratingService.getRatingById(userBody)
  if(data){
    res.status(200).send('GET booking by ID');
  }else{
    res.status(404).send('not found');
  }
  };
  
  const updateRating = async (req, res) => {
    try {
      const ratingId = req.params;
      const updatedData = req.body;
      const updateRating = await ratingService.updateRating(ratingId, updatedData);
      if (updateRating) {
        res.status(200).send({ data: updatedData, message: ' updated successfully' });
      } else {
        res.status(404).send({ message:' not found', status: 0 });
      }
    } catch (error) {
      console.error('Error updating :', error);
      res.status(500).send({ message: 'Internal server error', status: -1 });
    }
  };
  
  const deleteRating = async (req, res) => {
    // Implementation to delete booking by ID
  const deleteRating = await ratingService.deleteRating(querry);
  if (deleteRating) {
    res.status(httpStatus.OK).send({ message: ' deleted successfully' });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in  delete' });
  }
  };

module.exports = {
  createRating,
  getRatingById,
  updateRating,
  deleteRating,
  // Add more controller methods as needed
};
