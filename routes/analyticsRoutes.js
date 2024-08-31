const express = require('express');
const { getWorkoutAnalytics, getNutritionAnalytics } = require('../controllers/analyticsController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/workouts', protect, getWorkoutAnalytics);
router.get('/nutrition', protect, getNutritionAnalytics);

module.exports = router;
