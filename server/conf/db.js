import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONG_DB);
    console.log("Connect DB");
  } catch (error) {
    console.log(error);
  }
};
