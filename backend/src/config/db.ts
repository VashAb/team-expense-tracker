import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  const mongoURI = process.env.MONGODB_URI;

  if (!mongoURI) {
    console.error('MONGODB_URI is not defined in .env');
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(mongoURI);
    console.info(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection failed:', (error as Error).message);
    process.exit(1);
  }
};

export default connectDB;
