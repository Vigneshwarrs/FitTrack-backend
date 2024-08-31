// controllers/nutritionController.js
const Nutrition = require('../models/Nutrition');
const User = require('../models/User');

// @desc    Get user nutrition logs
// @route   GET /api/nutrition
// @access  Private
const getNutritionLogs = async (req, res) => {
    try{
        const nutritionLogs = await Nutrition.find({ user: req.user._id });
        res.status(200).json(nutritionLogs);
    } catch (error) {
        res.status(400).json({ message: error.message });
        console.error(error);
    }
};

// @desc    Log a new nutrition entry
// @route   POST /api/nutrition
// @access  Private
const logNutrition = async (req, res) => {
    try {
        const { meals } = req.body;
        const nutrition = new Nutrition({
            user: req.user._id,
            meals,
        });
        const savedNutrition = await nutrition.save();
        await User.findByIdAndUpdate(req.user._id, { $push: { nutritionGoals: savedNutrition._id }});
        res.status(201).json(savedNutrition);
    } catch (error) {
        res.status(400).json({ message: error.message });
        console.error(error);
    }
};

/// @desc    Update a nutrition entry
// @route   PUT /api/nutrition/:id
// @access  Private
const updateNutrition = async (req, res) => {
    const { meals } = req.body;
    const nutrition = await Nutrition.findById(req.params.id);
    if (!nutrition) {
        res.status(404);
        throw new Error('Nutrition entry not found');
    }
    if (nutrition.user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error('Not authorized to update this nutrition entry');
    }
    nutrition.meals = meals;
    const updatedNutrition = await nutrition.save();
    res.json(updatedNutrition);
};

// @desc    Delete a nutrition entry
// @route   DELETE /api/nutrition/:id
// @access  Private
const deleteNutrition = async (req, res) => {
    const nutrition = await Nutrition.findById(req.params.id);
    if (!nutrition) {
        res.status(404).json({ message: 'Nutrition entry not found' });
    }
        if (nutrition.user.toString() !== req.user._id.toString()) {
        res.status(401).json({ message: 'Not authorized to delete this nutrition entry' });
    }
    await nutrition.remove();
    await User.findByIdAndUpdate(req.user._id, { $pull: { nutritionGoals: nutrition._id }});
    res.json({ message: 'Nutrition entry deleted' });
};

module.exports = { getNutritionLogs, logNutrition, updateNutrition, deleteNutrition };
