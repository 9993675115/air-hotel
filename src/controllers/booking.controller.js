const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const catchAsync = require('../utils/catchAsync');
const { bookingService } = require('../services');

const createBooking = catchAsync(async (req, res) => {
  let userBody = req.body;
  const data = await bookingService.createBooking(userBody);
  console.log("--------------------------------------------",data)
  if (data) {
    await res.status(200).send({ message: 'created successfully' });
  } else {
    await res.status(404).send({ message: 'not created' });
  }
});

const getBookingById = async (req, res) => {
  const userBody=req.body
  const data =await bookingService.getBookingById(userBody)
  if(data){
    res.status(200).send('GET booking by ID');
  }else{
    res.status(404).send('not found');
  }
};

const updateBooking = async (req, res) => {
  try {
    const bookingId = req.params;
    const updatedData = req.body;
    const updatedbooking = await bookingService.updateBooking(bookingId, updatedData);
    if (updatedbooking) {
      res.status(200).send({ data: updatedData, message: ' updated successfully' });
    } else {
      res.status(404).send({ message:' not found', status: 0 });
    }
  } catch (error) {
    console.error('Error updating :', error);
    res.status(500).send({ message: 'Internal server error', status: -1 });
  }
};

const deleteBooking = async (req, res) => {
  // Implementation to delete booking by ID
  const deletebooking = await bookingService.deleteBooking(querry);
  if (deletebooking) {
    res.status(httpStatus.OK).send({ message: ' deleted successfully' });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in  delete' });
  }
};

module.exports = {
  createBooking,
  getBookingById,
  updateBooking,
  deleteBooking
  // Add more controller methods as needed
};
