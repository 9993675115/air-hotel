const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');

const ApiError = require('../utils/ApiError');
const messages = require('../constant/message.json');
const logger = require('../config/logger');
const  {Hotel} = require('../models');

const createHotel = async (hotelData) => {
  try {
    const createdHotel = await Hotel.create(hotelData);
    return createdHotel;
  } catch (error) {
    console.error('Error creating hotel:', error);
    throw error;
  }
};

const getHotelById = async () => {
  try {
    const data = await Hotel.findAll({
      where: {
        status: true
      }
    });
    return data;
  } catch (error) {
    console.error('Error retrieving users:', error);
    throw error;
  }
};
const getAllHotels = async () => {
  try {
    const hotels = await Hotel.findAll();
    return hotels;
  } catch (error) {
    console.error('Error getting all hotels:', error);
    throw error;
  }
};

const updateHotel = async (id, data) => {
  await Hotel.update(data, { where: { id } });
  return getHotelById(id);
};

const deleteHotel = async (id) => {
  try {
    console.log('id--------------------------',id)
    const deletedRowsCount = await Hotel.update({status:false},{
      where: { id:id }
    });
    return deletedRowsCount;
  } catch (error) {
    console.error('Error deleting hotels by id:', error);
    throw error;
  }
};

module.exports = {
  createHotel,
  getHotelById,
  updateHotel,
  deleteHotel,
  getAllHotels
};
