import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000
    });

    console.log("MongoDB Atlas connected successfully");
  } catch (error) {
    console.error("MongoDB Atlas connection failed:", error.message);
    throw error;
  }
};

export default connectDB;