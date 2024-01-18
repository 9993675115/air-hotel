const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');

const ApiError = require('../utils/ApiError');
const messages = require('../constant/message.json');
const logger = require('../config/logger');
const { RoomType } = require('../models');

const createRoomType = async (roomTypeBody) => {
  const roomType = await RoomType.create(roomTypeBody);
  return roomType;
};
const getRoomTypeById = async (roomTypeId) => {
  const roomType = await RoomType.findByPk(roomTypeId);
  return roomType;
};

const updateRoomType = async (roomTypeId, updatedData) => {
  const roomType = await RoomType.findByPk(roomTypeId);
  if (!roomType) {
    throw new Error('RoomType not found');
  }

  await roomType.update(updatedData);
  return roomType;
};

const deleteRoomType = async (roomTypeId) => {
  const roomType = await RoomType.findByPk(roomTypeId);
  if (!roomType) {
    throw new Error('RoomType not found');
  }

  await roomType.destroy();
};

module.exports = {
  createRoomType,
  getRoomTypeById,
  updateRoomType,
  deleteRoomType,
  // Add more service methods as needed
};
