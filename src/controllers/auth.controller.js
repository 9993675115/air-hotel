const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { authService, tokenService, userService, emailService } = require('../services');
const fs = require('fs');

// const ApiError = require('../utils/ApiError');

const register = catchAsync(async (req, res) => {
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
// const getAllUser = catchAsync(async (req, res) => {
//   const data = await userService.getAllUser();
//   res.send({ data });
// });

const getAllUser = async (req, res) => {
  try {
    // Ensure req object and its properties are defined
    if (!req || !req.query) {
      throw new Error('Invalid request object');
    }

    let query = {};
    query.status = req.query.status ? req.query.status : true;

    // Extracting sortBy, limit, and page from the request query
    const options = pick(req.query, ['sortBy', 'limit', 'page']);

    // Assuming search is correctly defined and extracted as a string
    const search = req.query.search || ''; 

    // Log or inspect the value of search to ensure it's a string
    console.log('Search:', search);

    // Call the service function with the correct parameters
    const data = await userService.getAllUser(query, options, search);

    // Return the data as needed
    res.json({ data });
  } catch (error) {
    console.error('Error in getAllUser controller:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


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

const uploadImages = async (req, res) => {
  try {
    const images = req.files;

    if (!images || images.length === 0) {
      return res.status(400).send('You must select at least one file.');
    }

    const fileInformation = images.map((file) => {
      return file.filename.trim();
    });
  

    res.send({ message: 'Images uploaded successfully', fileInformation: fileInformation });
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Error when trying to upload images: ${error}`);
  }
};

const resetPassword = catchAsync(async (req, res) => {
 
  const data = await authService.resetPassword(req.query.token, req.body.password);
  res.send(data);
});

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
  const host = config.email.userHost;
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken, host);
  res.status(200).send({ message: 'please check email' });
});
const changePassword = catchAsync(async (req, res) => {
  const userWithSecretFields = await userService.getUserWithSecretFieldsById(req.user.dataValues.id);
  const password = req.body.oldPassword;
  if (!(await bcrypt.compare(password, userWithSecretFields.password))) {
    res.status(400).send({ message: 'Incorrect Old password!' });
  } else {
    const userBody = {
      password: await bcrypt.hash(req.body.newPassword, 8)
    };
    await userService.updateUserByID(req.user.dataValues.id, userBody);
  }
  res.status(httpStatus.OK).send({ message: 'Password Changed Successfully' });
});

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
  deleteUser,
  uploadImages,
  resetPassword,
  forgotPassword,
  changePassword,
  // getUserBySearch
};
