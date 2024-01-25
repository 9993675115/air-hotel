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
  try {
    const bookingDetailId = req.params.bookingDetailId;

    // Check if bookingDetailId is falsy or not a positive integer
    if (!bookingDetailId || isNaN(bookingDetailId) || bookingDetailId <= 0) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'Invalid booking detail ID' });
    }

    const deletedRowsCount = await bookingDetailsService.bookingDetailsService.deleteBookingDetail(bookingDetailId);

    if (deletedRowsCount > 0) {
      res.status(httpStatus.OK).json({ message: 'Deleted successfully' });
    } else {
      res.status(httpStatus.NO_CONTENT).json({ message: 'Error in deletion' });
    }
  } catch (error) {
    console.error('Error deleting booking detail by id:', error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
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
