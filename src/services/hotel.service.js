const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');

const ApiError = require('../utils/ApiError');
const messages = require('../constant/message.json');
const logger = require('../config/logger');
const  {Hotel, Category} = require('../models');
const { Sequelize, Op } = require('sequelize');

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
const getAllHotels = async (query, options) => {
  try {

    if(query){
      const limit = Number(options.limit);
      const offset = options.page ? limit * (options.page - 1) : 0;
  
      // Ensure the query is a string
      const searchString = query ? query.toString() : '';
      
  
      // Define the where clause for search
      const whereClause = searchString ? {
        [Sequelize.Op.or]: {
          name: { [Sequelize.Op.iLike]: `%${searchString}%` },
          city: { [Sequelize.Op.iLike]: `%${searchString}%` },
          categoryId:  { [Op.eq]: searchString },
          pincode: { [Op.eq]: searchString },
          // pincode: { [Sequelize.Op.iLike]: searchString },
          startingPrice: { [Op.eq]: searchString },
          state: { [Sequelize.Op.iLike]: `%${searchString}%` },
          address: { [Sequelize.Op.iLike]: `%${searchString}%` },
          selectFacility: { [Sequelize.Op.overlap]: [searchString] },
          // Add more fields as needed
        }
      } : {};
  
      // Log relevant variables
  
      const data = await Hotel.findAndCountAll({
        where: whereClause,
        order: [['updatedAt', 'DESC']],
        limit,
        offset,
        include: Category
      });
  
      return data;
    }
    else{
    const hotels = await Hotel.findAll({
      include: Category
    });
    return hotels;
  }
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
