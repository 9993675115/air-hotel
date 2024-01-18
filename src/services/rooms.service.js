const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');

const ApiError = require('../utils/ApiError');
const messages = require('../constant/message.json');
const logger = require('../config/logger');
const { Room } = require('../models');

const createRoom = async (_userBody) => {
  const userBody = _userBody;
  console.log("-----------",userBody)
  return Booking.create(userBody);
};

const getRoomById = async () => {
  try {
    const data = await Room.findAll();
    return data;
  } catch (error) {
    console.error('Error retrieving users:', error);
    throw error;
  }
};

const updateRoom = async (roomId, updatedData) => {
  try {
    const findData = await User.findOne({
      where: { roomId: roomId }
    });
    if (findData) {
      await Booking.update(updatedData, { where: { roomId: roomId } });
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error updating user by id:', error);
    throw error;
  }
};

const deleteRoom = async (roomId) => {
  try {
    const deletedRowsCount = await Room.destroy({
      where: { roomId: roomId }
    });
    return deletedRowsCount;
  } catch (error) {
    console.error('Error deleting user by id:', error);
    throw error;
  }
};
module.exports = {
  createRoom,
  getRoomById,
  updateRoom,
  deleteRoom,
  // Add more service methods as needed
};
