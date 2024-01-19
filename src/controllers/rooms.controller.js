const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const catchAsync = require('../utils/catchAsync');
const { roomsService } = require('../services');

const createRoom = catchAsync(async (req, res) => {
  const Room = await roomsService.createRoom(req.body);
  res.status(httpStatus.CREATED).send({ Room });
});
const getRoomById = async (req, res) => {
  const userBody=req.body
  const data =await roomsService.getBookingById(userBody)
  if(data){
    res.status(200).send('GET booking by ID');
  }else{
    res.status(404).send('not found');
  }
};

const updateRoom = async (req, res) => {
  try {
    const roomId = req.params;
    const updatedData = req.body;
    const updateRoom = await roomsService.updateRoom(roomId, updatedData);
    if (updateRoom) {
      res.status(200).send({ data: updatedData, message: ' updated successfully' });
    } else {
      res.status(404).send({ message:' not found', status: 0 });
    }
  } catch (error) {
    console.error('Error updating :', error);
    res.status(500).send({ message: 'Internal server error', status: -1 });
  }
};

const deleteRoom = async (req, res) => {
  const deleteRoom = await roomsService.deleteRoom(querry);
  if (deleteRoom) {
    res.status(httpStatus.OK).send({ message: ' deleted successfully' });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in  delete' });
  }
};

module.exports = {
  createRoom,
  getRoomById,
  updateRoom,
  deleteRoom,
  // Add more controller methods as needed
};
