const express = require('express');
const validate = require('../../middlewares/validate');
const roomTypeValidation = require('../../validations/roomTypes.validation');
const roomTypeController = require('../../controllers/roomTypes.controller');

const router = express.Router();

router.post('/createRoomType', validate(roomTypeValidation.createRoomType), roomTypeController.createRoomType);
// Add more routes as needed

router.get('/:roomTypeId', validate(roomTypeValidation.getRoomTypeValidation), roomTypeController.getRoomTypeById);

router.get('/', roomTypeController.getRoomTypeAll);

// PUT /api/roomTypes/:roomTypeId
router.put('/:roomTypeId', validate(roomTypeValidation.updateRoomTypeValidation), roomTypeController.updateRoomType);

// DELETE /api/roomTypes/:roomTypeId
router.delete('/:roomTypeId', roomTypeController.deleteRoomType);

module.exports = router;
