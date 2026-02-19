const express = require('express');
const router = express.Router();
const Exercise = require('../models/Exercise');

// GET /api/exercises - List all exercises (useful for getting IDs)
router.get('/', async (req, res) => {
  try {
    const exercises = await Exercise.find().select('_id name muscleGroup unit');
    res.json({
      success: true,
      data: exercises
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
