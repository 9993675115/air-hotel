const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');

const ApiError = require('../utils/ApiError');
const messages = require('../constant/message.json');
const logger = require('../config/logger');
const { Room } = require('../models');

const createRoom = async (_userBody) => {
  const userBody = _userBody;
  console.log("-----------",userBody)
  return Room.create(userBody);
};

const getRoomById = async (roomId) => {
  try {
    const room = await Room.findByPk(roomId);
    return room;
  } catch (error) {
    console.error('Error fetching room by ID:', error);
    throw error;
  }
};
const getAllRoom = async () => {
  try {
    const room = await Room.findAll({
      where: {
        status: true,
      
      }
    });
    return room;
  } catch (error) {
    console.error('Error getting all room:', error);
    throw error;
  }
};


const updateRoom = async (roomId, updateData) => {
  try {
    const data = await Room.update(updateData, {
      where: { id: roomId },
      returning: true,
      // plain: true,
    });

    if (data) {
      return data;
    } else {
      throw new Error('Room not found');
    }
  } catch (error) {
    console.error('Error updating room in service:', error);
    throw error;
  }
};


const deleteRoom = async (roomId) => {
  try {
    if (!roomId) {
      throw new Error('roomId is required for deletion.');
    }

    const deletedRowsCount = await Room.update({ status: false }, {
      where: { id: roomId }
    });

    return deletedRowsCount;
  } catch (error) {
    console.error('Error deleting room by id:', error);
    throw error;
  }
};


module.exports = {
  createRoom,
  getRoomById,
  updateRoom,
  deleteRoom,
  getAllRoom
  // Add more service methods as needed
};
