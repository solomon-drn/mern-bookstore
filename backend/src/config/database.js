import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}`,
    );
    console.log("MongoDb connected...");
  } catch (error) {
    console.log("MOngoDb connection failed", error.message);
    process.exit(1);
  }
};

export default connectDB;
