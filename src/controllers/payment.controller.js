const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const catchAsync = require('../utils/catchAsync');
const { paymentService } = require('../services');

const createPayment = catchAsync(async (req, res) => {
  let userBody = req.body;
  const data = await paymentService.createPayment(userBody);
  console.log("--------------------------------------------",data)
  if (data) {
    await res.status(200).send({ message: 'created successfully' });
  } else {
    await res.status(404).send({ message: 'not created' });
  }
});
const getPaymentById = async (req, res) => {
  const userBody=req.body
  const data =await paymentService.getPaymentById(userBody)
  if(data){
    res.status(200).send('GET booking by ID');
  }else{
    res.status(404).send('not found');
  }
  };
  
  const updatePayment = async (req, res) => {
    try {
      const paymentId = req.params;
      const updatedData = req.body;
      const updatePayment = await paymentService.updatePayment(paymentId, updatedData);
      if (updatePayment) {
        res.status(200).send({ data: updatedData, message: ' updated successfully' });
      } else {
        res.status(404).send({ message:' not found', status: 0 });
      }
    } catch (error) {
      console.error('Error updating :', error);
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
  // Add more controller methods as needed
};
