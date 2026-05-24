const mongoose = require('mongoose');
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
const connectDB = async () => {
  try {
    console.log('⏳ Connecting to MongoDB...');
    console.log('📍 mongodb:', process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 10000,
  connectTimeoutMS: 10000,
});
    console.log('📍 mongodb:', process.env.MONGODB_URI);
    console.log('====================================');
    console.log('✅ MongoDB CONNECTED SUCCESSFULLY');

    console.log('====================================');

  } catch (error) {
    console.log('====================================');
    console.error('❌ MongoDB CONNECTION FAILED');
    console.error('🔴 Error Message:', error.message);
 
 

    process.exit(1);
  }
};

// 🔄 Connection Events
mongoose.connection.on('connected', () => {
  console.log('🟢 Mongoose event: connected');
});

mongoose.connection.on('disconnected', () => {
  console.warn('🟡 MongoDB disconnected');
});

mongoose.connection.on('reconnected', () => {
  console.log('🔄 MongoDB reconnected');
});

module.exports = connectDB;