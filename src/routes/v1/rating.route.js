const express = require('express');
const validate = require('../../middlewares/validate');
const ratingValidation = require('../../validations/rating.validation');
const ratingController = require('../../controllers/rating.controller');

const router = express.Router();

router.post('/createRating', validate(ratingValidation.createRating), ratingController.createRating);
// Add more routes as needed

// GET /api/ratings/:ratingId
router.get('/:ratingId', validate(ratingValidation.getRatingByIdValidation),ratingController.getRatingById);

// PUT /api/ratings/:ratingId
router.put('/:ratingId', validate(ratingValidation.updateRatingValidation), ratingController.updateRating);


 router.get('/', ratingController.getAllRating);

router.delete('/:ratingId', ratingController.deleteRating);

module.exports = router;
