const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const catchAsync = require('../utils/catchAsync');
const { roomTypeService } = require('../services');

// const createRoomType = async (req, res) => {
//   try{
//   const RoomType = await roomTypeService.createRoomType(req.body);
//   res.status(httpStatus.CREATED).send({ RoomType });
//   }
//   catch (error) {
//     console.error('Error RoomType by id:', error);
//     return res.status(500).json({ error: error });
//   }
// };
const createRoomType = async (req, res) => {
  try {
    const roomType = await roomTypeService.createRoomType(req.body);

    // Assuming createRoomType returns a boolean or the created roomType object
    if (roomType) {
      res.status(httpStatus.CREATED).send({ roomType });
    } else {
      // Handle the case where roomType creation fails for some reason
      return res.status(400).json({ error: "Failed to create the room type." });
    }
  } catch (error) {
    console.error('Error creating room type:', error);

    if (error.name === 'ValidationError') {
      // Handle validation errors (e.g., missing required fields)
      return res.status(400).json({ error: 'Validation error. Please provide all required fields.' });
    } else if (error.name === 'SequelizeUniqueConstraintError') {
      // Handle unique constraint violation (duplicate entry)
      return res.status(400).json({ error: 'Room type with the same details already exists.' });
    } else {
      // Handle other types of errors
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
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
    // Ensure req object and its properties are defined
    if (!req || !req.query) {
      throw new Error('Invalid request object');
    }

    // Extracting query parameters
    const { page = 1, limit = 10, search } = req.query;

    // Call the service function with the correct parameters
    const data = await roomTypeService.getRoomTypeAll(search, { page, limit });

    // Return the data as needed
    res.json({ data });
  }catch (error) {
    // Handle errors and respond with an internal server error
    console.error('Error getting all room types:', error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
  }
};


const updateRoomType = async (req, res) => {
  try {
    const { roomTypeId } = req.params;
    const roomTypeData = req.body;

    const updatedRoomType = await roomTypeService.updateRoomType(roomTypeId, roomTypeData);

    res.status(200).json({ success: true, data: updatedRoomType });
  } catch (error) {
    console.error('Error updating room type:', error);
    res.status(500).json({ success: false, error: 'Error updating room type' });
  }
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
