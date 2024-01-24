const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const catchAsync = require('../utils/catchAsync');
const { roomTypeService } = require('../services');

const createRoomType = async (req, res) => {
  const RoomType = await roomTypeService.createRoomType(req.body);
  res.status(httpStatus.CREATED).send({ RoomType });
};

const getRoomTypeById = async (req, res) => {
  try {
    const roomTypeId = req.params.roomTypeId;

    // Fetch the room type by ID from the service
    const roomType = await roomTypeService.getRoomTypeById(roomTypeId);

    if (!roomType) {
      // If room type is not found, send a 404 response
      return res.status(404).json({ message: 'Room type not found' });
    }

    // Send the room type as a JSON response
    res.json(roomType);
  } catch (error) {
    console.error('Error getting room type by ID:', error);
    // Handle other errors and send an appropriate response
    res.status(500).json({ message: 'Internal server error' });
  }
};
const getRoomTypeAll = async (req, res) => {
  try {
    // Call the service function to get all room types
    const roomTypes = await roomTypeService.getRoomTypeAll();

    // Respond with the room types
    res.status(httpStatus.OK).json(roomTypes);
  } catch (error) {
    // Handle errors and respond with an internal server error
    console.error('Error getting all room types:', error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
  }
};


const updateRoomType = async (req, res) => {
  // Implementation to update room type by ID
  res.status(200).send('Update Room Type');
};

const deleteRoomType = async (req, res) => {
  // Implementation to delete room type by ID
  res.status(204).send();
};


module.exports = {
  createRoomType,
  getRoomTypeById,
  updateRoomType,
  deleteRoomType,
  getRoomTypeAll
  // Add more controller methods as needed
};
