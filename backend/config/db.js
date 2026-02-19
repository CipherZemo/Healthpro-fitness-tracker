const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/fitness-tracker';

    const conn = await mongoose.connect(uri, {
      // Mongoose 7 uses sane defaults; options kept minimal
    });

    console.log(`🗄️  MongoDB connected: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;

