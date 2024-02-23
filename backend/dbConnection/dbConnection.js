import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    mongoose.connect(process.env.MONGO_DB_URL);
    console.log("Database is connected");
  } catch (error) {
    console.log("Database connection failed", error.message);
  }
};
