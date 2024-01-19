const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const catchAsync = require('../utils/catchAsync');
const { supportService } = require('../services');

const createSupport = catchAsync(async (req, res) => {
  const Support = await supportService.createSupport(req.body);
  res.status(httpStatus.CREATED).send({ Support });
});

const getSupportById = catchAsync(async (req, res) => {
  const { supportId } = req.params;
  const Support = await supportService.getSupportById(supportId);
  res.status(httpStatus.OK).send({ Support });
});

const updateSupport = catchAsync(async (req, res) => {
  const { supportId } = req.params;
  const updatedSupport = await supportService.updateSupport(supportId, req.body);
  res.status(httpStatus.OK).send({ support: updatedSupport });
});

const deleteSupport = catchAsync(async (req, res) => {
  const { supportId } = req.params;
  await supportService.deleteSupport(supportId);
  res.status(httpStatus.NO_CONTENT).send();
});


module.exports = {
  createSupport,
  getSupportById,
  updateSupport,
  deleteSupport,
  // Add more controller methods as needed
};
