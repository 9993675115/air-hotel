const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const catchAsync = require('../utils/catchAsync');
const { authService, tokenService, userService } = require('../services');

// const ApiError = require('../utils/ApiError');

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send({ user , message:"register Successfully",});
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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const userId = req.params.id;

  try {
    const user = await userService.getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Customize the response as needed
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  generatePassword,
  getAllUser,
  getUserByID
};
