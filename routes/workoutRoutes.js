const express = require('express');
const { getWorkouts, logWorkout, updateWorkout, deleteWorkout } = require('../controllers/workoutController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(protect, getWorkouts).post(protect, logWorkout);
router.route('/:id').put(protect, updateWorkout).delete(protect, deleteWorkout);

module.exports = router;