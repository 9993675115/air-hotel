const express = require('express');
const auth = require('../../middlewares/auth');
const { commonController } = require('../../controllers');

const router = express.Router();

router.post('/Settings',  commonController.saveUserSettings);
router.get('/Settings',  commonController.getUserSettings);
router.get('/:name',commonController.getAll);



module.exports = router;
