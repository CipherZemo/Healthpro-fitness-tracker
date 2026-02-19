const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const connectDB = require('./config/db');

// Import routes
const healthRoutes = require('./routes/healthRoutes');
const workoutRoutes = require('./routes/workoutRoutes');
const exerciseRoutes = require('./routes/exerciseRoutes');

// Import middleware
const errorHandler = require('./middleware/errorHandler');

// Initialize Express app
const app = express();

// Connect to MongoDB, then start server
const startServer = async () => {
  await connectDB();

  // Middleware
  app.use(cors()); // Enable CORS for all routes
  app.use(express.json()); // Parse JSON bodies
  app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

  // Logging middleware (only in development)
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  } else {
    app.use(morgan('combined'));
  }

  // Routes
  app.use('/api/health', healthRoutes);
  app.use('/api/workouts', workoutRoutes);
  app.use('/api/exercises', exerciseRoutes);

  // Root route
  app.get('/', (req, res) => {
    res.json({ 
      message: 'Fitness Tracker API',
      version: '1.0.0',
      status: 'running'
    });
  });

  // 404 handler for undefined routes (Express 5-safe)
  app.use((req, res) => {
    res.status(404).json({
      success: false,
      message: `Route ${req.originalUrl} not found`
    });
  });

  // Error handling middleware (must be last)
  app.use(errorHandler);

  // Start server
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🌐 Health check: http://localhost:${PORT}/api/health`);
  });
};

startServer();
