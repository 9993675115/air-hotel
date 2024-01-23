const express = require('express');
const validate = require('../../middlewares/validate');
const hotelValidation = require('../../validations/hotel.validation');
const hotelController = require('../../controllers/hotel.controller');

const router = express.Router();


router.post('/hotels', validate(hotelValidation.createHotelSchema), hotelController.createHotel);
// Add more routes as needed

// GET /api/bookings/:bookingId
router.get('/:id', validate(hotelValidation.getHotelSchema),hotelController.getHotelById);

router.get('/', hotelController.getAllHotels);

// PUT /api/bookings/:bookingId
router.put('/:id', validate(hotelValidation.updateHotelSchema), hotelController.updateHotel);

// DELETE /api/bookings/:bookingId
router.delete('/:id', hotelController.deleteHotel);


module.exports = router;
