// controllers/suggestionController.js
const User = require('../models/User');

// @desc    Get exercise suggestions based on user's goals
// @route   GET /api/suggestions/exercises
// @access  Private
const getExerciseSuggestions = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('goals'); // Populate the goals array
    if (!user || !user.goals) {
      return res.status(404).json({ message: 'User or goals not found' });
    }

    // Initialize an empty set to store unique suggestions
    const suggestionsSet = new Set();

    // Iterate through each goal and add suggestions based on goal type
    user.goals.forEach(goal => {
      const { type } = goal;

      if (type === 'weight') {
        suggestionsSet.add('Running');
        suggestionsSet.add('Cycling');
        suggestionsSet.add('HIIT');
      } else if (type === 'strength') {
        suggestionsSet.add('Weight lifting');
        suggestionsSet.add('Push-ups');
        suggestionsSet.add('Squats');
      } else if (type === 'endurance') {
        suggestionsSet.add('Long-distance running');
        suggestionsSet.add('Swimming');
        suggestionsSet.add('Rowing');
      }
      // Add other goal types as needed
    });

    // Convert the set to an array
    const suggestions = Array.from(suggestionsSet);

    res.json(suggestions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get diet suggestions based on user's goals
// @route   GET /api/suggestions/diet
// @access  Private
const getDietSuggestions = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('goals'); // Populate the goals array
    if (!user || !user.goals) {
      return res.status(404).json({ message: 'User or goals not found' });
    }

    // Initialize an empty set to store unique suggestions
    const suggestionsSet = new Set();

    // Iterate through each goal and add suggestions based on goal type
    user.goals.forEach(goal => {
      const { type } = goal;

      if (type === 'weight') {
        suggestionsSet.add('Salads');
        suggestionsSet.add('Lean protein');
        suggestionsSet.add('Low-carb meals');
      } else if (type === 'strength') {
        suggestionsSet.add('High-protein meals');
        suggestionsSet.add('Protein shakes');
        suggestionsSet.add('Complex carbs');
      } else if (type === 'endurance') {
        suggestionsSet.add('Carb loading');
        suggestionsSet.add('Electrolyte-rich foods');
        suggestionsSet.add('Fruits');
      }
      // Add other goal types as needed
    });

    // Convert the set to an array
    const suggestions = Array.from(suggestionsSet);

    res.json(suggestions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getExerciseSuggestions, getDietSuggestions };