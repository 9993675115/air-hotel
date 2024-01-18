const express = require('express');
const validate = require('../../middlewares/validate');
const bookingValidation = require('../../validations/booking.validation');
const bookingController = require('../../controllers/booking.controller');

const router = express.Router();

router.post('/createBooking', validate(bookingValidation.createBooking), bookingController.createBooking);
// Add more routes as needed

// GET /api/bookings/:bookingId
router.get('/:bookingId', bookingController.getBookingById);

// PUT /api/bookings/:bookingId
router.put('/:bookingId', validate(bookingValidation.updateBookingValidation), bookingController.updateBooking);

// DELETE /api/bookings/:bookingId
router.delete('/:bookingId', bookingController.deleteBooking);

module.exports = router;
