import mongoose, { Connection } from "mongoose";

let isConnected: Connection | boolean = false;
export const dbConnection = async () => {
  if (isConnected) {
    console.log("db already connected ");
    return isConnected;
  }
  try {
    const response = await mongoose.connect(process.env.MONGO_URL!);
    isConnected = response.connection;
    console.log("DB connected");
    return isConnected;
  } catch (error) {
    console.log(error,"error in dbconnection");
  }
};
