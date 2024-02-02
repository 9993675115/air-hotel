const express = require('express');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const roomValidation = require('../../validations/rooms.validation');
const roomController = require('../../controllers/rooms.controller');

const router = express.Router();

router.post('/createRoom', validate(roomValidation.createRoomSchema), roomController.createRoom);
// Add more routes as needed
// GET /api/rooms/:roomId
router.get('/:roomId', validate(roomValidation.getRoomValidation), roomController.getRoomById);

router.get('/', roomController.getAllRoom);

// PUT /api/rooms/:roomId
router.put('/:roomId', validate(roomValidation.updateRoomValidationSchema), roomController.updateRoom);

// DELETE /api/rooms/:roomId
router.delete('/:roomId', roomController.deleteRoom);

module.exports = router;
