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
  const supports = await supportService.getAllSupport();
  res.status(httpStatus.OK).json({ supports });
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
