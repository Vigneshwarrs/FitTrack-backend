const express = require('express');
const { getExerciseSuggestions, getDietSuggestions } = require('../controllers/suggestionController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/exercises', protect, getExerciseSuggestions);
router.get('/diet', protect, getDietSuggestions);

module.exports = router;