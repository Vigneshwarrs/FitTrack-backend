const mongoose = require('mongoose');

const workoutSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        date: { type: Date, required: true, default: Date.now },
        exercises: [
            {
                name: { type: String, required: true },  // e.g., 'Squats', 'Running'
                duration: { type: Number, required: true },  // in minutes
                intensity: { type: String, required: true },  // e.g., 'low', 'medium', 'high'
                caloriesBurned: { type: Number, required: true },
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;