const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');

const ApiError = require('../utils/ApiError');
const messages = require('../constant/message.json');
const logger = require('../config/logger');
const { Room } = require('../models');
const { Sequelize, Op, DataTypes } = require('sequelize');

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
const getAllRoom = async (query, options) => {
  try {
    if (isNaN(query)) {
      const limit = Number(options.limit);
      const offset = options.page ? limit * (options.page - 1) : 0;

      // Ensure the query is a string
      const searchString = query ? query.toString() : '';

      // Define the where clause for search
      const whereClause = searchString ? {
        [Sequelize.Op.or]: {
          roomType: { [Sequelize.Op.iLike]: `%${searchString}%` },
          roomType2: { [Sequelize.Op.iLike]: `%${searchString}%` },
         
          // Add more fields as needed
        }
      } : {};

      const data = await Room.findAndCountAll({
        where: whereClause,
        order: [['updatedAt', 'DESC']],
        limit,
        offset,
      });

      return data;
    } else {
      const limit = Number(options.limit);
      const offset = options.page ? limit * (options.page - 1) : 0;

      // Ensure the query is a string
      const searchString = query ? query.toString() : '';

      // Define the where clause for search
      const whereClause = searchString ? {
        [Sequelize.Op.or]: {
          hotelId:  { [Op.eq]: searchString },
          monthlyCharge: { [Op.eq]: searchString },
          weeklyCharge: { [Op.eq]: searchString },
          roomNumber: { [Op.eq]: searchString },
          perNightCharge: { [Op.eq]: searchString },
         
        }
      } : {};

      const data = await Room.findAndCountAll({
        where: whereClause,
        order: [['updatedAt', 'DESC']],
        limit,
        offset,
      });

      return data;
    }
  } catch (error) {
    console.error('Error getting all rooms:', error);
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
