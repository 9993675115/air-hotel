const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const catchAsync = require('../utils/catchAsync');
const { supportDetailsService } = require('../services');

const createSupportDetail = catchAsync(async (req, res) => {
  const supportDetail = await supportDetailsService.createSupportDetail(req.body);
  res.status(httpStatus.CREATED).send({ supportDetail });
});
const getSupportDetailById = catchAsync(async (req, res) => {
  const { supportDetailId } = req.params;
  const supportDetail = await supportDetailsService.getSupportDetailById(supportDetailId);
  res.status(httpStatus.OK).send({ supportDetail });
});

const getAllSupportDetail = catchAsync(async (req, res) => {
  const supportDetails = await supportDetailService.getAllSupportDetails();
  res.status(httpStatus.OK).send({ supportDetails });
});

const updateSupportDetail = catchAsync(async (req, res) => {
  const { supportDetailId } = req.params;
  const updatedSupportDetail = await supportDetailsService.updateSupportDetail(supportDetailId, req.body);
  res.status(httpStatus.OK).send({ supportDetail: updatedSupportDetail });
});

const deleteSupportDetail = catchAsync(async (req, res) => {

  const { supportDetailId } = req.params;
    try {
      const deletedRowCount = await supportDetailsService.deleteSupportDetail(supportDetailId);
  
      if (deletedRowCount > 0) {
        res.status(httpStatus.OK).send({ message: 'supportDetailId deleted successfully' });
      } else {
        res.status(httpStatus.NOT_FOUND).send({ message: 'supportDetailId not found' });
      }
    } catch (error) {
      console.error('Error deleting Support by ID:', error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Error deleting Support' });
    }
});


module.exports = {
  createSupportDetail,
  getSupportDetailById,
  updateSupportDetail,
  deleteSupportDetail,
  getAllSupportDetail
  // Add more controller methods as needed
};
