const Goal = require('../models/Goal');
const User = require('../models/User');

// Set a new goal
module.exports.setGoal = async (req, res) => {
    try {
        const {
            type,
            target,
            duration,
            weight,
            reps,
            sets,
            distance,
            durationType,
            stretchDuration,
            balanceExercises,
            mobilityExercises,
            recoverySessions,
            muscleGroup
        } = req.body;
        console.log(req.user);
        const {_id} = req.user;


        // Ensure all required fields are present based on goal type
        if (!type) {
            return res.status(400).json({ message: 'Type are required' });
        }

        // Create and save the new goal
        const goal = new Goal({
            user: req.user._id,
            type,
            target: target || undefined,
            duration: duration || undefined,
            weight: type === 'weight' ? weight : undefined,
            reps: type === 'strength' ? reps : undefined,
            sets: type === 'strength' ? sets : undefined,
            distance: ['cardio', 'endurance'].includes(type) ? distance : undefined,
            durationType: type === ['cardio', 'endurance'].includes(type) ? durationType : undefined,
            stretchDuration: type === 'flexibility' ? stretchDuration : undefined,
            balanceExercises: type === 'balance' ? balanceExercises : undefined,
            mobilityExercises: type === 'mobility' ? mobilityExercises : undefined,
            recoverySessions: type === 'recovery' ? recoverySessions : undefined,
            muscleGroup: type ==='strength' ? muscleGroup : undefined
        });

        const createdGoal = await goal.save();
        const user = await User.findById(_id);
        if(!user.goals.includes(createdGoal._id)) {
            user.goals.push(createdGoal._id);
            await user.save();
        }
        res.status(201).json(createdGoal);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all goals for a user
module.exports.getGoals = async (req, res) => {
    try {
        const goals = await Goal.find({ user: req.user._id });
        if (goals.length === 0) {
            return res.status(404).json({ message: 'No goals found' });
        }
        res.status(200).json(goals);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update an existing goal
module.exports.updateGoal = async (req, res) => {
    try {
        const {
            goalId,
            type,
            target,
            duration,
            weight,
            reps,
            sets,
            distance,
            durationType,
            stretchDuration,
            balanceExercises,
            mobilityExercises,
            recoverySessions,
            muscleGroup,
        } = req.body;

        // Ensure goalId is provided
        if (!goalId) {
            return res.status(400).json({ message: 'Goal ID is required' });
        }

        // Find and update the goal
        const goal = await Goal.findOneAndUpdate(
            { _id: goalId, user: req.user._id },
            {
                type,
                target,
                duration: duration || undefined,
                weight: type === 'weight' ? weight : undefined,
                reps: type === 'strength' ? reps : undefined,
                sets: type === 'strength' ? sets : undefined,
                distance: ['cardio', 'endurance'].includes(type) ? distance : undefined,
                durationType: type === 'cardio' ? durationType : undefined,
                stretchDuration: type === 'flexibility' ? stretchDuration : undefined,
                balanceExercises: type === 'balance' ? balanceExercises : undefined,
                mobilityExercises: type === 'mobility' ? mobilityExercises : undefined,
                recoverySessions: type === 'recovery' ? recoverySessions : undefined,
                muscleGroup: type === 'strength' ? muscleGroup : undefined,
            },
            { new: true }
        );

        if (!goal) {
            return res.status(404).json({ message: 'Goal not found' });
        }

        res.status(200).json(goal);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete a goal
module.exports.deleteGoal = async (req, res) => {
    try {
        const { id } = req.params;

        // Ensure goalId is provided
        if (!id) {
            return res.status(400).json({ message: 'Goal ID is required' });
        }

        // Find and delete the goal
        const goal = await Goal.findOneAndDelete({ _id: id, user: req.user._id });
        const user = await User.findById(req.user._id);
        user.goals = user.goals.filter(goalId => goalId.toString()!== id);
        await user.save();

        if (!goal) {
            return res.status(404).json({ message: 'Goal not found' });
        }

        res.status(200).json({ message: 'Goal deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
