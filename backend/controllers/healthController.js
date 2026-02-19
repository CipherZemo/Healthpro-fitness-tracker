/**
 * Health Check Controller
 * 
 * Provides health check endpoint to verify API is running
 */

const checkHealth = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: 'API is healthy and running',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Health check failed',
      error: error.message
    });
  }
};

module.exports = {
  checkHealth
};
