const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const catchAsync = require('../utils/catchAsync');
const { supportService } = require('../services');

const createSupport = catchAsync(async (req, res) => {
  try {
    const Support = await supportService.createSupport(req.body);
    res.status(httpStatus.CREATED).send({ Support });
  } catch (error) {
    console.error('Error creating support:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


const getSupportById = catchAsync(async (req, res) => {
  const supportId = req.params.supportId;
  const support = await supportService.getSupportById(supportId);

  if (!support) {
    return res.status(httpStatus.NOT_FOUND).json({ error: 'Support not found' });
  }

  res.status(httpStatus.OK).json({ support });
});

const getAllSupport = catchAsync(async (req, res) => {
  try {
    // Ensure req object and its properties are defined
    if (!req || !req.query) {
      throw new Error('Invalid request object');
    }

    // Extracting query parameters
    const { page = 1, limit = 10, search } = req.query;

    // Call the service function with the correct parameters
    const data = await supportService.getAllSupport(search, { page, limit });

    // Return the data as needed
    res.json({ data });
  } catch (error) {
    console.error('Error getting supportss :', error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Error getting supports' });
  }
});

const updateSupport = catchAsync(async (req, res) => {
  const { supportId } = req.params;
  const updatedSupport = await supportService.updateSupport(supportId, req.body);
  res.status(httpStatus.OK).send({ Support: updatedSupport });
});

const deleteSupport = catchAsync(async (req, res) => {
  
  const supportId = req.params.supportId;

    try {
      const deletedRowCount = await supportService.deleteSupport(supportId);
  
      if (deletedRowCount > 0) {
        res.status(httpStatus.OK).send({ message: 'Support deleted successfully' });
      } else {
        res.status(httpStatus.NOT_FOUND).send({ message: 'Support not found' });
      }
    } catch (error) {
      console.error('Error deleting Support by ID:', error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Error deleting Support' });
    }
});
module.exports = {
  createSupport,
  getSupportById,
  updateSupport,
  deleteSupport,
  getAllSupport
  // Add more controller methods as needed
};
