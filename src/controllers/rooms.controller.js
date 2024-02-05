const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const catchAsync = require('../utils/catchAsync');
const { roomsService } = require('../services');

// const createRoom = catchAsync(async (req, res) => {
//   try{
//   const Room = await roomsService.createRoom(req.body);
//   res.status(httpStatus.CREATED).send({ Room });
//   }
//   catch (error) {
//     console.error('Error Room by id:', error);
//     return res.status(500).json({ error: error });
//   }
// });
const createRoom = catchAsync(async (req, res) => {
  try {
    const room = await roomsService.createRoom(req.body);

    // Assuming createRoom returns a boolean or the created room object
    if (room) {
      res.status(httpStatus.CREATED).send({ room });
    } else {
      // Handle the case where room creation fails for some reason
      return res.status(400).json({ error: "Failed to create the room." });
    }
  } catch (error) {
    console.error('Error creating room:', error);

    if (error.name === 'ValidationError') {
      // Handle validation errors (e.g., missing required fields)
      return res.status(400).json({ error: 'Validation error. Please provide all required fields.' });
    } else if (error.name === 'SequelizeUniqueConstraintError') {
      // Handle unique constraint violation (duplicate entry)
      return res.status(400).json({ error: 'Room with the same details already exists.' });
    } else {
      // Handle other types of errors
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
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
  try {
    // Ensure req object and its properties are defined
    if (!req || !req.query) {
      throw new Error('Invalid request object');
    }

    // Extracting query parameters
    const { page = 1, limit = 10, search } = req.query;

    // Call the service function with the correct parameters
    const data = await roomsService.getAllRoom(search, { page, limit });

    // Return the data as needed
    res.json({ data });
  } catch (error) {
    console.error('Error getting rooms :', error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Error getting rooms' });
  }
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
