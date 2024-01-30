const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { authService, tokenService, userService } = require('../services');
const fs = require('fs');

// const ApiError = require('../utils/ApiError');

const register = catchAsync(async (req, res) => {
  console.log('bbbbbbbbbbbbbbbbbbbb',req.body);
  const user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({ user ,tokens, message:"register Successfully",});
});
const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens,message:"login successfully", });
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.OK).send({message:"logout successfully"});
});

const updateUserByID = async (req, res)=> {
  try {
    // Extracting bookingId from req.params
    const { id } = req.params;

    // Assuming you have validated your req.body using Joi or other validation middleware
    const updatedData = req.body;

    const updateUserByID = await userService.updateUserByID(id, updatedData);

    if (updateUserByID) {
      res.status(200).send({ data: updatedData, message: 'Updated successfully' });
    } else {
      res.status(404).send({ message: 'Not found', status: 0 });
    }
  } catch (error) {
    console.error('Error updating :', error);
    res.status(500).send({ message: 'Internal server error', status: -1 });
  }
};

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

const generatePassword = catchAsync(async (req, res) => {
  const password = await bcrypt.hash(req.query.password, 8);
  res.send({ password });
});
const getAllUser = catchAsync(async (req, res) => {
  const data = await userService.getAllUser();
  res.send({ data });
});

const getUserByID = async (req, res) => {
  // Check for validation errors
  try {
    const userId = req.params.id;
    const user = await userService.getUserById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Customize the response as needed
    return res.status(200).json({ user });
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// const uploadImage = async (req, res) => {
//   console.log("popopopopoppop",req.file.fileName)
//   try {
//     const image = req.file.fileName;
//     if (req.file === undefined) {
//       return res.status(401).send({ message: `You must select a file.` });
//     }
//     res.send({ message: 'image uploaded sucessfully', image });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send(`Error when trying upload images: ${error}`);
//   }
// };


// authController.js

// Assuming you have already imported necessary modules like multer, fs, etc.

// const uploadImage = (req, res) => {
//   console.log("!!!!!!!!!!!!",req.file)
//   if (!req.file) {
//     return res.status(400).json({ error: 'No file uploaded' });
//   }
//   const filename = req.file.filename; // Accessing the file information

//   const image = req.file; // Accessing the file information
//   const imageName = image; 
//   const uploadDir = './uploads/';
//   fs.rename(image.path, uploadDir + imageName, function(err) {
//     if (err) {
//       return res.status(500).json({ error: 'Error saving the file' });
//     }
//     return res.status(200).json({ message: 'File uploaded successfully',filename });
//   });
// };

const uploadImage = async (req, res) => {
  try {
    const image = req.file.filename;
    if (req.file === undefined) {
      return res.status(401).send({ message: `You must select a file.` });
    }
    res.send({ message: 'image uploaded sucessfully', image });
  } catch (error) {
    console.log(error);
    return res.status(500).send(`Error when trying upload images: ${error}`);
  }
};

const deleteUser = async (req, res) => {
  // Implementation to delete booking by ID
  const idere = req.params.id;
  const deleteUser = await userService.deleteUser(idere);
  if (deleteUser) {
    res.status(httpStatus.OK).send({ message: ' deleted successfully' });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in  delete' });
  }
};

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  generatePassword,
  getAllUser,
  getUserByID,
  uploadImage,
  updateUserByID,
  deleteUser
};
