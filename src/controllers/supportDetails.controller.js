const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const catchAsync = require('../utils/catchAsync');
const { supportDetailService } = require('../services');

const createSupportDetail = catchAsync(async (req, res) => {
  const supportDetail = await supportDetailService.createSupportDetail(req.body);
  res.status(httpStatus.CREATED).send({ supportDetail });
});
const getSupportDetailById = catchAsync(async (req, res) => {
  const { supportDetailId } = req.params;
  const supportDetail = await supportDetailService.getSupportDetailById(supportDetailId);
  res.status(httpStatus.OK).send({ supportDetail });
});

const updateSupportDetail = catchAsync(async (req, res) => {
  const { supportDetailId } = req.params;
  const updatedSupportDetail = await supportDetailService.updateSupportDetail(supportDetailId, req.body);
  res.status(httpStatus.OK).send({ supportDetail: updatedSupportDetail });
});

const deleteSupportDetail = catchAsync(async (req, res) => {
  const { supportDetailId } = req.params;
  await supportDetailService.deleteSupportDetail(supportDetailId);
  res.status(httpStatus.NO_CONTENT).send();
});


module.exports = {
  createSupportDetail,
  getSupportDetailById,
  updateSupportDetail,
  deleteSupportDetail,
  // Add more controller methods as needed
};
