const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const catchAsync = require('../utils/catchAsync');
const bookingDetailService  = require('../services');

const createBookingDetail = catchAsync(async (req, res) => {
  let userBody = req.body;
  const data = await bookingDetailService.createBookingDetail(userBody);
  console.log("--------------------------------------------",data)
  if (data) {
    await res.status(200).send({ message: 'created successfully' });
  } else {
    await res.status(404).send({ message: 'not created' });
  }
});
const getBookingDetailById = async (req, res) => {
  const userBody=req.body
  const data =await bookingDetailService.getBookingDetailById(userBody)
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
    const updateBookingDetailbooking = await bookingDetailService.updateBookingDetail(bookingDetailId, updatedData);
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
  const deleteBookingDetail = await bookingDetailService.deleteBookingDetail(querry);
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
