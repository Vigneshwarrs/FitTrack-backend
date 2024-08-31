const mongoose = require('mongoose');
const nutritionSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        date: { type: Date, required: true, default: Date.now },
        meals: [
            {
                name: { type: String, required: true },  // e.g., 'Breakfast', 'Lunch'
                foodItems: [
                    {
                        name: { type: String, required: true },  // e.g., 'Oatmeal', 'Salad'
                        calories: { type: Number, required: true },
                        protein: { type: Number },
                        carbs: { type: Number },
                        fat: { type: Number },
                        quantity: { type: Number, required: true },
                    },
                ],
                totalCalories: { type: Number, required: true },
            },
        ],
    },
    {
        timestamps: true,
    }
);
const Nutrition = mongoose.model('Nutrition', nutritionSchema);
module.exports = Nutrition;