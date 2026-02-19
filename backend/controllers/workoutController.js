const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const Workout = require('../models/Workout');
const Exercise = require('../models/Exercise');

// Helper to handle validation errors
const handleValidation = (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error('Validation failed');
    err.statusCode = 400;
    err.details = errors.array();
    throw err;
  }
};

// POST /api/workouts
exports.createWorkout = async (req, res, next) => {
  try {
    handleValidation(req);

    const { title, date, notes, exercises, userId } = req.body;

    // Verify that all exercise ids are valid MongoDB ObjectIds
    const exerciseIds = exercises.map((e) => e.exercise);
    const invalidIds = exerciseIds.filter(id => !mongoose.Types.ObjectId.isValid(id));
    if (invalidIds.length > 0) {
      const err = new Error(`Invalid exercise ID format: ${invalidIds.join(', ')}`);
      err.statusCode = 400;
      throw err;
    }

    // Verify that all exercise ids exist in database
    const existingExercises = await Exercise.find({ _id: { $in: exerciseIds } }).select('_id');
    const existingIds = existingExercises.map(e => e._id.toString());
    const missingIds = exerciseIds.filter(id => !existingIds.includes(id));
    
    if (missingIds.length > 0) {
      const err = new Error(`Exercises not found in database: ${missingIds.join(', ')}`);
      err.statusCode = 400;
      throw err;
    }

    const workout = await Workout.create({
      title,
      date,
      notes,
      exercises,
      // For now we accept userId from body; in Step 3 this will come from auth
      user: userId || null
    });

    res.status(201).json({
      success: true,
      data: workout
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/workouts
exports.getWorkouts = async (req, res, next) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const skip = (page - 1) * limit;

    // In Step 3 we'll filter by authenticated user; for now we return all
    const [items, total] = await Promise.all([
      Workout.find()
        .populate('exercises.exercise', 'name muscleGroup unit')
        .sort({ date: -1, createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Workout.countDocuments()
    ]);

    res.json({
      success: true,
      data: items,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/workouts/:id
exports.getWorkoutById = async (req, res, next) => {
  try {
    handleValidation(req);

    const workout = await Workout.findById(req.params.id).populate(
      'exercises.exercise',
      'name muscleGroup unit'
    );

    if (!workout) {
      const err = new Error('Workout not found');
      err.statusCode = 404;
      throw err;
    }

    res.json({
      success: true,
      data: workout
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/workouts/:id
exports.updateWorkout = async (req, res, next) => {
  try {
    handleValidation(req);

    const { title, date, notes, exercises } = req.body;

    // Verify that all exercise ids are valid MongoDB ObjectIds
    const exerciseIds = exercises.map((e) => e.exercise);
    const invalidIds = exerciseIds.filter(id => !mongoose.Types.ObjectId.isValid(id));
    if (invalidIds.length > 0) {
      const err = new Error(`Invalid exercise ID format: ${invalidIds.join(', ')}`);
      err.statusCode = 400;
      throw err;
    }

    // Verify that all exercise ids exist in database
    const existingExercises = await Exercise.find({ _id: { $in: exerciseIds } }).select('_id');
    const existingIds = existingExercises.map(e => e._id.toString());
    const missingIds = exerciseIds.filter(id => !existingIds.includes(id));
    
    if (missingIds.length > 0) {
      const err = new Error(`Exercises not found in database: ${missingIds.join(', ')}`);
      err.statusCode = 400;
      throw err;
    }

    const workout = await Workout.findByIdAndUpdate(
      req.params.id,
      { title, date, notes, exercises },
      { new: true, runValidators: true }
    ).populate('exercises.exercise', 'name muscleGroup unit');

    if (!workout) {
      const err = new Error('Workout not found');
      err.statusCode = 404;
      throw err;
    }

    res.json({
      success: true,
      data: workout
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/workouts/:id
exports.deleteWorkout = async (req, res, next) => {
  try {
    handleValidation(req);

    const workout = await Workout.findByIdAndDelete(req.params.id);

    if (!workout) {
      const err = new Error('Workout not found');
      err.statusCode = 404;
      throw err;
    }

    res.json({
      success: true,
      message: 'Workout deleted'
    });
  } catch (error) {
    next(error);
  }
};

