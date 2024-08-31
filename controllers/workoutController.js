// controllers/workoutController.js
const Workout = require('../models/Workout');
const User = require('../models/User');

// @desc    Get user workouts
// @route   GET /api/workouts
// @access  Private
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({ user: req.user._id }).sort({ date: 1 });
    res.json(workouts);
};

// @desc    Log a new workout
// @route   POST /api/workouts
// @access  Private
const logWorkout = async (req, res) => {
    const { exercises } = req.body;

    const workout = new Workout({
        user: req.user._id,
        exercises,
    });

    const createdWorkout = await workout.save();
    await User.findByIdAndUpdate(req.user._id, { $push: { workouts: createdWorkout._id }});
    res.status(201).json(createdWorkout);
};
// @desc    Update a workout
// @route   PUT /api/workouts/:id
// @access  Private
const updateWorkout = async (req, res) => {
    const { exercises } = req.body;
    const workout = await Workout.findById(req.params.id);
    if (!workout) {
        res.status(404);
        throw new Error('Workout not found');
    }
    if (workout.user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error('Not authorized');
    }
    workout.exercises = exercises;
    const updatedWorkout = await workout.save();
    res.status(200).json(updatedWorkout);
};


// @desc    Delete a workout
// @route   DELETE /api/workouts/:id
// @access  Private
const deleteWorkout = async (req, res) => {
    const workout = await Workout.findById(req.params.id);
    await workout.remove();
    await User.findByIdAndUpdate(req.user._id, { $pull: { workouts: workout._id }});
    res.status(200).json({ id: req.params.id });
}


module.exports = { getWorkouts, logWorkout, updateWorkout, deleteWorkout };
