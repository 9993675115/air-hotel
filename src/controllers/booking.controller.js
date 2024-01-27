const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const catchAsync = require('../utils/catchAsync');
const { bookingService } = require('../services');

// const createBooking = catchAsync(async (req, res) => {
//  try{
  
//   const booking = await bookingService.createBooking(req.body);
//   res.status(httpStatus.CREATED).send({ booking });
//   }
//   catch (error) {
//     console.error('Error booking by id:', error);
//     return res.status(500).json({ error: error });
//   }
// });

const createBooking = catchAsync(async (req, res) => {
  try {
    const booking = await bookingService.createBooking(req.body);
    res.status(httpStatus.CREATED).send({ booking });
  } catch (error) {
    console.error('Error creating booking:', error);

    if (error.name === 'ValidationError') {
      // Handle validation errors (e.g., missing required fields)
      return res.status(400).json({ error: 'Validation error. Please provide all required fields.' });
    } else if (error.name === 'SequelizeUniqueConstraintError') {
      // Handle unique constraint violation (duplicate entry)
      return res.status(400).json({ error: 'Booking with the same details already exists.' });
    } else {
      // Handle other types of errors
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});

const getBookingById = async (req, res) => {
  try {
    const bookingId= req.params.bookingId; // Assuming bookingId is in req.params

    const data = await bookingService.getBookingById(bookingId);

    if (data) {
      res.status(200).send({ data, message: 'GET booking by ID' });
    } else {
      res.status(404).send({ message: 'Not found', status: 0 });
    }
  } catch (error) {
    console.error('Error fetching booking by ID:', error);
    res.status(500).send({ message: 'Internal server error', status: -1 });
  }
};
const getAllBooking = catchAsync(async (req, res) => {
  const bookings = await bookingService.getAllBooking();
  res.status(httpStatus.OK).json(bookings);
});



const updateBooking = async (req, res) => {
  try {
    // Extracting bookingId from req.params
    const { bookingId } = req.params;

    // Assuming you have validated your req.body using Joi or other validation middleware
    const updatedData = req.body;

    const updateBooking = await bookingService.updateBooking(bookingId, updatedData);

    if (updateBooking) {
      res.status(200).send({ data: updatedData, message: 'Updated successfully' });
    } else {
      res.status(404).send({ message: 'Not found', status: 0 });
    }
  } catch (error) {
    console.error('Error updating :', error);
    res.status(500).send({ message: 'Internal server error', status: -1 });
  }
};


const deleteBooking = async (req, res) => {
  // Implementation to delete booking by ID
  const idere = req.params.bookingId;
  const deletebooking = await bookingService.deleteBooking(idere);
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
  deleteBooking,
  getAllBooking
  // Add more controller methods as needed
};
