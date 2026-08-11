import dotenv from "dotenv";
import connectDB from "./config/database.js";
import app from "./app.js";

//read.env files and makes variables available through process.env
dotenv.config();

const PORT = process.env.PORT || 8000;

const startServer = async () => {
  try {
    //connect to database before starting server
    await connectDB();

    //listen for error event emitted by express app
    app.on("error", (error) => {
      console.log(error.message);
    });

    //start server
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  } catch (error) {
    //database connection error
    console.log("MongoDB connection failed !!!");
    console.log(error.message);
  }
};

startServer();
