const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const catchAsync = require('../utils/catchAsync');
const hotelServices = require('../services');


const createHotel = async (req, res) => {
  try {
    const createdHotel = await hotelServices.hotelService.createHotel(req.body);
    res.status(httpStatus.CREATED).send({ message: "Hotel added successfully", data: createdHotel });
  } catch (error) {
    console.error('Error creating hotel:', error);

    if (error.name === 'SequelizeUniqueConstraintError') {
      // Handle unique constraint violation (duplicate entry)
      return res.status(400).json({ error: 'Hotel with the same details already exists.' });
    } else {
      // Handle other types of errors
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};

const getHotelById = async (req, res) => {
  try {
    const id = req.params.id; // Assuming bookingId is in req.params

    const data = await hotelServices.hotelService.getHotelById(id);

    if (data) {
      res.status(200).send({ data, message: 'GET hotel by ID' });
    } else {
      res.status(404).send({ message: 'Not found', status: 0 });
    }
  } catch (error) {
    console.error('Error fetching hotel by ID:', error);
    res.status(500).send({ message: 'Internal server error', status: -1 });
  }
};
const getAllHotels = async (req, res) => {
  try {

    if (!req || !req.query) {
      throw new Error('Invalid request object');
    }

    // Extracting query parameters
    const { page = 1, limit = 10, search } = req.query;

    // Call the service function with the correct parameters
    const data = await hotelServices.hotelService.getAllHotels(search, { page, limit });
    // Return the data as needed
    res.json({ data:data });
  } catch (error) {
    console.error('Error getting all hotels:', error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
  }
};

const updateHotel = async (req, res) => {
  try {
    // Extracting bookingId from req.params
    const { id } = req.params;

    // Assuming you have validated your req.body using Joi or other validation middleware
    const updatedData = req.body;

    const updateHotel = await hotelServices.hotelService.updateHotel(id, updatedData);

    if (updateHotel) {
      res.status(200).send({ data: updatedData, message: 'Updated successfully' });
    } else {
      res.status(404).send({ message: 'Not found', status: 0 });
    }
  } catch (error) {
    console.error('Error updating :', error);
    res.status(500).send({ message: 'Internal server error', status: -1 });
  }
};

const deleteHotel = async (req, res) => {
  console.log('req----------------------', req.params)
  const idToDelete = req.params.id;

  try {
    const deletedRowsCount = await hotelServices.hotelService.deleteHotel(idToDelete);

    if (deletedRowsCount !== null && deletedRowsCount > 0) {
      res.status(httpStatus.OK).send({ message: 'Hotel deleted successfully' });
    } else if (deletedRowsCount !== null && deletedRowsCount === 0) {
      res.status(httpStatus.NOT_FOUND).send({ message: 'Hotel not found' });
    } else {
      // Handle unexpected case, such as deletedRowsCount being null
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Internal server error' });
    }
  } catch (error) {
    console.error('Error deleting hotel by id:', error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Internal server error' });
  }
};



module.exports = {
  createHotel,
  getHotelById,
  updateHotel,
  deleteHotel,
  getAllHotels
};
