const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const catchAsync = require('../utils/catchAsync');
const bookingDetailsService  = require('../services');

const createBookingDetail = catchAsync(async (req, res) => {
  const BookingDetail = await bookingDetailsService.bookingDetailsService.createBookingDetails(req.body);
  res.status(httpStatus.CREATED).send({ BookingDetail });
});
const getBookingDetailById = async (req, res) => {
  const userBody=req.body
  const data =await bookingDetailsService.bookingDetailsService.getBookingDetailById(userBody)
  if(data){
    res.status(200).send('GET booking by ID');
  }else{
    res.status(404).send('not found');
  }
};

const updateBookingDetail = async (req, res) => {
  try {
    const bookingDetailId = req.params;
    const updatedData = req.body;
    const updateBookingDetailbooking = await bookingDetailsService.bookingDetailsService.updateBookingDetail(bookingDetailId, updatedData);
    if (updateBookingDetailbooking) {
      res.status(200).send({ data: updatedData, message: ' updated successfully' });
    } else {
      res.status(404).send({ message:' not found', status: 0 });
    }
  } catch (error) {
    console.error('Error updating :', error);
    res.status(500).send({ message: 'Internal server error', status: -1 });
  }
};

const deleteBookingDetail = async (req, res) => {
  const querry = req.params;
  const deleteBookingDetail = await bookingDetailsService.bookingDetailsService.deleteBookingDetail(querry);
  if (deleteBookingDetail) {
    res.status(httpStatus.OK).send({ message: ' deleted successfully' });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in  delete' });
  }
};

module.exports = {
  createBookingDetail,
  getBookingDetailById,
  updateBookingDetail,
  deleteBookingDetail,
  // Add more controller methods as needed
};
