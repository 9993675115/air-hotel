const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const catchAsync = require('../utils/catchAsync');
const { roomTypeService } = require('../services');

const createRoomType = catchAsync(async (req, res) => {
  const roomType = await roomTypeService.createRoomType(req.body);
  res.status(httpStatus.CREATED).send({ roomType });
});
const getRoomTypeById = async (req, res) => {
  // Implementation to get room type by ID
  res.status(200).send('GET Room Type by ID');
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
  deleteRoomType
  // Add more controller methods as needed
};
