const express = require('express');
const validate = require('../../middlewares/validate');
const supportDetailValidation = require('../../validations/supportDetails.validation');
const supportDetailController = require('../../controllers/supportDetails.controller');

const router = express.Router();

router.post('/createSupportDetail', validate(supportDetailValidation.createSupportDetail), supportDetailController.createSupportDetail);
// Add more routes as needed

// GET /api/supportDetails/:supportDetailId
router.get('/:supportDetailId', supportDetailController.getSupportDetailById);

// PUT /api/supportDetails/:supportDetailId
router.put('/:supportDetailId', validate(supportDetailValidation.updateSupportDetail), supportDetailController.updateSupportDetail);

// DELETE /api/supportDetails/:supportDetailId
router.delete('/:supportDetailId', supportDetailController.deleteSupportDetail);

module.exports = router;
