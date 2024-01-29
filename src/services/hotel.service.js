const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');

const ApiError = require('../utils/ApiError');
const messages = require('../constant/message.json');
const logger = require('../config/logger');
const  {Hotel, Category} = require('../models');

const createHotel = async (hotelData) => {
  try {
    const createdHotel = await Hotel.create(hotelData);
    return createdHotel;
  } catch (error) {
    console.error('Error creating hotel:', error);
    throw error;
  }
};

const getHotelById = async (id) => {
  try {
    const hotel = await Hotel.findByPk(id,{where: {},
      include: Category});
    return hotel;
  } catch (error) {
    console.error('Error getting hotel by ID:', error);
    throw error;
  }
};
const getAllHotels = async () => {
  try {
    const hotels = await Hotel.findAll({
      where: {},
      include: Category
    });
    return hotels;
  } catch (error) {
    console.error('Error getting all hotels:', error);
    throw error;
  }
};

const updateHotel = async (id, updateData) => {
  const data  =  await Hotel.update(updateData, { where: { id } });
  return data;
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
