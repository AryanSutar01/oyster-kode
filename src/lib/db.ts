import mongoose from 'mongoose';

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

type MongooseConnection = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  var mongoose: MongooseConnection;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    console.log('Using cached MongoDB connection');
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds
      family: 4, // Use IPv4, skip trying IPv6
      maxPoolSize: 10, // Maintain up to 10 socket connections
      retryWrites: true,
      connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    };

    try {
      console.log('Attempting MongoDB connection...');
      cached.promise = mongoose.connect(process.env.MONGODB_URI!, opts);
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      
      // If srv lookup fails, try direct connection
      if (process.env.MONGODB_URI?.includes('mongodb+srv://')) {
        const directUri = process.env.MONGODB_URI.replace(
          'mongodb+srv://',
          'mongodb://'
        );
        
        console.log('Attempting direct connection...');
        cached.promise = mongoose.connect(directUri, opts);
      } else {
        throw error;
      }
    }
  }

  try {
    cached.conn = await cached.promise;
    console.log('MongoDB connected successfully');
    return cached.conn;
  } catch (e) {
    cached.promise = null;
    console.error('MongoDB connection error:', e);
    throw e;
  }
}

// Event listeners for connection status
mongoose.connection.on('connected', () => {
  console.log('MongoDB connection established');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB connection disconnected');
});

// Handle application termination
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed through app termination');
    process.exit(0);
  } catch (err) {
    console.error('Error closing MongoDB connection:', err);
    process.exit(1);
  }
});

export default dbConnect; 