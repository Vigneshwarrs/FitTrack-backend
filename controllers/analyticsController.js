const Workout = require('../models/Workout');
const Nutrition = require('../models/Nutrition');

// @desc    Get workout analytics (e.g., total calories burned)
// @route   GET /api/analytics/workouts
// @access  Private
const getWorkoutAnalytics = async (req, res) => {
  const workouts = await Workout.find({ user: req.user._id });

  const totalCaloriesBurned = workouts.reduce((total, workout) => {
    return total + workout.exercises.reduce((sum, exercise) => sum + exercise.caloriesBurned, 0);
  }, 0);

  res.json({ totalCaloriesBurned });
};

// @desc    Get nutrition analytics (e.g., average daily calories)
// @route   GET /api/analytics/nutrition
// @access  Private
const getNutritionAnalytics = async (req, res) => {
  const nutritionLogs = await Nutrition.find({ user: req.user._id });

  const totalCalories = nutritionLogs.reduce((total, log) => {
    return total + log.meals.reduce((sum, meal) => sum + meal.totalCalories, 0);
  }, 0);

  const averageDailyCalories = totalCalories / (nutritionLogs.length || 1);

  res.json({ averageDailyCalories });
};

module.exports = { getWorkoutAnalytics, getNutritionAnalytics };
