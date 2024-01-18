const express = require('express');
const validate = require('../../middlewares/validate');
const addressValidation = require('../../validations/address.validation');
const addressController = require('../../controllers/address.controller');

const router = express.Router();

router.post('/createaddress', validate(addressValidation.createAddressValidation), addressController.createAddress);
// Add more routes as needed

// GET /api/addresses/:addressId
router.get('/:addressId', addressController.getAddressById);

// PUT /api/addresses/:addressId
router.put('/:addressId', validate(addressValidation.updateAddressValidation), addressController.updateAddress);

// DELETE /api/addresses/:addressId
router.delete('/:addressId', addressController.deleteAddress);

module.exports = router;
