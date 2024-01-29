const express = require('express');
const validate = require('../../middlewares/validate');
const paymentValidation = require('../../validations/payment.validation');
const paymentController = require('../../controllers/payment.controller');

const router = express.Router();

router.post('/createPayment', validate(paymentValidation.createPayment), paymentController.createPayment);
// Add more routes as needed

// GET /api/payments/:paymentId
router.post('/:paymentId', validate(paymentValidation.getPaymentValidation), paymentController.getPaymentById);

router.get('/', paymentController.getAllPayment);

router.get('/:paymentId', paymentController.getPaymentById);

// PUT /api/payments/:paymentId
router.put('/:paymentId', validate(paymentValidation.updatePaymentValidation), paymentController.updatePayment);

// DELETE /api/payments/:paymentId
router.delete('/:paymentId', paymentController.deletePayment);

module.exports = router;
