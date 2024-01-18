const express = require('express');
const validate = require('../../middlewares/validate');
const bookingDetailValidation = require('../../validations/bookingDetails.validation');
const bookingDetailController = require('../../controllers/bookingDetails.controller');

const router = express.Router();

router.post('/createBookingDetail', validate(bookingDetailValidation.createBookingDetail), bookingDetailController.createBookingDetail);
// Add more routes as needed

// GET /api/bookingDetails/:bookingDetailId
router.get('/:bookingDetailId', bookingDetailController.getBookingDetailById);

// PUT /api/bookingDetails/:bookingDetailId
router.put('/:bookingDetailId', validate(bookingDetailValidation.updateBookingDetailValidation), bookingDetailController.updateBookingDetail);

// DELETE /api/bookingDetails/:bookingDetailId
router.delete('/:bookingDetailId', bookingDetailController.deleteBookingDetail);


module.exports = router;
