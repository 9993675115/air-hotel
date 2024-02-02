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
router.get('/user', auth('manageUser'),  authController.getAllUser);
router.get('/:id', validate(authValidation.getUserById), authController.getUserByID);
router.put('/:id', validate(authValidation.update), authController.updateUserByID);
router.delete('/:id',  authController.deleteUser);
router.post('/resetPassword', validate(authValidation.resetPassword), authController.resetPassword);
router.post('/forgot-password', validate(authValidation.forgotPassword), authController.forgotPassword);
router.post('/change-password', auth(), validate(authValidation.changePassword), authController.changePassword);
// router.get('/search', authController.getUserBySearch)

router.post('/documentImage', upload.single('image'), authController.uploadImage);
//  router.post('/documentImages', upload.array('files', 5), authController.uploadMultipleImages);



router.post('/images', upload.array('image', 15), authController.uploadImages);

module.exports = router;
