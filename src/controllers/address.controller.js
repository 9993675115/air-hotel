const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const bcrypt = require('bcryptjs');

const { addressService } = require('../services');  // Make sure this import is correct

const   createAddress= catchAsync(async (req, res) => {
  let userBody = req.body;
  const data = await addressService.getAddressById(userBody);
  console.log("--------------------------------------------",data)
  if (data) {
    await res.status(200).send({ message: 'address created successfully' });
  } else {
    await res.status(404).send({ message: 'address not created' });
  }
});

const getAddressById = async (req, res) => {
  const userBody=req.body
  const data =await addressService.getAddressById(userBody)
  if(data){
    res.status(200).send('GET Address by ID',data);
  }else{
    res.status(404).send('not found');
  }
  // Implementation to get address by ID
};

const updateAddress = async (req, res) => {
  try {
    const addressId = req.params;
    const updatedData = req.body;
    const updateaddress = await addressService.updateAddress(addressId, updatedData);
    if (updateaddress) {
      res.status(200).send({ data: updatedData, message: 'Address updated successfully' });
    } else {
      res.status(404).send({ message: 'Address not found', status: 0 });
    }
  } catch (error) {
    console.error('Error updating address:', error);
    res.status(500).send({ message: 'Internal server error', status: -1 });
  }
};

const deleteAddress = async (req, res) => {
  // Implementation to delete address by ID
  const querry = req.params;
  const deleteaddress = await addressService.deleteAddress(querry);
  if (deleteaddress) {
    res.status(httpStatus.OK).send({ message: ' deleted successfully' });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in  delete' });
  }
};

module.exports = {
  createAddress,
  getAddressById,
  updateAddress,
  deleteAddress
  // Add more controller methods as needed
};
