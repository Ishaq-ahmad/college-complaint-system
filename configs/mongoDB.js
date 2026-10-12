
import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI environment variable is missing");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000
    });

    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    throw error;
  }
};

export default connectDB;