const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');

const ApiError = require('../utils/ApiError');
const messages = require('../constant/message.json');
const logger = require('../config/logger');
const { RoomType } = require('../models');

const createRoomType = async (_userBody) => {
  const userBody = _userBody;
  console.log("-----------",userBody)
  return RoomType.create(userBody);
};
const getRoomTypeById = async (roomTypeId) => {
  try {
    // Fetch the room type by ID from the database
    const roomType = await RoomType.findByPk(roomTypeId);

    if (!roomType) {
      // If room type is not found, return null or throw an error
      return null;
    }

    return roomType;
  } catch (error) {
    console.error('Error fetching room by ID:', error);
    throw error;
  }
};
const getRoomTypeAll = async () => {
  try {
    // Fetch all room types from the database
    const roomTypes = await RoomType.findAll({ where: { status: true } });

    // Return the result
    return roomTypes;
  } catch (error) {
    // Handle errors (you can log or throw an error)
    console.error('Error getting all room types:', error);
    throw error;
  }
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
  getRoomTypeAll
  // Add more service methods as needed
};
