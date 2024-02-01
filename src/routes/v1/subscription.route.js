const express = require('express');
const validate = require('../../middlewares/validate');
const subscriptionValidation = require('../../validations/subscription.validation');
const subscriptionController = require('../../controllers/subscription.controller');

const router = express.Router();

// POST /api/subscriptions/createSubscription
router.post('/createSubscription', validate(subscriptionValidation.createSubscription), subscriptionController.createSubscription);

// GET /api/subscriptions/:subscriptionId
router.get('/:subscriptionId', validate(subscriptionValidation.getSubscriptionsValidation), subscriptionController.getSubscriptionById);

// GET /api/subscriptions
router.get('/', subscriptionController.getAllSubscriptions);

// PUT /api/subscriptions/:subscriptionId
router.put('/:subscriptionId', validate(subscriptionValidation.updateSubscriptionValidation), subscriptionController.updateSubscription);

// DELETE /api/subscriptions/:subscriptionId
router.delete('/:subscriptionId', subscriptionController.deleteSubscription);

module.exports = router;
