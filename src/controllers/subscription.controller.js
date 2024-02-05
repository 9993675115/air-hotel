const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { subscriptionService } = require('../services');

const createSubscription = catchAsync(async (req, res) => {
  try {
    const subscription = await subscriptionService.createSubscription(req.body);
    res.status(httpStatus.CREATED).send({ subscription });
  } catch (error) {
    console.error('Error creating subscription:', error);

    if (error.name === 'ValidationError') {
      // Handle validation errors (e.g., missing required fields)
      return res.status(400).json({ error: 'Validation error. Please provide all required fields.' });
    } else if (error.name === 'SequelizeUniqueConstraintError') {
      // Handle unique constraint violation (duplicate entry)
      return res.status(400).json({ error: 'Subscription with the same details already exists.' });
    } else {
      // Handle other types of errors
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});

const getSubscriptionById = async (req, res) => {
  try {
    const subscriptionId = req.params.subscriptionId; // Assuming subscriptionId is in req.params

    const data = await subscriptionService.getSubscriptionById(subscriptionId);

    if (data) {
      res.status(200).send({ data, message: 'GET subscription by ID' });
    } else {
      res.status(404).send({ message: 'Not found', status: 0 });
    }
  } catch (error) {
    console.error('Error fetching subscription by ID:', error);
    res.status(500).send({ message: 'Internal server error', status: -1 });
  }
};

const getAllSubscriptions = catchAsync(async (req, res) => {
  try {
    // Ensure req object and its properties are defined
    if (!req || !req.query) {
      throw new Error('Invalid request object');
    }

    // Extracting query parameters
    const { page = 1, limit = 10, search } = req.query;

    // Call the service function with the correct parameters
    const data = await subscriptionService.getAllSubscriptions(search, { page, limit });

    // Return the data as needed
    res.json({ data });
  } catch (error) {
    console.error('Error getting Subscriptions :', error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Error getting Subscriptions' });
  }
});


const updateSubscription = async (req, res) => {
  try {
    // Extracting subscriptionId from req.params
    const { subscriptionId } = req.params;

    // Assuming you have validated your req.body using Joi or other validation middleware
    const updatedData = req.body;

    const updateSubscription = await subscriptionService.updateSubscription(subscriptionId, updatedData);

    if (updateSubscription) {
      res.status(200).send({ data: updatedData, message: 'Updated successfully' });
    } else {
      res.status(404).send({ message: 'Not found', status: 0 });
    }
  } catch (error) {
    console.error('Error updating subscription:', error);
    res.status(500).send({ message: 'Internal server error', status: -1 });
  }
};

const deleteSubscription = async (req, res) => {
  // Implementation to delete subscription by ID
  const subscriptionId = req.params.subscriptionId;
  const deleteSubscription = await subscriptionService.deleteSubscription(subscriptionId);
  if (deleteSubscription) {
    res.status(httpStatus.OK).send({ message: 'Deleted successfully' });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in delete' });
  }
};

module.exports = {
  createSubscription,
  getSubscriptionById,
  updateSubscription,
  deleteSubscription,
  getAllSubscriptions,
  // Add more controller methods as needed
};
