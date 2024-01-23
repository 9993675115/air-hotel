const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const catchAsync = require('../utils/catchAsync');
const bookingDetailsService  = require('../services');

const createBookingDetail = catchAsync(async (req, res) => {
  const BookingDetail = await bookingDetailsService.bookingDetailsService.createBookingDetails(req.body);
  res.status(httpStatus.CREATED).send({ BookingDetail });
});
const getBookingDetailById = async (req, res) => {
  try {
    const { bookingDetailId } = req.params;

    const bookingDetail = await bookingDetailsService.bookingDetailsService.getBookingDetailById(bookingDetailId);

    if (bookingDetail) {
      res.status(200).send({ data: bookingDetail, message: 'GET booking detail by ID' });
    } else {
      res.status(404).send({ message: 'Booking detail not found', status: 0 });
    }
  } catch (error) {
    console.error('Error fetching booking detail by ID:', error);
    res.status(500).send({ message: 'Internal server error', status: -1 });
  }
};
const getAllBookingDetail = async (req, res) => {
  try {
    const bookingDetails = await bookingDetailsService.bookingDetailsService.getAllBookingDetails();
    res.status(httpStatus.OK).json(bookingDetails);
  } catch (error) {
    console.error('Error getting all booking details:', error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
  }
};

const updateBookingDetail = async (req, res) => {
  try {
    // Extracting bookingId from req.params
    const { bookingDetailId } = req.params;

    // Assuming you have validated your req.body using Joi or other validation middleware
    const updatedData = req.body;

    const updateBookingDetail = await bookingDetailsService.bookingDetailsService.updateBookingDetail(bookingDetailId, updatedData);

    if (updateBookingDetail) {
      res.status(200).send({ data: updatedData, message: 'Updated successfully' });
    } else {
      res.status(404).send({ message: 'Not found', status: 0 });
    }
  } catch (error) {
    console.error('Error updating :', error);
    res.status(500).send({ message: 'Internal server error', status: -1 });
  }
};

const deleteBookingDetail = async (req, res) => {
  const id = req.params.id;
  const deleteBookingDetail = await bookingDetailsService.bookingDetailsService.deleteBookingDetail(id);
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
  getAllBookingDetail
  // Add more controller methods as needed
};
