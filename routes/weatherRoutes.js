const express = require('express');
const { getHourlyPrecipitation } = require('../controllers/weatherController');

const router = express.Router();

router.get('/info', getHourlyPrecipitation);

module.exports = router;