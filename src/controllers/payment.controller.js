const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const catchAsync = require('../utils/catchAsync');
const { paymentService } = require('../services');

const createPayment = catchAsync(async (req, res) => {
  const Payment = await paymentService.createPayment(req.body);
  res.status(httpStatus.CREATED).send({ Payment });
});
const getPaymentById = async (req, res) => {
  try {
    const paymentId = req.params.paymentId; // Assuming bookingId is in req.params

    const data = await paymentService.getPaymentById(paymentId);

    if (data) {
      res.status(200).send({ data, message: 'GET payment by ID' });
    } else {
      res.status(404).send({ message: 'Not found', status: 0 });
    }
  } catch (error) {
    console.error('Error fetching payment by ID:', error);
    res.status(500).send({ message: 'Internal server error', status: -1 });
  }
  };
  const getAllPayment = catchAsync(async (req, res) => {
    const Payment = await paymentService.getAllPayment();
    res.status(httpStatus.OK).json(Payment);
  })
  
  const updatePayment = async (req, res) => {
    try {
      const { paymentId } = req.params;
      const updatedData = req.body;
  
      // Renamed the variable holding the result to avoid confusion
      const updatedPaymentResult = await paymentService.updatePayment(paymentId, updatedData);
  
      if (updatedPaymentResult) {
        res.status(200).send({ data: updatedData, message: 'Updated successfully' });
      } else {
        res.status(404).send({ message: 'Not found', status: 0 });
      }
    } catch (error) {
      console.error('Error updating:', error);
      res.status(500).send({ message: 'Internal server error', status: -1 });
    }
  };
  
  
  const deletePayment = async (req, res) => {
    const deletePayment = await paymentService.deletePayment(querry);
  if (deletePayment) {
    res.status(httpStatus.OK).send({ message: ' deleted successfully' });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in  delete' });
  }
  };
  

module.exports = {
  createPayment,
  getPaymentById,
  updatePayment,
  deletePayment,
  getAllPayment
  // Add more controller methods as needed
};
