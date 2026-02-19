const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Exercise name is required'],
      trim: true
    },
    muscleGroup: {
      type: String,
      required: [true, 'Muscle group is required'],
      trim: true
    },
    unit: {
      type: String,
      enum: ['reps', 'time', 'distance', 'other'],
      default: 'reps'
    },
    description: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Exercise', exerciseSchema);

