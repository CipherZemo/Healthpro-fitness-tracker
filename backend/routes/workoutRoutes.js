const express = require('express');
const { body, param, query } = require('express-validator');
const workoutController = require('../controllers/workoutController');

const router = express.Router();

// Validation rules
const workoutValidation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('date').optional().isISO8601().toDate().withMessage('Date must be a valid ISO8601 date'),
  body('notes').optional().isString(),
  body('exercises')
    .isArray({ min: 1 })
    .withMessage('Exercises array is required and must have at least one exercise'),
  body('exercises.*.exercise')
    .notEmpty()
    .withMessage('Exercise id is required for each exercise'),
  body('exercises.*.sets')
    .isInt({ min: 1 })
    .withMessage('Sets must be an integer greater than 0'),
  body('exercises.*.reps')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Reps must be an integer greater than 0'),
  body('exercises.*.weight')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Weight cannot be negative'),
  body('exercises.*.duration')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Duration cannot be negative'),
  body('exercises.*.notes')
    .optional()
    .isString()
];

// Pagination validation for list endpoint
const paginationValidation = [
  query('page').optional().isInt({ min: 1 }).toInt(),
  query('limit').optional().isInt({ min: 1, max: 100 }).toInt()
];

// ID param validation
const idValidation = [param('id').isMongoId().withMessage('Invalid workout id')];

// Routes
router.post('/', workoutValidation, workoutController.createWorkout);
router.get('/', paginationValidation, workoutController.getWorkouts);
router.get('/:id', idValidation, workoutController.getWorkoutById);
router.put('/:id', [...idValidation, ...workoutValidation], workoutController.updateWorkout);
router.delete('/:id', idValidation, workoutController.deleteWorkout);

module.exports = router;

