import mongoose from "mongoose";
let isConnected = false;

export const connectDb = async () => {
  if (isConnected) {
    console.log("Database already connected");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "Aim_trainer",
    });
    isConnected = true;
    console.log("Database connected successfully");
  } catch (e) {
    console.error(`Error : ${e.message}`);
  }
};

export default connectDb;
