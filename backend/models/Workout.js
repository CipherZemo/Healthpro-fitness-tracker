const mongoose = require('mongoose');

const workoutExerciseSchema = new mongoose.Schema(
  {
    exercise: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exercise',
      required: true
    },
    sets: {
      type: Number,
      required: true,
      min: [1, 'Sets must be at least 1']
    },
    reps: {
      type: Number,
      min: [1, 'Reps must be at least 1']
    },
    weight: {
      type: Number,
      min: [0, 'Weight cannot be negative']
    },
    duration: {
      type: Number,
      min: [0, 'Duration cannot be negative']
    },
    notes: {
      type: String,
      trim: true
    }
  },
  {
    _id: false
  }
);

const workoutSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false // will be required once auth is in place
    },
    date: {
      type: Date,
      default: Date.now
    },
    title: {
      type: String,
      required: [true, 'Workout title is required'],
      trim: true
    },
    notes: {
      type: String,
      trim: true
    },
    exercises: [workoutExerciseSchema]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Workout', workoutSchema);

