const express = require('express');
const validate = require('../../middlewares/validate');
const authValidation = require('../../validations/auth.validation');
const authController = require('../../controllers/auth.controller');
const auth = require('../../middlewares/auth');
const upload = require('../../utils/uploads');


const router = express.Router();

router.post('/register', validate(authValidation.register), authController.register);
router.post('/login', validate(authValidation.login), authController.login);
router.post('/logout', validate(authValidation.logout), authController.logout);
router.post('/refresh-tokens', validate(authValidation.refreshTokens), authController.refreshTokens);
router.get('/generate-password', validate(authValidation.generatePassword), authController.generatePassword);
router.get('/user',  authController.getAllUser);
router.get('/:id', validate(authValidation.getUserById), authController.getUserByID);
router.post('/documentImage', upload.single('image'), authController.uploadImage);

module.exports = router;
