const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  logNutrition,
  getNutritionLogs,  
  updateNutrition,
  deleteNutrition,
} = require('../controllers/nutritionController');

// Routes
router.route('/').post(protect, logNutrition).get(protect, getNutritionLogs);
router.route('/:id').put(protect, updateNutrition).delete(protect, deleteNutrition);
module.exports = router;