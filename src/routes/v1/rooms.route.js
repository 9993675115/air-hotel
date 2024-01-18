const express = require('express');
const validate = require('../../middlewares/validate');
const roomValidation = require('../../validations/rooms.validation');
const roomController = require('../../controllers/rooms.controller');

const router = express.Router();

router.post('/createRoom', validate(roomValidation.createRoom), roomController.createRoom);
// Add more routes as needed
// GET /api/rooms/:roomId
router.get('/:roomId', roomController.getRoomById);

// PUT /api/rooms/:roomId
router.put('/:roomId', validate(roomValidation.updateRoomValidation), roomController.updateRoom);

// DELETE /api/rooms/:roomId
router.delete('/:roomId', roomController.deleteRoom);

module.exports = router;
