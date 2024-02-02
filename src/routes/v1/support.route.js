const express = require('express');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const supportValidation = require('../../validations/support.validation');
const supportController = require('../../controllers/support.controller');

const router = express.Router();

router.post('/createSupport', validate(supportValidation.createSupport), supportController.createSupport);
// Add more routes as needed

// GET /api/supports/:supportId
router.get('/:supportId', supportController.getSupportById);

router.get('/', supportController.getAllSupport);

// PUT /api/supports/:supportId
router.put('/:supportId', validate(supportValidation.updateSupport), supportController.updateSupport);

// DELETE /api/supports/:supportId
router.delete('/:supportId', supportController.deleteSupport);

module.exports = router;
