const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
require('./config/db')();
const { errorHandler } = require('./middleware/errorHandler');

// middlewares
app.use(cors());
app.use(express.json());


// Import Routes
const authRoutes = require('./routes/authRoutes');
const goalRoutes = require('./routes/goalRoutes');
const workoutRoutes = require('./routes/workoutRoutes');
const nutritionRoutes = require('./routes/nutritionRoutes');
const suggestionRoutes = require('./routes/suggestionRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/nutrition', nutritionRoutes);
app.use('/api/suggestions', suggestionRoutes);
app.use('/api/analytics', analyticsRoutes);

// Error Handler
app.use(errorHandler);

//App listen
const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log(`Server is listening on port: ${port}`);
});