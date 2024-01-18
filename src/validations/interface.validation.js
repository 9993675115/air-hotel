const Joi = require('joi');
// const { password, objectId } = require('./custom.validation');

const createInterface = {
  body: Joi.object().keys({
    date: Joi.date().required().allow('').allow('lastRun'),
    brandId: Joi.number(),
    brandCode: Joi.string()
  })
};

module.exports = {
  createInterface
};
