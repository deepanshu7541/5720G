const express = require('express');
const router = express.Router();
const { receiveSensorData, manualOverride } = require('../controllers/sensorController');

// POST /api/sensors/
router.post('/', receiveSensorData);

// POST /api/sensors/override
router.post('/override', manualOverride);

module.exports = router;

// const express = require('express');
// const router = express.Router();
// const { receiveSensorData, manualOverride } = require('../controllers/sensorController');

// // Receive sensor POST
// router.post('/', receiveSensorData);

// // Manual override route (example)
// router.post('/override', manualOverride);

// module.exports = router;
