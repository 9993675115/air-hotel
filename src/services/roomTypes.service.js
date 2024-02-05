const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');

const ApiError = require('../utils/ApiError');
const messages = require('../constant/message.json');
const logger = require('../config/logger');
const { RoomType } = require('../models');
const { Sequelize, Op, DataTypes } = require('sequelize');

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
const getRoomTypeAll = async (query, options) => {
  try {
    if (isNaN(query)) {
      const limit = Number(options.limit);
      const offset = options.page ? limit * (options.page - 1) : 0;

      // Ensure the query is a string
      const searchString = query ? query.toString() : '';

      // Define the where clause for search
      const whereClause = searchString ? {
        [Sequelize.Op.or]: {
          typeName: { [Sequelize.Op.iLike]: `%${searchString}%` },
          // description: { [Sequelize.Op.iLike]: `%${searchString}%` },
         
          // Add more fields as needed
        }
      } : {};

      const data = await RoomType.findAndCountAll({
        where: whereClause,
        order: [['updatedAt', 'DESC']],
        limit,
        offset,
      });

      return data;
    } else {
      console.log('Query is empty or undefined.');

      const data = await RoomType.findAll({
        where: { status: true },
        // include: Booking
      });

      console.log('Returned All RoomType Data:', data);
      return data;
    }
  } catch (error) {
    console.error('Error getting all RoomType:', error);
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
