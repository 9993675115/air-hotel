const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const catchAsync = require('../utils/catchAsync');
const { roomsService } = require('../services');

const createRoom = catchAsync(async (req, res) => {
  const Room = await roomsService.createRoom(req.body);
  res.status(httpStatus.CREATED).send({ Room });
});
const getRoomById = async (req, res) => {
  const roomId = req.params.roomId; // Corrected: Retrieve the roomId from req.params
  try {
    const data = await roomsService.getRoomById(roomId);
    if (data) {
      res.status(200).send(data); // Corrected: Send the data directly
    } else {
      res.status(404).send({ message: 'Not found' });
    }
  } catch (error) {
    console.error('Error fetching room by ID:', error);
    res.status(500).send({ message: 'Internal server error', status: -1 });
  }
};
const getAllRoom = catchAsync(async (req, res) => {
  const Room = await roomsService.getAllRoom();
  res.status(httpStatus.OK).json(Room);
});



const updateRoom = async (req, res) => {
  const { roomId } = req.params;
  const updateData = req.body;

  try {
    const updatedRoom = await roomsService.updateRoom(roomId, updateData);

    res.status(200).json({
      // success: true,
      message: 'Room updated successfully',
      data: updatedRoom,
    });
  } catch (error) {
    if (error.message === 'Room not found') {
      res.status(404).json({
        // success: false,
        message: 'Room not found',
      });
    } else {
      console.error('Error updating room in controller:', error);
      res.status(500).json({
        // success: false,
        message: 'Internal server error',
      });
    }
  }
};

const deleteRoom = async (req, res) => {
  try {
    const roomId = req.params.roomId; // Assuming roomId is in the route parameters
    const deletedRowsCount = await roomsService.deleteRoom(roomId);

    if (deletedRowsCount > 0) {
      res.status(httpStatus.OK).send({ message: 'Room deleted successfully' });
    } else {
      res.status(httpStatus.NOT_FOUND).send({ message: 'Room not found' });
    }
  } catch (error) {
    console.error('Error deleting room by id:', error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Internal server error' });
  }
};


module.exports = {
  createRoom,
  getRoomById,
  updateRoom,
  deleteRoom,
  getAllRoom
  // Add more controller methods as needed
};
